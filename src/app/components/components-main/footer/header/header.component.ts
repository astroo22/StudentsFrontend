import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  username: string | null = null;
  constructor(private authService: AuthService) { }
  private subscription: Subscription;
  ngOnInit(): void {
    this.subscription = this.authService.username$.subscribe(username => {
      this.username = username;
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  logout(){
    this.authService.logout();
  }
}
