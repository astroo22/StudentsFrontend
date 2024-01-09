import { Component,HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth <= 1023) { // Example breakpoint for mobile
      document.body.classList.add('enable-scroll');
    } else {
      document.body.classList.remove('enable-scroll');
    }
  }

  ngOnInit() {
    this.onResize();
  }
}
