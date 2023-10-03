import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-acc.component.html',
  styleUrls: ['./create-acc.component.scss']
})
export class CreateAccComponent {
  createAccountForm: FormGroup;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(){
    this.createAccountForm = this.formBuilder.group({
      username: ['', Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24),
        Validators.pattern('^[a-zA-Z0-9_-]+$')],
        email: ['',Validators.email],
        password: ['', [Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,24}$')]],
        confirm_password: ['', Validators.required],
    },{ validators: this.checkPassword });
  }
  checkPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirm_password')?.value;
  
    if (password !== confirmPassword) {
      return { match: true };
    }
    return null;
  }

  get f() {
    return this.createAccountForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.createAccountForm.invalid) {
      console.log("submitted checking form validation")
      console.log(this.createAccountForm.errors);
      Object.keys(this.createAccountForm.controls).forEach(controlName => {
        console.log(controlName, this.createAccountForm.get(controlName)?.errors);
      });
      return;
    }
    const user: User = {
      user_name: this.f['username'].value,
      email: this.f['email'].value,

      password: this.f['password'].value
    }as User;
    console.log("attempting create")
    this.userService.createUser(user).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error.error)
        if (error.error.includes("already exists")) {
          this.error = "Username already exists. Please choose a different username.";
      } else {
          this.error = "Error creating account.";
      }
      }
    );
  } 
}