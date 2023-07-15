import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {
  transform(tasks: any[], status: string): any[] {
    if (status === 'TODO') {
      return tasks.filter(task => task.status === 'TODO');
    } else if (status === 'DOING') {
      return tasks.filter(task => task.status === 'DOING');
    } else if (status === 'DONE') {
      return tasks.filter(task => task.status === 'DONE');
    } else {
      return tasks; // Zwróć niezmienioną tablicę, jeśli status nie jest prawidłowy
    }
  }
}
