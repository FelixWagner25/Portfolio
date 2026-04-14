import { Component } from '@angular/core';
import { FooterMinorSide } from '../shared/footer-minor-side/footer-minor-side';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-menu-overlay',
  imports: [FooterMinorSide, RouterLink],
  templateUrl: './menu-overlay.html',
  styleUrl: './menu-overlay.scss',
})
export class MenuOverlay {

}
