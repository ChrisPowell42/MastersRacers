import { Component, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirmDialog.template.html'
})

export class ConfirmDialogComponent {

  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) {}

  @Input() dialogMessage: string = 'Please confirm';
  @Input() dialogTitle: string = 'Confirm';
  @Input() trueLabel: string = 'Okay';
  @Input() falseLabel: string = 'Cancel';

}
