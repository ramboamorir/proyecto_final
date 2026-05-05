import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  user = {
    name: '',
    email: '',
    password: '',
    role: 'user',
  };

  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  // register() {

  //   this.loading = true;

  //   this.auth.register(this.user).subscribe({
  //     next: () => {
  //       alert('Usuario creado');
  //       this.router.navigate(['/login']);
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       alert('Error al registrar');
  //       this.loading = false;
  //     }
  //   });
  // }
  register() {
    this.loading = true;
    // this.auth.register(this.user).subscribe({
    //   next: () => {

    //     alert('Usuario creado');
    //     this.router.navigate(['/login']);
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     alert('Error al registrar');
    //     this.loading = false;
    //   }
    // });
    this.auth.register(this.user).subscribe({
      next: () => {
        alert('✅ Usuario creado correctamente');
        this.router.navigate(['/login']);
        this.loading = false;
      },

      error: (err) => {
        console.error(err);
        this.loading = false;

        // 🔴 VALIDACIONES DEL BACKEND
        if (err.status === 400) {
          alert('⚠️ El usuario ya existe');
        } else if (err.status === 500) {
          alert('❌ Error interno del servidor');
        } else {
          alert('❌ Error desconocido al registrar usuario');
        }
      },
    });
  }
}
