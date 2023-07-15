import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDragMove,
} from '@angular/cdk/drag-drop';
import { TaskService } from '../task.service';
import { TaskUpdateDialogComponent } from '../task-update-dialog/task-update-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
  taskId: string;
  tasks: any[]; // Tablica zadań
  newTaskTitle: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private dialog: MatDialog
  ) {
    this.taskId = this.route.snapshot.paramMap.get('id') ?? '';
    this.tasks = [];
    this.newTaskTitle = '';
  }

  ngOnInit() {
    this.getTasks(); // Pobierz zadania przy inicjalizacji komponentu
  }

  getTasks() {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Failed to retrieve tasks:', error);
      }
    );
  }

  onDragEnded(event: CdkDragDrop<any[]>, status: string) {
    if (event.previousContainer === event.container) {
      // Przenoszenie w obrębie tej samej listy
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Przenoszenie między listami
      const taskToMove = event.previousContainer.data[event.previousIndex];
      taskToMove.status = status;
      moveItemInArray(event.previousContainer.data, event.previousIndex, 0); // Usuń z poprzedniej listy
      event.container.data.splice(event.currentIndex, 0, taskToMove); // Dodaj do nowej listy na odpowiedni indeks
    }

    // Aktualizacja zadań w bazie danych
    this.updateTasksOrder();
  }

  onDragMoved(event: CdkDragMove, task: any) {
    // Pobierz dane elementu przenoszonego z atrybutu `data`
    const draggedData = event.pointerPosition;

    // Wykorzystaj dane elementu przenoszonego w dowolny sposób
    console.log('Przenoszone dane:', draggedData, task);
  }

  updateTasksOrder() {
    this.tasks.forEach((task, index) => {
      task.order = index;
      this.updateTask(task);
    });
  }

  addTask() {
    if (this.newTaskTitle.trim() !== '') {
      const newTask = {
        title: this.newTaskTitle,
        status: 'TODO',
        order: this.tasks.length,
      };

      this.taskService.addTask(newTask).subscribe(
        (task) => {
          this.tasks.push(task);
          this.newTaskTitle = '';
        },
        (error) => {
          console.error('Failed to add task:', error);
        }
      );
    }
  }

  updateTask(task: any) {
    this.taskService.updateTask(task).subscribe(
      () => {
        // Zadanie zostało zaktualizowane
      },
      (error) => {
        console.error('Failed to update task:', error);
      }
    );
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.getTasks(); // Pobierz zadania ponownie, aby zaktualizować listę
      },
      (error) => {
        console.error('Failed to delete task:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  filterTasks(tasks: any[], status: string): any[] {
    return tasks.filter((task) => task.status === status);
  }

  changeTaskStatus(task: any, status: string) {
    task.status = status;
    this.taskService.changeTaskStatus(task._id, status).subscribe(
      () => {
        // Zadanie zostało zaktualizowane
      },
      (error) => {
        console.error('Failed to update task:', error);
      }
    );
  }

  openUpdateDialog(task: any): void {
    const dialogRef = this.dialog.open(TaskUpdateDialogComponent, {
      data: { taskTitle: task.title },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        task.title = result;
        this.updateTask(task);
      }
    });
  }
}
