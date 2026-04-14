import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { MenuOverlay } from "./menu-overlay/menu-overlay";
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MenuOverlay],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Portfolio');

  private viewportScroller = inject(ViewportScroller);

  constructor(){
    this.viewportScroller.setOffset([0,110]);
  }
}
