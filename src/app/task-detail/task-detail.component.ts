import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, CdkDragMove, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../task.service';

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
    private taskService: TaskService
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
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateTasksOrder(event.container.data);
    } else {
      // Przenoszenie między listami
      const taskToMove = event.previousContainer.data[event.previousIndex];
      taskToMove.status = status;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateTasksOrder([taskToMove, ...event.container.data]);
    }
  }

  onDragMoved(event: CdkDragMove, task: any) {
    // Pobierz dane elementu przenoszonego z atrybutu `data`
    const draggedData = event.pointerPosition;

    // Wykorzystaj dane elementu przenoszonego w dowolny sposób
    console.log('Przenoszone dane:', draggedData, task);
  }

  updateTasksOrder(updatedTasks: any[]) {
    updatedTasks.forEach((task, index) => {
      task.order = index;
      this.updateTask(task);
    });
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

  goBack(): void {
    this.router.navigate(['/']);
  }

  filterTasks(tasks: any[], status: string): any[] {
    return tasks.filter((task) => task.status === status);
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
}
