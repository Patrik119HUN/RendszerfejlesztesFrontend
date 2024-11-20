import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { IWarehouse } from '../../shared/model/warehouse';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle
  ],
  templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent {
  public constructor(@Inject(MAT_DIALOG_DATA) public data: IWarehouse) {}

}
