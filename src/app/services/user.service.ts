import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from './config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiBaseUrl + '/users';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(environment.apiBaseUrl+ '/login', { username, password });
  }

  logout(): Observable<any> {
    return this.http.post('/api/auth/logout', {});
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, user);
  }

  getUser(ownerId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${ownerId}`);
  }

  updateUser(ownerId: string, user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/${ownerId}`, user);
  }

  deleteUser(ownerId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${ownerId}`);
  }

 
}