import { Component, inject } from '@angular/core';
import { FooterMinorSide } from '../shared/footer-minor-side/footer-minor-side';
import { AsyncPipe } from '@angular/common';
import { LanguageService } from '../shared/services/language.service';

@Component({
  selector: 'app-imprint',
  imports: [FooterMinorSide, AsyncPipe],
  templateUrl: './imprint.html',
  styleUrl: './imprint.scss',
})
export class Imprint {
  private languageService = inject(LanguageService);
  language$ = this.languageService.language$;
}
