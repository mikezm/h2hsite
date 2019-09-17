import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthData, LoginResponse } from './auth-data.model';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private userRole: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getUserRole() {
    return this.userRole;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    return this.http
      .post(BACKEND_URL + '/create', authData)
      .subscribe(() => {
        this.router.navigate(['/']);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  login(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Basic ' + btoa(email + ':' + password) })
    }
    this.http.get<LoginResponse>(BACKEND_URL + '/login', httpOptions)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expires_in;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.id;
          this.userRole = response.user_role;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId, this.userRole);
          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(authInformation, expiresIn);
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.userRole = authInformation.userRole;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.http.get(BACKEND_URL + '/logout')
      .subscribe(() => {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.userId = null;
        this.userRole = null;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, userRole: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', userRole);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    if (!token || !expirationDate || !userId || ! userRole) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userRole: userRole
    };
  }
}
