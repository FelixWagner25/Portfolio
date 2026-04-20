import { Component } from '@angular/core';
import { FooterMinorSide } from '../shared/footer-minor-side/footer-minor-side';
import { RouterLink } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [FooterMinorSide, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
}
