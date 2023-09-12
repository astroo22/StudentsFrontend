import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-tab',
  template: `<ng-content *ngIf="active"></ng-content>`,
})
export class TabComponent {
  @Input() label: string;
  active = false;
  @Output() tabClick = new EventEmitter<void>();
  constructor() { }
  onClick() {
    this.tabClick.emit();
  }
}
