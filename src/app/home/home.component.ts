import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { LoginDialogComponent } from '../login-dialog/login-dialog.component'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  goToFunctionalityDetail(): void {
    this.router.navigate(['/functionality']);
  }

  goToTaskDetail(id: string): void {
    this.router.navigate(['/task', id]);
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Tutaj możesz obsłużyć wynik logowania, jeśli to konieczne
      // np. sprawdzić, czy logowanie powiodło się i podjąć odpowiednie akcje
    });
  }
}
