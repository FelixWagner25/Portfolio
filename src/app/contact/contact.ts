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
