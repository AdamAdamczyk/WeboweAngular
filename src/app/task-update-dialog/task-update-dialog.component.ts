import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-update-dialog',
  template: `
    <h2 mat-dialog-title style="margin-bottom: 16px;">Edytuj zadanie</h2>
<mat-dialog-content>
  <textarea [(ngModel)]="updatedTaskTitle" placeholder="Wpisz tekst zadania" style="width: 100%; font-size: 1.2rem; padding: 8px; border: 1px solid #ccc; border-radius: 4px; resize: vertical; min-height: 100px;"></textarea>
</mat-dialog-content>
<mat-dialog-actions style="display: flex; justify-content: flex-end; margin-top: 16px;">
  <button mat-button (click)="onCancelClick()" style="font-size: 1.2rem; padding: 8px 20px; margin-left: 10px; border: none; border-radius: 4px; cursor: pointer; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); transition: background-color 0.2s ease; background-color: #007bff; color: #fff;">
    Anuluj
  </button>
  <button mat-button (click)="onUpdateClick()" style="font-size: 1.2rem; padding: 8px 20px; margin-left: 10px; border: none; border-radius: 4px; cursor: pointer; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); transition: background-color 0.2s ease; background-color: #f44336; color: #fff;">
    Zatwierdź
  </button>
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
