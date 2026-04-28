import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { AppLanguage, LanguageService } from '../services/language.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { menuBtnImages } from '../constants/image-srcs';

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
  private returnUrl: string = "";

  private menuService = inject(MenuService);

  public menuBtnSrc = menuBtnImages[0];

  constructor(private cdr: ChangeDetectorRef){}

  setLanguage(language: AppLanguage){
    this.languageService.setLanguage(language);
  }

  toggleMenu(){
    this.menuService.toggleShowMenu();
    this.animateMenuBtn();
    if (this.menuService.getShowMenuStatus()) {
      this.returnUrl = this.mapReturnUrl(this.router.url)
      this.router.navigate(['/menu']);
    } else {
      this.router.navigate([this.returnUrl]);
    }
    console.log(this.returnUrl);
  }

  closeMenu(){
    this.menuService.setShowMenu(false);
  }

  mapReturnUrl(url: string): string {
    switch (url) {
      case "": case "/imprint": case "/privacy-policy": case "/page-not-found": case "/menu":
        return url;
      default:
        return "";
    }
  }

  animateMenuBtn(){
    let index = 0;
    let animationInterval = setInterval(() => {
      if(index >= menuBtnImages.length){
        clearInterval(animationInterval);
      }
      else {
        this.menuBtnSrc = menuBtnImages[index];
        index = index + 1;
      }
      this.cdr.detectChanges();
    }, 500);
  }

  returnMenuBtnSrc(){
    return this.menuBtnSrc;
  }
}
