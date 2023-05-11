import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {}

  // onSubmit() {
  //   this.authService.login(this.email, this.password).subscribe(
  //     () => {
  //       this.router.navigate(['/dashboard']);
  //     },
  //     (err) => {
  //       console.error(err);
  //     }
  //   );
  //}
}