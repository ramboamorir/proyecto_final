import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
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
  ){}
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
