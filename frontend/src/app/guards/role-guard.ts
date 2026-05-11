import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Obtener rol almacenado en localStorage
    const role = this.authService.getRole();

    // Si no existe rol, regresar al login
    if (!role) {
      this.router.navigate(['/login']);
      return false;
    }

    // Obtener roles permitidos definidos en app.routes.ts
    const allowedRoles = route.data['roles'] as string[];

    // Si la ruta no define roles, permitir acceso
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }

    // Normalizar rol actual
    const normalizedRole = role.trim().toLowerCase();

    // Normalizar roles permitidos
    const normalizedAllowedRoles = allowedRoles.map((r) => r.trim().toLowerCase());

    // Validar acceso
    if (normalizedAllowedRoles.includes(normalizedRole)) {
      return true;
    }

    // Si no tiene permisos, redirigir al login
    this.router.navigate(['/login']);
    return false;
  }
}
