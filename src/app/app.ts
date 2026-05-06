import { Component, inject, signal, AfterViewInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Header } from './shared/header/header';
import { ViewportScroller } from '@angular/common';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Portfolio');

  private viewportScroller = inject(ViewportScroller);

  constructor(
    private router: Router
  ){
    this.viewportScroller.setOffset([0,110]);
  }

  ngAfterViewInit(){
    AOS.init();

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      AOS.refresh();
    });
  }
}
