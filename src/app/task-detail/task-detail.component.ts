import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

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

  onDragEnded(event: CdkDragDrop<any, any, any>, status: string) {
    const startIndex = event.previousIndex;
    const endIndex = event.currentIndex;
  
    if (startIndex === endIndex) {
      return; // Nie ma potrzeby aktualizowania, jeśli zadanie nie zostało przemieszczone
    }
  
    const draggedTask = this.tasks[startIndex];
    moveItemInArray(this.tasks, startIndex, endIndex);
  
    draggedTask.status = status;
    this.updateTask(draggedTask);
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
