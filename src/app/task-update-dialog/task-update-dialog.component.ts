import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-update-dialog',
  template: `
    <h2 mat-dialog-title>Update Task</h2>
    <mat-dialog-content>
      <textarea [(ngModel)]="updatedTaskTitle" placeholder="Enter updated task title"></textarea>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancelClick()">Cancel</button>
      <button mat-button (click)="onUpdateClick()">Update</button>
    </mat-dialog-actions>
  `,
})
export class TaskUpdateDialogComponent {
  updatedTaskTitle: string;

  constructor(
    public dialogRef: MatDialogRef<TaskUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskTitle: string }
  ) {
    this.updatedTaskTitle = data.taskTitle;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onUpdateClick(): void {
    this.dialogRef.close(this.updatedTaskTitle);
  }
}
