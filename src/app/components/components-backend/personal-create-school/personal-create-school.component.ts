import { Component, Output,OnInit,EventEmitter,ChangeDetectorRef} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormGroup, FormBuilder,Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolService } from 'src/app/services/school.service';
import {School} from '../../../models/school.model';

// TODO: can probably remove the animations pretty sure they were linked to the old
// popup box I had. Leaving for now review and make sure later
@Component({
  selector: 'app-personal-create-school',
  templateUrl: './personal-create-school.component.html',
  styleUrls: ['./personal-create-school.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: .90,
        backgroundColor: '#707070'
      })),
      state('close', style({
        height: '0px',
        opacity: 0,
        backgroundColor: 'white'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class PersonalCreateSchoolComponent implements OnInit {
  @Output() schoolCreationStatus: EventEmitter<boolean> = new EventEmitter();
  @Output() schoolCreatedStatus: EventEmitter<boolean> = new EventEmitter();
  name: string;
  ownerID: string | null;
  numStdGrade: number;
  schoolForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  isOpen = true;
  returnSchool: School;
  submitted = false;
  imgCheck: string='assets/icons/checkmark.png';

  //status related
  operationID: string;
  schoolCreationInterval: any;
  schoolStatus: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sc: SchoolService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // const hideInfo = localStorage.getItem('hideInfo');
    //this.isOpen = hideInfo !== 'true';
    this.schoolForm = this.fb.group({
      schoolName: new FormControl({ value: '', disabled: this.isLoading }, [Validators.required, Validators.minLength(2),Validators.maxLength(30)]),
      studentsPerGrade: new FormControl({ value: '10', disabled: this.isLoading }, [Validators.required])
    });
    // Check for ownerId in local storage
    if (!localStorage.getItem('ownerID')) {
      // TODO: find a way to make the error look better
      this.errorMessage = 'You must be logged in to create a school.';
    }
  }
  setLoadingState(isLoading: boolean) {
    this.isLoading = isLoading;
    if (this.isLoading) {
      this.schoolForm.get('schoolName')?.disable();
      this.schoolForm.get('studentsPerGrade')?.disable();
    } else {
      this.schoolForm.get('schoolName')?.enable();
      this.schoolForm.get('studentsPerGrade')?.enable();
    }
    this.cdr.detectChanges();
  }
  get f() {
    return this.schoolForm.controls;
  }
  toggleInfo() {
    this.isOpen = !this.isOpen;
  }
  hideInfoForever() {
    localStorage.setItem('hideInfo', 'true');
    this.isOpen = false;
  }

  getErrorMessage(){
    if (this.submitted){
      if(this.f?.['schoolName'].errors?.['required']){
        return '* School name is required'
      }else if (this.f?.['schoolName'].errors?.['minlength'] || this.f?.['schoolName'].errors?.['maxlength']){
        return '* School name must be between 2 and 30 characters.';
      }
    }
    return ''
  }

  onSubmit() {
    this.submitted = true;
    if(this.schoolForm.invalid){
      Object.keys(this.schoolForm.controls).forEach(controlName => {
        console.log(controlName, this.schoolForm.get(controlName)?.errors);
      });
      return;
    }
    if (!localStorage.getItem('ownerID')) {
      this.errorMessage = 'error user probably timed out. login again.';
      this.submitted = false;
      return
    }
    if (this.f['schoolName'].value == null || this.f['studentsPerGrade'].value == null) {
      this.errorMessage = 'form values null cant complete';
      this.submitted = false;
      return
    }
    if (this.schoolForm.valid) {
      this.name = this.f['schoolName'].value 
      this.ownerID = localStorage.getItem('ownerID')!
      this.numStdGrade = this.f['studentsPerGrade'].value;
      this.setLoadingState(true);
      this.schoolCreationStatus.emit(true);
      this.sc.createNewSchool(this.name, this.ownerID, this.numStdGrade).subscribe({
        next: (response) => {
          this.operationID = response.operation_id;
          this.startCheckingSchoolCreation();
      },
      error: (err)=>{
        this.setLoadingState(false);
        this.schoolCreationStatus.emit(false);
      }});
    }
  }
  startCheckingSchoolCreation() {
    this.schoolCreationInterval = setInterval(() => {
      this.sc.checkCreationStatus(this.operationID).subscribe({
        next: (response) => {
          this.schoolStatus = response.status;
          if (response.status === 'Complete') {
            this.stopCheckingSchoolCreation();
            this.returnSchool = response.school;
            this.f['schoolName'].setValue("");
            this.submitted = false;
            this.schoolCreationStatus.emit(false);
            this.schoolCreatedStatus.emit(true);
            // NEED to get it to get the updated info
            this.setLoadingState(false);

            setTimeout(() => {
              this.setLoadingState(false);
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/project']);
              });
          }, 3000);
          }
          else if (response.status === 'Failed') {
            this.stopCheckingSchoolCreation();
            this.errorMessage = response.message;
            this.schoolCreationStatus.emit(false);
          }
        },
        error: (err) => {
          // if err idk display error list here
          this.stopCheckingSchoolCreation();

          if(err.status === 0){
            // A client-side or network error occurred.
            this.errorMessage = 'Unable to reach the server. Please check your internet connection.';
          } else if(err.status === 504){
            // A gateway timeout error occurred.
            this.errorMessage = 'The server took too long to respond. Please try again later.';
          } else {
            // Some other error occurred.
            this.errorMessage = 'An error occurred: ' + err.message;
          }
        }
      });
    }, 1000); // might drop this to .5 or 1 for low traffic. 
  }

  stopCheckingSchoolCreation() {
    if (this.schoolCreationInterval) {
      clearInterval(this.schoolCreationInterval);
    }
  }
  resetForm() {
    this.schoolForm.reset();
    this.isLoading = false;
    this.schoolStatus = '';
}

  ngOnDestroy() {
    this.stopCheckingSchoolCreation();
  }
  
}
