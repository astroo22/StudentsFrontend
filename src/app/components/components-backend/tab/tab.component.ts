import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  template: `<ng-content *ngIf="active"></ng-content>`,
})
export class TabComponent {
  @Input() label: string;
  active = false;

  constructor() { }
}
