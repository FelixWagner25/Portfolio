import { Component, inject } from '@angular/core';
import { AppLanguage, LanguageService } from '../services/language.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

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

  public showOverlay: boolean = false;

  setLanguage(language: AppLanguage){
    this.languageService.setLanguage(language);
    console.log(language);
  }
}
