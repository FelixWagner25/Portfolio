import { Component, inject } from '@angular/core';
import { AppLanguage, LanguageService } from '../services/language.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private languageService = inject(LanguageService);
  language$ = this.languageService.language$;

  private router = inject(Router);
  private returnUrl = "";

  private menuService = inject(MenuService);

  setLanguage(language: AppLanguage){
    this.languageService.setLanguage(language);
  }

  toggleMenu(){
    this.menuService.toggleShowMenu();
    if (this.menuService.getShowMenuStatus()) {
      this.returnUrl = this.router.url
      this.router.navigate(['/menu']);
    } else {
      this.router.navigate([this.returnUrl]);
    }
    console.log(this.returnUrl);
  }

  closeMenu(){
    this.menuService.setShowMenu(false);
  }
}
