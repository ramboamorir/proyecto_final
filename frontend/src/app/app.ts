import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./componentes/shared/header/header";
import { Navegation } from "./componentes/shared/navegation/navegation";
import { Footer } from "./componentes/shared/footer/footer";
import { Slider } from "./componentes/shared/slider/slider";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navegation, Footer, Slider],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('SPA');
}
