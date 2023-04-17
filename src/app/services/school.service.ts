import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { School } from '../models/school.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private apiUrl = 'http://localhost:3000/schools';

  constructor(private http: HttpClient) { }

  getAllSchools(): Observable<any> {
    return this.http.get(`${this.apiUrl}`).pipe(
      map((response:any)=>response as School)
    );
  }

  getSchool(school_id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${school_id}`);
  }

  updateSchool(school_id: string, schoolData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${school_id}`, schoolData);
  }

  deleteSchool(school_id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${school_id}`);
  }
}