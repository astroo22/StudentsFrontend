import { Component,OnInit,OnDestroy,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-inactive',
  templateUrl: './user-inactive.component.html',
  styleUrls: ['./user-inactive.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserInactiveComponent implements OnInit, OnDestroy {
  countdown: number = 10; // 10 seconds countdown
  intervalId: any;
  showModal = true;
  constructor( private router: Router){}
  ngOnInit() {
    console.log("got into component")
    this.startCountdown();
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(this.intervalId);
        this.showModal = false; 
        this.router.navigate(['/project'])
      }
    }, 1000);
  }

  onCancel() {
    clearInterval(this.intervalId); 
    this.showModal = false; 
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); 
  }

}