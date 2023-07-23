import { Injectable,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { User } from '../models/user.model';
import { environment } from './config';
import { BehaviorSubject, throwError, Subject  } from 'rxjs';
import { map, catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl =  environment.apiBaseUrl;
  private _username = new BehaviorSubject<string | null>(localStorage.getItem('username'));
  public readonly username$ = this._username.asObservable();
  public userLoggedIn: EventEmitter<void> = new EventEmitter();
  public userLoggedOut: EventEmitter<void> = new EventEmitter();

  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  changeUsername(username: string) {
    this._username.next(username);
  }

  constructor(private http: HttpClient,private router: Router) { }

  login(username: string, password: string): Observable<User | null> {
    const credentials = { username,password: password };
    return this.http.post<User>(`${this.apiUrl}/login`, credentials, this.httpOptions)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('access_token', response.token);
          localStorage.setItem('username', response.username);
          localStorage.setItem('ownerID', response.ownerID);
          // probably going to remove email no reason to have this
          localStorage.setItem('email', response.email);
          
          // Redirect the user
          this._username.next(username);
          this.userLoggedIn.emit();
          this.router.navigate(['/project']);
          
        }),
        catchError((error: any) => {
          console.error('Login error:', error);
          return throwError(()=> error);
        })
      );
  }
 

  logout(): void {
    localStorage.clear();
    this._username.next(null);
    this.userLoggedOut.emit();
    this.router.navigate(['/home'])
  }

  isAuthenticatedPub(): boolean{
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwt_decode(token) as { exp: number, sub: string, owner_id: string, email?: string };
      if (Date.now() < decodedToken.exp * 1000) {
        return true;
      } else {
        localStorage.clear();
        this._username.next(null);
      }
    }
    return false;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwt_decode(token) as { exp: number, sub: string, owner_id: string, email?: string };
      if (Date.now() < decodedToken.exp * 1000) {
        return true;
      } else {
        localStorage.clear();
        this._username.next(null);
        this.router.navigate(['/login']);
      }
    }
    return false;
  }

  getCurrentUser(): User {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwt_decode(token) as { sub: string, owner_id: string, email?: string };
      return { user_name: decodedToken.sub, owner_id: decodedToken.owner_id, email: decodedToken?.email } as User;
    }
    return { user_name: '', owner_id: '', email: '' } as User;
  }

  isRunning(): Observable<boolean> {
     return this.http.get<{ isRunning: boolean }>(`${this.apiUrl}/status`)
    .pipe(
      map(response => response.isRunning)
    );
  }
}