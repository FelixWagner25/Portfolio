import { Component, inject } from '@angular/core';
import { AppLanguage, LanguageService } from '../services/language.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';

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

  public showOverlay: boolean = false;

  setLanguage(language: AppLanguage){
    this.languageService.setLanguage(language);
    console.log(language);
  }

  toggleMenu(){
    this.showOverlay = !this.showOverlay;
    if (this.showOverlay) {
      this.returnUrl = this.router.url
      console.log(this.returnUrl);
      this.router.navigate(['/menu']);
    } else {
      this.router.navigate([this.returnUrl]);
    }
  }
}
