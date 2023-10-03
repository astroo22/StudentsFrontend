import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule , FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  username: string;
  password: string;
  submitted = false;
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private as: AuthService,
    private router: Router
  ) {}

  ngOnInit(){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    // TODO: need to create some validators here before this 
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log("submitted checking form validation")
      console.log(this.loginForm.errors);
      Object.keys(this.f).forEach(controlName => {
        console.log(controlName, this.loginForm.get(controlName)?.errors);
      });
      return;
    }
    this.username = this.f['username'].value
    this.password = this.f['password'].value
    if (this.loginForm.valid){
      this.as.login(this.username, this.password).subscribe(
        response => {
          // navigate to home page or user dashboard
          // should auto move
        },
        error => {
          console.log(error);
          if (error.error) {
            let err = error.error;
            this.errorMessage = "* " + err.message;
            if (err.errorType ==='IncorrectPassword'){
              console.log(this.errorMessage);
            }
          } else {
            this.errorMessage = "* Incorrect Username or Password";
            console.error("Unexpected error:", error);
          }
        }
      );
    }else{
      this.errorMessage = 'Login form is not valid';
    }
  }
  getErrorMessage() {
    if (this.submitted){
      if (this.f?.['username'].errors?.['required']) {
        return '* Username is required.';
      } else if (this.loginForm.controls?.['username'].errors?.['minlength'] || this.loginForm.controls?.['username'].errors?.['maxlength']) {
        return '* Username must be between 5 and 16 characters.';
      } else if (this.loginForm.controls?.['password'].errors?.['required']) {
        return '* Password is required.';
      } else if (this.loginForm.controls?.['password'].errors?.['minlength']) {
        return '* Password must be at least 8 characters long.';
      } else if (this.errorMessage) {
        return this.errorMessage;
      } else {
        return '';
      }
    }
    return ''
  }
 
}
