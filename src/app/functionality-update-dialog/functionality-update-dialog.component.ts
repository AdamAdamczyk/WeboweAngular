import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-functionality-update-dialog',
  template: `
    <h2 mat-dialog-title>Update Functionality</h2>
    <mat-dialog-content>
      <input [(ngModel)]="updatedFunctionalityTitle" placeholder="Enter updated functionality title" />
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancelClick()">Cancel</button>
      <button mat-button (click)="onUpdateClick()">Update</button>
    </mat-dialog-actions>
  `,
})
export class FunctionalityUpdateDialogComponent {
  updatedFunctionalityTitle: string;

  constructor(
    public dialogRef: MatDialogRef<FunctionalityUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { functionalityTitle: string }
  ) {
    this.updatedFunctionalityTitle = data.functionalityTitle;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onUpdateClick(): void {
    this.dialogRef.close(this.updatedFunctionalityTitle);
  }
}
