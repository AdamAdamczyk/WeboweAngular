import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FunctionalityService {
  private apiUrl = 'http://localhost:3000/functionality';

  constructor(private http: HttpClient) {}

  getFunctionality(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addFunctionality(functionality: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, functionality);
  }

  updateFunctionality(functionality: any): Observable<any> {
    const url = `${this.apiUrl}/${functionality.id}`;
    const body = { title: functionality.title };
    return this.http.put<any>(url, body);
  }

  deleteFunctionality(functionality: any): Observable<any> {
    const url = `${this.apiUrl}/${functionality.id}`;
    return this.http.delete<any>(url);
  }
  
}
