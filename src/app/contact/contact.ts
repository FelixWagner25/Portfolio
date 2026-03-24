import { AsyncPipe } from '@angular/common';
import { LanguageService } from '../shared/services/language.service';
import { Component, inject } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [AsyncPipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private languageService = inject(LanguageService);
  language$ = this.languageService.language$;
}
