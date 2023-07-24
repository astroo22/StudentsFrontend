import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private apiUrl = environment.apiBaseUrl + `/professors`; 

  constructor(private http: HttpClient) { }

  //TODO: none of this is properly setup yet
  createProfessor(name: string): Observable<Professor> {
    const body = { name };
    return this.http.post<Professor>(`${this.apiUrl}`, body);
  }

  getProfessor(professorId: string): Observable<Professor> {
    return this.http.get<Professor>(`${this.apiUrl}/${professorId}`);
  }

  updateProfessor(professorId: string, updateOptions: any): Observable<any> {
    const body = { ...updateOptions };
    return this.http.put(`${this.apiUrl}/${professorId}`, body);
  }

  deleteProfessor(professorId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${professorId}`);
  }
}