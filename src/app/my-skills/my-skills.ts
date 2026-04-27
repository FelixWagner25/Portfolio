import { Component, inject } from '@angular/core';
import { LanguageService } from '../shared/services/language.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-my-skills',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './my-skills.html',
  styleUrl: './my-skills.scss',
})
export class MySkills {
  private languageService = inject(LanguageService);
  language$ = this.languageService.language$;
}
