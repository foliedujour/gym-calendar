import { Component } from '@angular/core';
import { MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';


@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent { // Confirmation dialog for user to confirm on unbook
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
