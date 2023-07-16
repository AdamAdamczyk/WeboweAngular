import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionalityService } from '../functionality.service';

@Component({
  selector: 'app-functionality-detail',
  templateUrl: './functionality-detail.component.html',
  styleUrls: ['./functionality-detail.component.scss']
})
export class FunctionalityDetailComponent implements OnInit {
  functionalityId: string | null = null;
  functionalities: any[] = [];
  newFunctionalityTitle: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private functionalityService: FunctionalityService
  ) { 
    this.functionalityId = this.route.snapshot.paramMap.get('id');
    this.newFunctionalityTitle = '';
  }

  ngOnInit(): void {
    this.getFunctionalities();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  addFunctionality(): void {
    if (this.newFunctionalityTitle.trim() !== '') {
      const newFunctionality = {
        title: this.newFunctionalityTitle
      };

      this.functionalityService.addFunctionality(newFunctionality).subscribe(
        (functionality) => {
          // Pomyślnie dodano funkcjonalność
          console.log('Functionality added:', functionality);
          // Zresetuj pole tekstowe
          this.newFunctionalityTitle = '';
          // Dodaj nową funkcjonalność do listy
          this.functionalities.push(functionality);
        },
        (error) => {
          console.error('Failed to add functionality:', error);
        }
      );
    }
  }

  getFunctionalities(): void {
    this.functionalityService.getFunctionalities().subscribe(
      (functionalities) => {
        this.functionalities = functionalities;
      },
      (error) => {
        console.error('Failed to retrieve functionalities:', error);
      }
    );
  }


}
