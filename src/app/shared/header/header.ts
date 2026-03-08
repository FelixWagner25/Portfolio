import { Component, inject } from '@angular/core';
import { AppLanguage, LanguageService } from '../services/language.service';
import { AsyncPipe } from '@angular/common';
import { MatMenu, MatMenuTrigger, MatMenuItem } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';


@Component({
  standalone: true,
  selector: 'app-header',
  imports: [AsyncPipe, MatMenuTrigger, MatIconButton, MatMenu, MatMenuItem],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private languageService = inject(LanguageService);
  language$ = this.languageService.language$;

  setLanguage(language: AppLanguage){
    this.languageService.setLanguage(language);
    console.log(language);
  }
}
