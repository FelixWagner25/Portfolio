import { Component, inject } from '@angular/core';
import { AppLanguage, LanguageService } from '../services/language.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { MenuOverlay } from '../../menu-overlay/menu-overlay';


@Component({
  standalone: true,
  selector: 'app-header',
  imports: [AsyncPipe, RouterLink, MenuOverlay],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private languageService = inject(LanguageService);
  language$ = this.languageService.language$;

  public showOverlay: boolean = false;

  setLanguage(language: AppLanguage){
    this.languageService.setLanguage(language);
    console.log(language);
  }

  toggleMenuOverlay(){
    this.showOverlay = !this.showOverlay;
    document.body.classList.toggle("menu-open", this.showOverlay);
  }

}
