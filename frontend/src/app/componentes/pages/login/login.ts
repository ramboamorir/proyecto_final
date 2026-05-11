import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user = {
    email: '',
    password: '',
  };
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  // login() {
  // this.authService.login(this.form).subscribe({
  //   next: (res: any) => {
  //     this.authService.saveSession(res);
  //     this.router.navigate(['/students']);
  //     }
  //   });
  // }
  login() {

    // 🔍 VALIDACIONES FRONTEND
    if (!this.user.email || !this.user.password) {
      alert('⚠️ Email y contraseña son obligatorios');
      return;
    }

    this.loading = true;

    console.log('LOGIN PAYLOAD:', this.user); // 🧪 DEBUG
    console.log('ROL GUARDADO EN LOCALSTORAGE:', this.authService.getRole());

    this.authService.login(this.user).subscribe({

      next: (res: any) => {

        // 🔐 guardar sesión
        this.authService.saveSession(res);

        // 🔥 obtener rol
        const role = this.authService.getRole();

        // 🚀 redirección
        if (role === 'admin') {
          this.router.navigate(['/teachers']);
        } else {
          this.router.navigate(['/students']);
        }

        this.loading = false;
      },

      error: (err) => {

        console.error('LOGIN ERROR:', err);
        this.loading = false;

        // 🧠 MENSAJES INTELIGENTES
        if (err.status === 400) {
          alert(err.error?.msg || 'Credenciales incorrectas');
        }
        else if (err.status === 401) {
          alert('No autorizado');
        }
        else if (err.status === 500) {
          alert('Error en el servidor');
        }
        else {
          alert('Error al iniciar sesión');
        }

      }

    });
  }
}
