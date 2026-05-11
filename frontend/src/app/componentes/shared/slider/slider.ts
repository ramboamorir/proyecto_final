import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.html',
  styleUrl: './slider.css',
})
export class Slider {

  slides = [
    {
      image: 'assets/slide1.jpg',
      title: 'Bienvenido al sistema',
      description: 'Gestión escolar moderna y eficiente'
    },
    {
      image: 'assets/slide2.jpg',
      title: 'Control académico',
      description: 'Administra estudiantes y docentes'
    },
    {
      image: 'assets/slide3.jpg',
      title: 'Reportes en tiempo real',
      description: 'Información clara y organizada'
    }
  ];

  currentIndex = 0;

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
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
