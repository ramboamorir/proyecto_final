import { Routes } from '@angular/router';

import { Login } from './componentes/pages/login/login';
import { Register } from './componentes/pages/register/register';
import { Teachers } from './componentes/pages/teachers/teachers';
import { Students } from './componentes/pages/students/students';

import { AuthGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/role-guard';

export const routes: Routes = [
  // =========================
  // AUTENTICACIÓN
  // =========================
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login, title: 'Login' },
  { path: 'register', component: Register, title: 'Registro' },

  // =========================
  // DOCENTES
  // Acceso permitido para:
  // - admin
  // - user
  // =========================
  {
    path: 'docentes',
    component: Teachers,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['admin', 'user'],
    },
    title: 'Docentes',
  },

  // =========================
  // ESTUDIANTES
  // Acceso permitido para:
  // - admin
  // - user
  // =========================
  {
    path: 'estudiantes',
    component: Students,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['admin', 'user'],
    },
    title: 'Estudiantes',
  },

  // =========================
  // RUTA NO ENCONTRADA
  // =========================
  { path: '**', redirectTo: 'login' },
];
