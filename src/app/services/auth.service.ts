import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
//import jwt_decode from 'jwt-decode';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';
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

  // isAuthenticated(): boolean {
  //   const token = localStorage.getItem('access_token');
  //   if (token) {
  //     const { exp } = jwt_decode(token);
  //     if (Date.now() < exp * 1000) {
  //       return true;
  //     } else {
  //       localStorage.removeItem('access_token');
  //     }
  //   }
  //   return false;
  // }

  // getCurrentUser(): User {
  //   const token = localStorage.getItem('access_token');
  //   if (token) {
  //     const { sub } = jwt_decode(token);
  //     return { id: sub } as User;
  //   }
  //   return null;
  // }
}