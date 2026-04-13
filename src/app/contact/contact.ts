import { AsyncPipe } from '@angular/common';
import { LanguageService } from '../shared/services/language.service';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/select';
import { MatInput, MatError } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { merge, map } from 'rxjs';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [AsyncPipe, MatInput, MatFormField, MatLabel, MatCheckbox, FormsModule, ReactiveFormsModule, MatError, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private languageService = inject(LanguageService);
  language$ = this.languageService.language$;

  private http = inject(HttpClient);

  formComplete: boolean = false;

  readonly texts$ = this.language$.pipe(map((language) => language === 'de' ? germanTexts: englishTexts));
  readonly texts = toSignal(this.texts$, {initialValue: englishTexts});

  readonly name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(512)]);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly message = new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(4096)]);
  readonly checkbox = new FormControl(false, Validators.requiredTrue);

  readonly contactFormInput = new FormGroup({
    name: this.name,
    email: this.email,
    message: this.message,
    checkbox: this.checkbox,
  })

  isSendingMail = signal(false);
  sendMailSuccess = signal(false);
  sendMailError = signal('');
  

  nameErrorMessage = signal('');
  emailErrorMessage = signal('');
  messageErrorMessage = signal('');
  checkboxErrorMessage = signal('');

  constructor(){
    merge(this.name.statusChanges, this.name.valueChanges).pipe(takeUntilDestroyed()).subscribe(()=> this.updateErrorMessage('name'));
    merge(this.email.statusChanges, this.email.valueChanges).pipe(takeUntilDestroyed()).subscribe(() => this.updateErrorMessage('email'));
    merge(this.message.statusChanges, this.message.valueChanges).pipe(takeUntilDestroyed()).subscribe(() => this.updateErrorMessage('message'));
    merge(this.checkbox.statusChanges,this.checkbox.valueChanges).pipe(takeUntilDestroyed()).subscribe(()=> this.updateErrorMessage('checkbox'));
  }

  submitForm(){
    if(this.contactFormInput.invalid){
      this.contactFormInput.markAllAsTouched();
      return;
    }

    const messageData = {
      name: this.name.value ?? '',
      email: this.email.value ?? '',
      message: this.message.value ?? '',
    };

    this.isSendingMail.set(true);
    this.sendMailSuccess.set(false);
    this.sendMailError.set('')

    this.http.post<{ success: boolean; error?: string}>(
      'https://felixwagner.eu/contact.php', messageData
    ).subscribe({
      next: (response) => {
        this.isSendingMail.set(false);

        if (response.success){
          this.sendMailSuccess.set(true);
          this.contactFormInput.reset({
            name: '',
            email: '',
            message: '',
            checkbox: false
          });
         } else {
            this.sendMailError.set(response.error ?? 'Unknown error on sending message');
          }
        },
        error: (error) => {
          this.isSendingMail.set(false);
          this.sendMailError.set(error?.error?.error ?? 'Server error');
        }
      });
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
      case "checkbox":
        this.processCheckboxErrorMessageUpdate();
        break;
    }
  }

  processNameErrorMessageUpdate(){
    if(this.name.hasError('required')){
      this.nameErrorMessage.set(this.texts().nameRequiredError);
    } else if (this.name.hasError('minlength')){
      this.nameErrorMessage.set(this.texts().tooLessCharacterError);
    } else if (this.name.hasError('maxlength')){
      this.nameErrorMessage.set(this.texts().tooManyCharactersError);
    } else {
      this.nameErrorMessage.set('');
    }
  }

  processEmailErrorMessageUpdate(){
    if (this.email.hasError('required')){
      this.emailErrorMessage.set(this.texts().emailRequiredError);
    } else if (this.email.hasError('email')){
      this.emailErrorMessage.set(this.texts().emailPatternError);
    } else{
      this.emailErrorMessage.set('');
    }  
  }

  processMessageErrorMessageUpdate(){
    if (this.message.hasError('required')){
      this.messageErrorMessage.set(this.texts().messageRequiredError);
    } else if (this.message.hasError('minlength')){
      this.messageErrorMessage.set(this.texts().tooLessCharacterError);
    } else if (this.message.hasError('maxlength')){
      this.messageErrorMessage.set(this.texts().tooManyCharactersError);
    } else{
      this.messageErrorMessage.set('');
    }   
  }

  processCheckboxErrorMessageUpdate(){
    if (this.checkbox.hasError('required')){
      this.checkboxErrorMessage.set(this.texts().checkboxRequiredError);
    } else {
      this.checkboxErrorMessage.set('')
    };
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
  tooLessCharacterError: string;
  tooManyCharactersError: string;
  emailPatternError: string;
  checkboxRequiredError: string;
  privacyPrefix: string;
  privacyLink: string;
  privacySuffix: string;
  submit: string;
};

export const germanTexts: ContactTexts = {
  title: "Kontakt",
  subtitle: "Lassen Sie uns ins Gespräch kommen!",
  nameLabel: "Ihr Name",
  emailLabel: "Ihre E-Mail-Adresse",
  emailPlaceholder: "kontakt@domain.de",
  messageLabel: "Ihre Nachricht",
  nameRequiredError: "Ihr Name ist erforderlich",
  emailRequiredError: "Ihre E-Mail-Adresse ist erforderlich",
  messageRequiredError: "Ihre Nachricht ist erforderlich",
  tooLessCharacterError: "Zu wenig Zeichen",
  tooManyCharactersError: "Zu viele Zeichen",
  emailPatternError: "Keine valide E-Mail-Adresse",
  checkboxRequiredError: "Ihre Bestätiung ist erforderlich",
  privacyPrefix: "Ich habe die ",
  privacyLink: "Datenschutzerklärung",
  privacySuffix: " gelesen und stimme der Verarbeitung meiner Daten zu.",
  submit: "Nachricht senden",
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
  tooLessCharacterError: "Too less characters",
  tooManyCharactersError: "Too many characters",
  emailPatternError: "Not a valid email address",
  checkboxRequiredError: "Your agreement is required",
  privacyPrefix: "I read the ",
  privacyLink: "privacy policy",
  privacySuffix: " and agree to the processing of my data as outlined.",
  submit: "Send message",
};