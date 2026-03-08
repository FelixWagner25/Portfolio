import { Component, inject } from '@angular/core';
import { LanguageService } from '../shared/services/language.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-about-me',
  imports: [CommonModule,AsyncPipe],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {
  private languageService = inject(LanguageService);
  language$ = this.languageService.language$;
}
