import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, CdkDragMove } from '@angular/cdk/drag-drop';
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

  onDragEnded(event: CdkDragDrop<any>, status: string) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.tasks.forEach((task, index) => {
      task.status = status;
      task.order = index; // Dodatkowe pole order, aby śledzić kolejność zadań
      this.updateTask(task);
    });
  }

  onDragMoved(event: CdkDragMove, task: any) {
    // Pobierz dane elementu przenoszonego z atrybutu `data`
    const draggedData = event.source.getFreeDragPosition();

    // Wykorzystaj dane elementu przenoszonego w dowolny sposób
    console.log('Przenoszone dane:', draggedData, task);
  }

  addTask() {
    if (this.newTaskTitle.trim() !== '') {
      const newTask = {
        title: this.newTaskTitle,
        status: 'TODO',
        order: this.tasks.length, // Ustalamy kolejność nowego zadania
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

  goBack(): void {
    this.router.navigate(['/']);
  }

  filterTasks(tasks: any[], status: string): any[] {
    return tasks.filter((task) => task.status === status);
  }
}
