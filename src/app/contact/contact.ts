import { AsyncPipe } from '@angular/common';
import { LanguageService } from '../shared/services/language.service';
import { Component, inject } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';


@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [AsyncPipe, MatInput, MatFormField, MatLabel, MatCheckbox],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private languageService = inject(LanguageService);
  language$ = this.languageService.language$;
}
