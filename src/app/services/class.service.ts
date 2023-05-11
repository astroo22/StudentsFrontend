import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './config';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private apiUrl = environment.apiBaseUrl + `/classes`;

  constructor(private http: HttpClient) { }
  // TODO: the below isn't set up yet
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