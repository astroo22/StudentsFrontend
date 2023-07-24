import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiBaseUrl + '/users';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(private http: HttpClient,private as: AuthService) { }
  createUser(user: User): Observable<any> {
    console.log(user)
    return this.http.post<any>(`${this.apiUrl}/create_user`, user, this.httpOptions);
  }
 
  // also this one
  updateUser(ownerId: string, user: User): Observable<any> {
    this.as.isAuthenticated();
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const formData = new FormData();
    if(user.user_name) {
      formData.append('user_name', user.user_name);
      console.log(user.user_name)
    }
    if(user.email) {
      formData.append('email', user.email);
      console.log(user.email)
    }
    if(user.password){
      formData.append('password', user.password);
      console.log(user.password)
    }
    console.log(user)
    return this.http.put(`${this.apiUrl}/update_user/${ownerId}`,formData,{ headers: headers });
  }

   deleteUser(ownerId: string): Observable<any> {
    this.as.isAuthenticated();
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
     return this.http.delete(`${this.apiUrl}/${ownerId}`, { headers: headers });
   }

 
}