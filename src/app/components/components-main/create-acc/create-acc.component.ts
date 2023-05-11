import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
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
  username: string;
  email: string;
  password: string;

  constructor(
    private formBuilder: FormBuilder,
    // TODO: Userservice
    private userService: UserService,
    private router: Router
  ) {
    this.createAccountForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: [''],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.createAccountForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.createAccountForm.invalid) {
      return;
    }
    // need to hash this password here but I will get it working before I do that
    const user: User = {
      user_name: this.f['username'].value,
      email: this.f['email'].value,
      hashed_password: this.f['password'].value
    }as User;

    this.userService.createUser(user).subscribe(
      (response) => {
        this.router.navigate(['/login-page']);
      },
      (error) => {
        this.error = 'Error creating account.';
      }
    );
  }
}