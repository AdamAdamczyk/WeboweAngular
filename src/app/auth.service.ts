import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string): Promise<any> {
    return this.http.post<any>('http://localhost:3000/login', { email, password }).toPromise();
  }
}
