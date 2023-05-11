import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { User } from '../models/user.model';
import { environment } from './config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl =  environment.apiBaseUrl;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    const credentials = { username, password };
    return this.http.post<User>(`${this.apiUrl}/login`, credentials, this.httpOptions)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('access_token', response.access_token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwt_decode(token) as { exp: number, sub: string, owner_id: string, email?: string };
      if (Date.now() < decodedToken.exp * 1000) {
        return true;
      } else {
        localStorage.removeItem('access_token');
      }
    }
    return false;
  }

  getCurrentUser(): User {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwt_decode(token) as { sub: string, owner_id: string, email?: string };
      return { user_name: decodedToken.sub, owner_id: decodedToken.owner_id, email: decodedToken.email } as User;
    }
    return { user_name: '', owner_id: '', email: '' } as User;
  }
}