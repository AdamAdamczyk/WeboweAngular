import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  username!: string;
  password!: string;
  loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(): void {
    this.loading = true;
    this.authService
      .loginUser(this.username, this.password)
      .then((response) => {
        console.log('User logged in:', response);
        this.dialogRef.close();
        this.router.navigate(['/functionality']);
        this.snackBar.open('Logowanie powiodło się!', 'Zamknij', {
          duration: 3000, 
        });
      })
      .catch((error) => {
        console.error('Login failed:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
