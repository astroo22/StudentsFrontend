import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin,Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { School } from '../models/school.model';
import { Professor } from '../models/professor.model';
import { AuthService } from './auth.service';
import { environment } from './config';
@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private apiSchUrl = environment.apiBaseUrl +'/schools';
  private apiTelUrl = environment.apiBaseUrl +`/telemetry`

  constructor(private http: HttpClient,private as: AuthService) { }

  // public handlers for anybody
  getAllSchools(): Observable<any> {
    return this.http.get(`${this.apiSchUrl}`).pipe(
      map((response:any)=>response as School)
    );
  }
   getSchoolData(school_id: string,professorList: string[]): Observable<any> {
    const schoolUrl = `${this.apiTelUrl}/${school_id}/classes/avg_gpa`;
    const professorsUrl = `${this.apiTelUrl}/best-professors`;
    const params = new HttpParams().set('professor_ids', professorList.join(','));
    
    return forkJoin([
      this.http.get(schoolUrl),
      this.http.get<Professor[]>(professorsUrl, {params: params })
    ]);
  }

  getClassesForSchool(school_id: string): Observable<any> {
    return this.http.get(`${this.apiSchUrl}/school/${school_id}/classes`);
  }

  getStudentsForSchool(school_id: string): Observable<any> {
    return this.http.get(`${this.apiSchUrl}/school/${school_id}/students`);
  }

  getSchool(school_id: string): Observable<any> {
    return this.http.get<any>(`${this.apiSchUrl}/${school_id}`);
  }

  // handlers for user
  createNewSchool(name: string, owner_id: string, num_per_grade:number):Observable<any>{
    this.as.isAuthenticated();
    const token = localStorage.getItem('access_token');
    // prepare headers
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
    const formData = new FormData();
    formData.append('name', name);
    formData.append('owner_id', owner_id);
    formData.append('num_per_grade', num_per_grade.toString());
    return this.http.post(`${this.apiTelUrl}/${owner_id}`,formData, { headers: headers })
  }
  // checks operation ID for generation
  checkCreationStatus(operation_id: string): Observable<any> {
    return this.http.get(`${this.apiTelUrl}/creation_status/${operation_id}`);
  }

  getAllSchoolsForUser( owner_id: string): Observable<any> {
    this.as.isAuthenticated();
    const token = localStorage.getItem('access_token');
    // prepare headers
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiSchUrl}/${owner_id}`, { headers: headers }).pipe(
      map((response:any)=>response as School)
    );
  }

  updateSchool(school_id: string, school_name: string,school_enrollment_change_ids: string[]): Observable<any> {
    this.as.isAuthenticated();
    const token = localStorage.getItem('access_token');
    const ownerID = localStorage.getItem('ownerID');
    // prepare headers
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
    const data = {
      owner_id: ownerID,
      name: school_name,
      enrollment_change_ids: school_enrollment_change_ids
   };

    return this.http.put<any>(`${this.apiSchUrl}/school/${school_id}`, data, { headers: headers });
  }

  updateSchoolAvgGpa(school_id: string):Observable<any>{
    return this.http.get(`${this.apiTelUrl}/${school_id}/update/avg_gpa`);
  }
  
  //schools/school/{school_id}
 
  deleteSchool(school_id: string): Observable<any> {
    this.as.isAuthenticated();
    const token = localStorage.getItem('access_token');
    const ownerID = localStorage.getItem('ownerID');
    // prepare headers
    console.log("here")
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
    const data = {
      owner_id: ownerID
    };
    return this.http.put<any>(`${this.apiSchUrl}/school/${school_id}/delete`,data, {headers: headers});
  } 
}