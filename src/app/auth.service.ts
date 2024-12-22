import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiResponse } from './model/smart_staff_models';
import { basePath } from './smart-staff.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  basePath: String= basePath;

  constructor(private http: HttpClient, private router: Router) {}

  login(payload: { email: string; password: string }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(basePath + '/api/auth/signIn', payload).pipe(
      tap((response) => {
        if (response.status === 'SUCCESS') {
          localStorage.setItem('token', response.data?.token);
          localStorage.setItem('roles', JSON.stringify(response.data?.roles));
          this.currentUserSubject.next(response.data);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  hasRole(role: string): boolean {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    return roles.includes(role);
  }
}
