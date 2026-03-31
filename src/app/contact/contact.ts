import { AsyncPipe } from '@angular/common';
import { LanguageService } from '../shared/services/language.service';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/select';
import { MatInput, MatError } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge, map } from 'rxjs';


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

  readonly texts$ = this.language$.pipe(map((language) => language === 'de' ? germanTexts: englishTexts))

  readonly name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(512)]);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly message = new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(4096)]);

  nameErrorMessage = signal('');
  emailErrorMessage = signal('');
  messageErrorMessage = signal('');

  constructor(){
    merge(this.name.statusChanges, this.name.valueChanges).pipe(takeUntilDestroyed()).subscribe(()=> this.updateErrorMessage('name'));
    merge(this.email.statusChanges, this.email.valueChanges).pipe(takeUntilDestroyed()).subscribe(() => this.updateErrorMessage('email'));
    merge(this.message.statusChanges, this.message.valueChanges).pipe(takeUntilDestroyed()).subscribe(() => this.updateErrorMessage('message'));
  }

  updateErrorMessage(inputType:string){
    switch (inputType) {
      case "name":
        this.processNameErrorMessageUpdate();
        break;
      case "email":
        this.processEmailErrorMessageUpdate(); 
        break;
      case "message":
        this.processMessageErrorMessageUpdate();  
        break;
    }
  }

  processNameErrorMessageUpdate(){
    if(this.name.hasError('required')){
      this.nameErrorMessage.set('Your name is required');
    } else if (this.name.hasError('minlength')){
      this.nameErrorMessage.set('Not enough characters');
    } else if (this.name.hasError('maxlength')){
      this.nameErrorMessage.set('Too many characters');
    } else {
      this.nameErrorMessage.set('');
    }
  }

  processEmailErrorMessageUpdate(){
    if (this.email.hasError('required')){
      this.emailErrorMessage.set('Your email address is required');
    } else if (this.email.hasError('email')){
      this.emailErrorMessage.set('Not a valid email address');
    } else{
      this.emailErrorMessage.set('');
    }  
  }

  processMessageErrorMessageUpdate(){
    if (this.message.hasError('required')){
      this.messageErrorMessage.set('A message is required');
    } else if (this.message.hasError('minlength')){
      this.messageErrorMessage.set('Not enough characters');
    } else if (this.message.hasError('maxlength')){
      this.messageErrorMessage.set('Too many characters');
    } else{
      this.messageErrorMessage.set('');
    }   
  }
}

export interface ContactTexts {
  title: string;
  subtitle: string;
  nameLabel: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  nameRequiredError: string;
  emailRequiredError: string;
  messageRequiredError: string;
  privacyPrefix: string;
  privacyLink: string;
  privacySuffix: string;
  submit: string;
};

export const germanTexts: ContactTexts = {
  title: "Kontakt",
  subtitle: "Lassen Sie uns ins Gespräch kommen!",
  nameLabel: "Ihr Name",
  emailLabel: "Ihre E-Mail Adresse",
  emailPlaceholder: "kontakt@domain.de",
  messageLabel: "Ihre Nachricht",
  nameRequiredError: "Ihr Name ist erforderlich",
  emailRequiredError: "Ihre E-Mail Adresse ist erforderlich",
  messageRequiredError: "Ihre Nachricht ist erforderlich",
  privacyPrefix: "Ich habe die ",
  privacyLink: "Datenschutzerklärung",
  privacySuffix: " gelesen und stimme der Verarbeitung meiner Daten wie beschrieben zu.",
  submit: "Nachricht abschicken",
};

export const englishTexts: ContactTexts = {
  title: "Contact",
  subtitle: "Let us get in touch!",
  nameLabel: "Your name",
  emailLabel: "Your email",
  emailPlaceholder: "contact@domain.com",
  messageLabel: "Your message",
  nameRequiredError: "Your name is required",
  emailRequiredError: "Your email is required",
  messageRequiredError: "Your message is required",
  privacyPrefix: "I read the ",
  privacyLink: "privacy policy",
  privacySuffix: " and agree to the processing of my data as outlined.",
  submit: "Send message",
};