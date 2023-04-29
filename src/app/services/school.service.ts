import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin,Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { School } from '../models/school.model';
import { Professor } from '../models/professor.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private apiSchUrl = 'http://localhost:3000/schools';
  private apiTelUrl = `http://localhost:3000/telemetry`

  constructor(private http: HttpClient) { }

  getAllSchools(): Observable<any> {
    return this.http.get(`${this.apiSchUrl}`).pipe(
      map((response:any)=>response as School)
    );
  }
  getClassesForSchool(school_id: string): Observable<any> {
    return this.http.get(`${this.apiSchUrl}/${school_id}/classes`);
  }

  getSchool(school_id: string): Observable<any> {
    return this.http.get<any>(`${this.apiSchUrl}/${school_id}`);
  }

  updateSchool(school_id: string, schoolData: any): Observable<any> {
    return this.http.put<any>(`${this.apiSchUrl}/${school_id}`, schoolData);
  }

  deleteSchool(school_id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiSchUrl}/${school_id}`);
  }
  // unsure whats wrong. School get works but bad return values
  getSchoolData(school_id: string,professorList: string[]): Observable<any> {
    const schoolUrl = `${this.apiTelUrl}/${school_id}/classes/avg_gpa`;
    const professorsUrl = `${this.apiTelUrl}/best-professors`;
    const params = new HttpParams().set('professor_ids', professorList.join(','));
    
    return forkJoin([
      this.http.get(schoolUrl),
      this.http.get<Professor[]>(professorsUrl, {params: params })
    ]);
  }
}