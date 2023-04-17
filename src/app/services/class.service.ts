import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private apiUrl = 'http://localhost:3000/classes';

  constructor(private http: HttpClient) { }

  createClass(classData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, classData);
  }

  getClass(class_id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${class_id}`);
  }

  updateClass(class_id: string, classData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${class_id}`, classData);
  }

  deleteClass(class_id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${class_id}`);
  }
}