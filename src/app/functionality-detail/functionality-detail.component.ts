import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionalityService } from '../functionality.service';
import { TaskUpdateDialogComponent } from '../task-update-dialog/task-update-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FunctionalityUpdateDialogComponent } from '../functionality-update-dialog/functionality-update-dialog.component';

@Component({
  selector: 'app-functionality-detail',
  templateUrl: './functionality-detail.component.html',
  styleUrls: ['./functionality-detail.component.scss'],
})
export class FunctionalityDetailComponent implements OnInit {
  functionalityId: string | null = null;
  functionality: any;
  newFunctionalityTitle: string;
  functionalities: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private functionalityService: FunctionalityService,
    private dialog: MatDialog
  ) {
    this.newFunctionalityTitle = '';
    this.functionalities = [];
  }

  ngOnInit(): void {
    this.functionalityId = this.route.snapshot.paramMap.get('id');
    this.getFunctionality();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  addFunctionality(): void {
    if (this.newFunctionalityTitle.trim() !== '') {
      const newFunctionality = {
        title: this.newFunctionalityTitle,
      };

      this.functionalityService.addFunctionality(newFunctionality).subscribe(
        (functionality) => {
          this.newFunctionalityTitle = '';
          this.getFunctionality(); // Odśwież listę funkcjonalności po dodaniu
        },
        (error) => {
          console.error('Failed to add functionality:', error);
        }
      );
    }
  }

  updateFunctionality(functionality: any): void {
    const updatedFunctionality = {
      id: functionality._id,
      title: functionality.title,
    };

    this.functionalityService
      .updateFunctionality(updatedFunctionality)
      .subscribe(
        (result) => {
          console.log('Functionality updated:', result);
          this.getFunctionality(); // Odśwież listę funkcjonalności po aktualizacji
        },
        (error) => {
          console.error('Failed to update functionality:', error);
        }
      );
  }

  deleteFunctionality(functionality: any): void {
    const deleteFunctionality = {
      id: functionality._id,
    };

    this.functionalityService
      .deleteFunctionality(deleteFunctionality)
      .subscribe(
        (result) => {
          this.getFunctionality(); // Odśwież listę funkcjonalności po aktualizacji
        },
        (error) => {
          console.error('Failed to update functionality:', error);
        }
      );
  }

  getFunctionality(): void {
    this.functionalityService.getFunctionality().subscribe(
      (functionalities) => {
        this.functionalities = functionalities;
      },
      (error) => {
        console.error('Failed to retrieve functionalities:', error);
      }
    );
  }

  openUpdateDialog(functionality: any): void {
    const dialogRef = this.dialog.open(FunctionalityUpdateDialogComponent, {
      data: { functionalityTitle: functionality.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        functionality.title = result;
        this.updateFunctionality(functionality);
      }
    });
  }

  goToTasks(functionality: any): void {
    if (functionality && functionality._id) {
      this.router.navigate(['/task', functionality._id]);
    }
  }
}
