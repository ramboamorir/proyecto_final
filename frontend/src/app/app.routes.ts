import { Routes } from '@angular/router';

import { Login } from './componentes/pages/login/login';
import { Register } from './componentes/pages/register/register';
import { Teachers } from './componentes/pages/teachers/teachers';
import { Students } from './componentes/pages/students/students';
import { AuthGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/role-guard';

export const routes: Routes = [

  // 🔐 Autenticación
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: Login, title:'Login' },
  { path: 'register', component: Register, title:'Registro' },

  // 📊 Módulos principales 🔥 activar guards
  {
    path: 'docentes', component: Teachers, canActivate: [AuthGuard, RoleGuard],
  },

  {
    path: 'estudiantes', component: Students, canActivate: [AuthGuard, RoleGuard],
  },

  // 🔄 Ruta por defecto
  { path: '**', redirectTo: '' }

]
