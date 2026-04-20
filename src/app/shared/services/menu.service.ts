import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private showMenuSubject = new BehaviorSubject<boolean>(false);
  showMenu$ = this.showMenuSubject.asObservable();

  setShowMenu(value: boolean){
    this.showMenuSubject.next(value);
  }

  toggleShowMenu(){
    this.showMenuSubject.next(!this.showMenuSubject.value)
  }

  getShowMenuStatus(){
    return this.showMenuSubject.value;
  }
}
