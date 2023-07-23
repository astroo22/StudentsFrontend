import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Input() message: string;
  @Output() confirm = new EventEmitter<boolean>();

  onConfirm(confirm: boolean): void {
    this.confirm.emit(confirm);
  }
}