import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public email: string = 'astroo22@gmail.com';
  public linkedin: string = 'https://www.linkedin.com/in/jonathan-starkey-0ba9ba171/';
  public github: string = 'https://github.com/astroo22';

  constructor() { }
}