import { Component, OnInit, OnDestroy,HostListener, ElementRef, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { fromEvent, timer,Subscription  } from 'rxjs';
import { throttleTime, switchMap } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserInactiveComponent } from '../user-inactive/user-inactive.component';
//import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

const USER_INACTIVE_TIMEOUT = 5 * 60 *100;

@Component({
  selector: 'app-acc-page',
  templateUrl: './acc-page.component.html',
  styleUrls: ['./acc-page.component.scss']
})
export class AccPageComponent implements OnInit, OnDestroy {
  settingsForm: FormGroup;
  ownerID: string;
  username: string;
  email: string;
  password: string = "************";
  editIcon: string ='assets/icons/edit.png';

  // Edit Account vars
  updatedUserName: FormControl = this.formBuilder.control('');
  updatedPassword: FormControl = this.formBuilder.control('');
  confirmPassword: FormControl = this.formBuilder.control('')
  updatedEmail: FormControl = this.formBuilder.control('');
  
  // edit flags
  editUserNameFlag: boolean = false;
  editPasswordFlag: boolean = false;
  editEmailFlag: boolean = false;
  editConfirmPasswordFlag: boolean = false;
  submitAttempted: boolean = false;

  // confirm-dialog msgs
  showEmailConfirmDialog: boolean = false;
  showAccConfirmDialog: boolean = false;
  confirmEmailDeleteDialogMessage: string = 'Are you sure you want to delete your email?'
  confirmAccountDeleteDialogMessage: string ='Are you sure you want to delete your account?'

  // error flags
  errUsernameFlag: boolean = false;
  errEmailFlag: boolean = false;
  errPassFlag: boolean = false;

  // err messages
  errUsernameMsg: string = '';
  errEmailMsg: string = '';
  errPasswordMsg: string = '';

  // Email validation ~ not implemented yet
  emailVerificationRequired: boolean = false;
  verificationEmailSent: boolean = false;

