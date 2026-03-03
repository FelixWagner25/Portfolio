import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AppLanguage = "en" | "de";

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly STORAGE_KEY = "app_lang";

  private readInitialLanguage(): AppLanguage {
    let storedLanguage = localStorage.getItem(this.STORAGE_KEY);
    if ( storedLanguage === "de" || storedLanguage === "en"){return storedLanguage}
    else { 
      return "en" as AppLanguage
    }
  }

  private readonly languageSubject = new BehaviorSubject<AppLanguage>(
    this.readInitialLanguage());

  readonly language$ = this.languageSubject.asObservable();

  setLanguage(language: AppLanguage){
    if(language === this.languageSubject.value) return
    this.languageSubject.next(language);
    localStorage.setItem(this.STORAGE_KEY, language);
  }
}
