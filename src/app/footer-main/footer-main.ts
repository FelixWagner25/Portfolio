import { Component, inject } from '@angular/core';
import { Contact } from '../contact/contact';
import { RouterLink } from '@angular/router';
import { MenuService } from '../shared/services/menu.service';

@Component({
  standalone: true,
  selector: 'app-footer-main',
  imports: [Contact, RouterLink],
  templateUrl: './footer-main.html',
  styleUrl: './footer-main.scss',
})
export class FooterMain {
  private menuService = inject(MenuService);

  closeMenu(){
    this.menuService.setShowMenu(false);
  }
}
