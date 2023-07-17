import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFunctionality'
})
export class FilterFunctionalityPipe implements PipeTransform {
  transform(functionalities: any[], searchTitle: string): any[] {
    if (!searchTitle || searchTitle.trim() === '') {
      return functionalities; 
    }

    const searchTerm = searchTitle.toLowerCase();

    return functionalities.filter(functionality =>
      functionality.title.toLowerCase().includes(searchTerm)
    );
  }
}
