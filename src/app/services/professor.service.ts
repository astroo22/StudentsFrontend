import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private apiUrl = 'http://localhost:3000/professors'; // Update with your API URL

  constructor(private http: HttpClient) { }

  createProfessor(name: string): Observable<Professor> {
    const body = { name };
    return this.http.post<Professor>(`${this.apiUrl}/professors`, body);
  }

  getProfessor(professorId: string): Observable<Professor> {
    return this.http.get<Professor>(`${this.apiUrl}/professors/${professorId}`);
  }

  updateProfessor(professorId: string, updateOptions: any): Observable<any> {
    const body = { ...updateOptions };
    return this.http.put(`${this.apiUrl}/professors/${professorId}`, body);
  }

  deleteProfessor(professorId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/professors/${professorId}`);
  }
}