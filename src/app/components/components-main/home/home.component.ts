import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  name = 'John Doe';
  title = 'Software Engineer';
  skills = ['Angular', 'React', 'Node.js', 'Express', 'MongoDB'];
}
