import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.API}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.API}/register`, data);
  }

  saveSession(res: any) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.user.role);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isLogged(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
