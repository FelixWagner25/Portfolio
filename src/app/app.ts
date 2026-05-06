import { Component, inject, signal} from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { Header } from './shared/header/header';
import { ViewportScroller } from '@angular/common';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Portfolio');

  private viewportScroller = inject(ViewportScroller);

  constructor(){
    this.viewportScroller.setOffset([0,110]);
  }

  ngAfterViewInit(){
    AOS.init({
      duration: 600,
    });
  }
}
