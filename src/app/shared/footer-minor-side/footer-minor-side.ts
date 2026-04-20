import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuService } from '../services/menu.service';

@Component({
  standalone: true,
  selector: 'app-footer-minor-side',
  imports: [RouterLink],
  templateUrl: './footer-minor-side.html',
  styleUrl: './footer-minor-side.scss',
})
export class FooterMinorSide {
  private menuService = inject(MenuService);

  closeMenu(){
    this.menuService.setShowMenu(false);
  }
}