  // Timeout vars
  userActivity: any;
  userInactivityCheck: any;
  dialogOpened: boolean = false;
  private subscriptions: Subscription[] = [];
  private timeoutId: ReturnType<typeof setTimeout>;
  public showUserInactiveComponent = false;
  
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private us:UserService, 
    private as:AuthService, 
    private dialog: MatDialog,
    private router: Router) {

    this.settingsForm = this.formBuilder.group({
      usernameGroup: this.formBuilder.group({
        username: [{value: '', disabled: true}],
        updatedUserName: ['', [Validators.required,Validators.minLength(5)]],
        editMode: [false]
      }),
      emailGroup: this.formBuilder.group({
        email: [{value: '', disabled: true}],
        updatedEmail: ['',[Validators.required,Validators.email]],
        editMode: [false]
      }),
      passwordGroup: this.formBuilder.group({
        password: [{value: '', disabled: true},],
        updatedPassword: [{value: '', disabled: true}, [Validators.required,Validators.minLength(8)]],
        confirmPassword: [{value: '', disabled: true}, [Validators.required,Validators.minLength(8)]],
        editMode: [false]
      }, {validators: this.checkPasswords })
      
    });
  }

  // Next couple methods are for the Timeout 
  ngOnInit() {
    this.ownerID = localStorage.getItem('ownerID')!
    this.username = localStorage.getItem('username')!
    this.email = localStorage.getItem('email')!
    // need to have a check for email validation required here

    // timeout stuff
    this.userActivity = Date.now();
    this.setInactivityTimeout();
    this.startInactivityCheck();
  }

  @HostListener('window:mousemove') refreshUserState() {
    this.userActivity = Date.now();
  }

  ngOnDestroy() {
    clearTimeout(this.userInactivityCheck);
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  setInactivityTimeout() {
    this.userActivity = Date.now();
  }

  startInactivityCheck() {
    const userActivity = fromEvent(document, 'mousemove')
      .pipe(throttleTime(1000))
      .subscribe(() => {
        console.log("hit")
        clearTimeout(this.timeoutId);
        this.showUserInactiveComponent = false;
        this.timeoutId = setTimeout(() => this.showUserInactiveComponent = true, USER_INACTIVE_TIMEOUT); // 5 minutes timeout
      });
    this.subscriptions.push(userActivity);
  }


  checkPasswords(group: FormGroup) { 
    let pass = group.get('updatedPassword')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
  
    return pass === confirmPass ? null : { notSame: true }     
  }

  get usernameGroup() {
    return this.settingsForm.get('usernameGroup') as FormGroup;
  }

  get emailGroup() {
    return this.settingsForm.get('emailGroup') as FormGroup;
  }

  get passwordGroup() {
    return this.settingsForm.get('passwordGroup') as FormGroup;
  }

  editMode(section: string) {
    const group = this.settingsForm.get(section + 'Group');
    if (section === 'password') {
      group?.enable();
      this.editPasswordFlag = true;
      this.editConfirmPasswordFlag = true;
    }
    else if (section ==='username'){
      group?.get('updatedUserName')?.setValue(this.username);
      group?.enable();
      this.editUserNameFlag = true;
      
      console.log(this.updatedUserName)
    }
    else if (section === 'email'){
      group?.get('updatedEmail')?.setValue(this.email);
      group?.enable();
      this.editEmailFlag = true;
      console.log(this.updatedEmail)
    }
    else {
      group?.get(section)?.enable();
    }
    group?.get('editMode')?.setValue(true);
  }

  cancelEdit(section: string) {
    const group = this.settingsForm.get(section + 'Group');
    if (section === 'password') {
      group?.disable();
      this.editPasswordFlag = false;
      this.editConfirmPasswordFlag = false;
    }else if (section ==='username'){
      //change editusername back to original to reset
      group?.disable();
      this.updatedUserName?.setValue(this.username);
      this.editUserNameFlag = false;
    }
    else if (section === 'email'){
      group?.disable();
      this.updatedEmail?.setValue(this.email)
      this.editEmailFlag = false;
    }
    else {
      group?.get(section)?.disable();
    }
    group?.get('editMode')?.setValue(false);
  }

  saveChanges(section: string) {
    console.log("savechanges hit")
    this.clearErrorMessages();
    this.submitAttempted = true;
    const group = this.settingsForm.get(section + 'Group');
    if(section === 'username') {
      this.updatedUserName?.setValue(group?.get('updatedUserName')?.value);
    }
    if (section === 'email'){
      this.updatedEmail?.setValue(group?.get('updatedEmail')?.value)
    }
    if (section === 'password'){
      this.updatedPassword?.setValue(group?.get('updatedPassword')?.value)
      this.confirmPassword?.setValue(group?.get('confirmPassword')?.value)
      if (this.checkPasswords(this.passwordGroup)) {
        this.errPasswordMsg = 'Passwords do not match';
        return;
      }
    }
    // error message section
    if(group?.invalid) {
      // Check username errors
      if(section === 'username') {
        const usernameErrors = group.get('updatedUserName')?.errors;
        if(usernameErrors) {
          if(usernameErrors['required']) {
            this.errUsernameMsg = 'Username is required';
          } else if(usernameErrors['minlength']) {
            this.errUsernameMsg = 'Username must be at least 5 characters long';
          }
        }
      }

      // Check email errors
      if(section === 'email') {
        const emailErrors = group.get('updatedEmail')?.errors;
        if(emailErrors) {
          if(emailErrors['required']) {
            this.errEmailMsg = 'Email is required';
          } else if(emailErrors['email']) {
            this.errEmailMsg = 'Invalid email format';
          }
        }
      }

      // Check password errors
      if(section === 'password') {
        const passwordErrors = group.get('updatedPassword')?.errors;
        const confirmPasswordErrors = group.get('confirmPassword')?.errors;
        if(passwordErrors || confirmPasswordErrors) {
          if(passwordErrors?.['required'] || confirmPasswordErrors?.['required']) {
            console.log("hit3")
            this.errPasswordMsg = 'Both password fields are required';
          } else if(passwordErrors?.['minlength'] || confirmPasswordErrors?.['minlength'] ) {
            this.errPasswordMsg = 'Password must be at least 8 characters long';
          }
        }
      }
      return; 
    }
    console.log("save attempt")
    switch(section) {
      case 'username':
        group?.disable();
        this.changeUsername();
        break;
      case 'email':
        this.changeEmail();
        break;
      case 'password':
        if (!this.checkPasswords(this.passwordGroup)){
          this.changePassword();
        }
        break;
    }
  }

  changeUsername() {
    let user: User= {}
    if (this.updatedUserName){
      user.user_name = this.updatedUserName.value;
      
    }
    const group = this.settingsForm.get('usernameGroup');
      this.us.updateUser(this.ownerID, user).subscribe(
      response => {
        //console.log(response);
        // successful response
        this.username = this.updatedUserName.value;
        this.editUserNameFlag = false;
        group?.disable();
        group?.get('editMode')?.setValue(false);
        this.submitAttempted = false;
        localStorage.setItem('username',this.username);
        this.as.changeUsername(this.username)
      },
      error => {
        let err = JSON.parse(error.error.text);
        if (err.errorType === 'DuplicateKey') {
          // handle duplicate key error here
          group?.enable();
          console.error("this username is already in use: ", err.message);
        } else {
          group?.enable();
          // handle general error here
          console.error("This is a general error: ", err.message);
        }
      }
    );
  }
  changeEmail(){
    let user: User= {}
    if (this.updatedEmail){
      user.email = this.updatedEmail.value;
    }
      const group = this.settingsForm.get('emailGroup');
      this.us.updateUser(this.ownerID, user).subscribe(
      response => {
        console.log(response);
        this.email = this.updatedEmail.value;
        this.editEmailFlag = false;
        group?.disable();
        group?.get('editMode')?.setValue(false);
        this.submitAttempted = true;
        localStorage.setItem('email',this.email);
      },
      error => {
        try{
          let err = error.error;
          if (err.errorType === 'DuplicateKey') {
            group?.enable();
            this.errEmailFlag = true;
            this.errEmailMsg = "this email is already in use";
          } else {
            // handle general error here
            group?.enable();
            this.errEmailFlag = true;
            this.errEmailMsg = "not a valid email";
          }
        }catch(e){
          console.error("Error parsing the error object: ", e);
        }
      }
    );
  }

  changePassword() {
    let user: User= {}
    if (this.updatedPassword && this.confirmPassword){
      user.password = this.confirmPassword.value;
    }
    const group = this.settingsForm.get('passwordGroup');
    this.us.updateUser(this.ownerID, user).subscribe(
      response => {
        console.log(response);
        // successful response
        this.editPasswordFlag = false;
        this.editConfirmPasswordFlag = false;
        group?.disable();
        group?.get('editMode')?.setValue(false);
        this.submitAttempted = false;
      },
      error => {
        let err = JSON.parse(error.error.text);
        // Might use this later leaving as is
        if (err.errorType === 'DuplicateKey') {
          group?.enable();
          // console.log("Password in use by {otherdude.username} HA")
        } else {
          group?.enable();
          // handle general error here
          console.error("Unexpected error: ", err.message);
        }
      }
    );
  }

  deleteEmail(){
    let user: User = {
      email: "-1",
    };
    this.us.updateUser(this.ownerID, user).subscribe(
      response => {
        console.log(response);
        this.editEmailFlag = false;
        localStorage.removeItem('email')
        this.submitAttempted = true;
        this.email = "";
      },
      error => {
        try{
          let err = error.error;
         console.log(err)
        }catch(e){
          console.error("Error parsing the error object: ", e);
        }
      }
    );
   
  }

  deleteAccount() {
    this.us.deleteUser(this.ownerID).subscribe(
      response => {
        console.log(response);
        this.as.logout;
      },
      error => {
        console.error(error);
        // Handle error response
      }
    );
  }
  openEmailConfirmDialog() {
    this.showEmailConfirmDialog = true;
  }
  openAccConfirmDialog() {
    this.showAccConfirmDialog = true;
  }
  
  handleEmailDeleteConfirm(confirm: boolean) {
    this.showEmailConfirmDialog = false;
    if (confirm) {
      this.deleteEmail();
    }
  }
  handleAccDeleteConfirm(confirm: boolean) {
    this.showAccConfirmDialog = false;
    if (confirm) {
      // handle the 'Yes' action here
      console.log("acc delete confirmed!")
      this.deleteAccount();
    }
  }
  

  sendVerificationEmail() {
    // TODO: email verification
    this.verificationEmailSent = true;
  }
  clearErrorMessages() {
    this.errUsernameMsg = '';
    this.errEmailMsg = '';
    this.errPasswordMsg = '';
  }
  
}
