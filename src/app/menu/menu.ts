import { Component, inject } from '@angular/core';
import { FooterMinorSide } from '../shared/footer-minor-side/footer-minor-side';
import { RouterLink } from "@angular/router";
import { MenuService } from '../shared/services/menu.service';
import { LanguageService } from '../shared/services/language.service';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [FooterMinorSide, RouterLink, AsyncPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  private menuService = inject(MenuService);

  private languageService = inject(LanguageService);
  language$ = this.languageService.language$;

  readonly texts$ = this.language$.pipe(map((language) => language === 'de' ? germanTexts: englishTexts));

  closeMenu(){
    this.menuService.setShowMenu(false);
    this.menuService.animateCloseMenuBtn();
  }
}

export const germanTexts = {
  aboutMe: "Über mich",
  mySkills: "Fähigkeiten",
  myPortfolio: "Portfolio",
}

export const englishTexts = {
  aboutMe: "About me",
  mySkills: "My skills",
  myPortfolio: "Portfolio",
}