import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // private API = 'http://localhost:3000';
  private API = 'http://3.15.171.46:3000';

  constructor(private http: HttpClient) {}

  // =========================
  // AUTH API
  // =========================
  login(data: any) {
    return this.http.post(`${this.API}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.API}/register`, data);
  }

  // =========================
  // SESSION
  // =========================
  saveSession(res: any) {
    // Guardar token
    const token =
      res?.token ||
      res?.data?.token;

    // Guardar rol
    const role =
      res?.user?.role ||
      res?.data?.user?.role ||
      res?.role ||
      res?.data?.role;

    console.log('TOKEN RECIBIDO:', token);
    console.log('ROL RECIBIDO:', role);

    // Guardar en localStorage
    if (token) {
      localStorage.setItem('token', token);
    }

    if (role) {
      localStorage.setItem('role', role);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // =========================
  // VALIDATIONS
  // =========================
  isLogged(): boolean {
    return !!this.getToken();
  }

  // Alias opcional para usar en el Header
  isLoggedIn(): boolean {
    return this.isLogged();
  }

  isAdmin(): boolean {
    const role = this.getRole();

    if (!role) {
      return false;
    }

    const normalizedRole = role.trim().toLowerCase();

    return normalizedRole === 'admin' ||
          normalizedRole === 'administrador';
  }

  isUser(): boolean {
    const role = this.getRole();

    if (!role) {
      return false;
    }

    const normalizedRole = role.trim().toLowerCase();

    return normalizedRole === 'user' ||
          normalizedRole === 'usuario';
  }

  // Permite acceso a módulos académicos
  canViewAcademicModules(): boolean {
    return this.isAdmin() || this.isUser();
  }

  // =========================
  // LOGOUT
  // =========================
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
