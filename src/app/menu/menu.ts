import { Component, inject } from '@angular/core';
import { FooterMinorSide } from '../shared/footer-minor-side/footer-minor-side';
import { RouterLink } from "@angular/router";
import { MenuService } from '../shared/services/menu.service';

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [FooterMinorSide, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  private menuService = inject(MenuService);

  closeMenu(){
    this.menuService.setShowMenu(false);
  }
}
