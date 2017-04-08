import { Component } from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirmDialog.template.html'
})

export class ConfirmDialogComponent {
  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) {}
}
