import { Component, inject } from '@angular/core';
import { LanguageService } from '../shared/services/language.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-my-portfolio',
  imports: [AsyncPipe],
  templateUrl: './my-portfolio.html',
  styleUrl: './my-portfolio.scss',
})
export class MyPortfolio {
  private languageService = inject(LanguageService);
  language$ = this.languageService.language$;
}
