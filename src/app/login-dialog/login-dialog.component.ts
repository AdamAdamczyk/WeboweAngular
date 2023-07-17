import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
  ) {}

  login(): void {
    this.loading = true;
    this.authService.loginUser(this.username, this.password)
      .then((response) => {
        console.log('User logged in:', response);
        
        this.dialogRef.close();
        this.router.navigate(['/functionality']);
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
