import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { menuBtnImages } from '../constants/image-srcs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private showMenuSubject = new BehaviorSubject<boolean>(false);
  showMenu$ = this.showMenuSubject.asObservable();

  private menuBtnSrcSubject = new BehaviorSubject<string>(menuBtnImages[0]);
  menuBtnSrc$ = this.menuBtnSrcSubject.asObservable();

  private router = inject(Router);

  setShowMenu(value: boolean){
    this.showMenuSubject.next(value);
  }

  toggleShowMenu(){
    this.showMenuSubject.next(!this.showMenuSubject.value)
  }

  getShowMenuStatus(){
    return this.showMenuSubject.value;
  }

  animateMenuBtn(){
    if (this.router.url === "/menu") {
      this.animateCloseMenuBtn();
    } else {
      this.animateOpenMenuBtn();
    }
  }

  animateOpenMenuBtn(){
    let index = 1;
    let animationInterval = setInterval(() => {
      if(index >= menuBtnImages.length){
        clearInterval(animationInterval);
      }
      else {
        this.menuBtnSrcSubject.next(menuBtnImages[index])
        index = index + 1;
      }
    },100)
  }

  animateCloseMenuBtn(){
    let index = menuBtnImages.length - 2;
    let animationInterval = setInterval(() => {
      if(index < 0){
        clearInterval(animationInterval);
      }
      else {
        this.menuBtnSrcSubject.next(menuBtnImages[index]);
        index = index - 1;
      }
    }, 100);
  }

}
