import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  // Mostrar el botón solo cuando exista sesión
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isDark = false;

  toggleTheme() {
    this.isDark = !this.isDark;

    if (this.isDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      this.isDark = true;
      document.body.classList.add('dark-mode');
    }
  }

  fontSize = 16;

  increaseFont() {
    if (this.fontSize < 24) {
      this.fontSize++;
      this.applyFont();
    }
  }

  decreaseFont() {
    if (this.fontSize > 12) {
      this.fontSize--;
      this.applyFont();
    }
  }

  resetFont() {
    this.fontSize = 16;
    this.applyFont();
  }

  applyFont() {
    document.documentElement.style.setProperty(
      '--font-size-base',
      this.fontSize + 'px'
    );

    localStorage.setItem('fontSize', this.fontSize.toString());
  }
}
