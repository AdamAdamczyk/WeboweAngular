import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}
//znaleźc jak przekazać ID funkcjonalności w miejsce any
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  updateTask(task: any): Observable<any> {
    const url = `${this.apiUrl}/${task._id}`;
    const body = { title: task.title, status: task.status };
    return this.http.put<any>(url, body);
  }

  changeTaskStatus(taskId: string, status: string): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    const body = { status };
    return this.http.put(url, body);
  }

  deleteTask(taskId: string): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete(url);
  }
}