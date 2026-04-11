import { Component,inject } from '@angular/core';
import { FooterMinorSide } from '../shared/footer-minor-side/footer-minor-side';
import { AsyncPipe } from '@angular/common';
import { LanguageService } from '../shared/services/language.service';

@Component({
  standalone: true,
  selector: 'app-privacy-policy',
  imports: [FooterMinorSide, AsyncPipe],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy {
  private languageService = inject(LanguageService);
  language$ = this.languageService.language$;
}
