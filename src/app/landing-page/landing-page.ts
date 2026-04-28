import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { scrollDownArrowImages } from '../shared/constants/image-srcs';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  private index: number = 2;
  private animationInterval?: ReturnType<typeof setInterval>;
  public arrowImg = scrollDownArrowImages[this.index];

  constructor(private cdr: ChangeDetectorRef){}

  ngOnInit(){
    this.animateScrollDownArrow();
  }

  ngOnDestroy(){
    if (this.animationInterval){
      clearInterval(this.animationInterval);
    }
  }

  animateScrollDownArrow(){
    this.animationInterval = setInterval(() => {
      this.index = this.index % scrollDownArrowImages.length;
      this.arrowImg = scrollDownArrowImages[this.index];
      this.index += 1;
      this.cdr.detectChanges();
    }, 500);
  }

   constructArrowBackgroundUrl(){
    return this.arrowImg === 'none' ? 'none': `url(${this.arrowImg})`
  }
}
