import { AsyncPipe } from '@angular/common';
import { LanguageService } from '../shared/services/language.service';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/select';
import { MatInput, MatError } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [AsyncPipe, MatInput, MatFormField, MatLabel, MatCheckbox, FormsModule, ReactiveFormsModule, MatError],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private languageService = inject(LanguageService);
  language$ = this.languageService.language$;

  readonly email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = signal('');

  constructor(){
    merge(this.email.statusChanges, this.email.valueChanges).pipe(takeUntilDestroyed()).subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage(){
    if (this.email.hasError('required')){
      this.errorMessage.set('Your email address is required');
    } else if (this.email.hasError('email')){
      this.errorMessage.set('Not a valid email address');
    } else{
      this.errorMessage.set('');
    }
  }
}
