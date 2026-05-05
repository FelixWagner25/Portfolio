import { Component,inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LanguageService } from '../shared/services/language.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
    private languageService = inject(LanguageService);
    language$ = this.languageService.language$;
}

