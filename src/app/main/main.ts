import { Component } from '@angular/core';
import { LandingPage } from '../landing-page/landing-page';
import { AboutMe } from '../about-me/about-me';

@Component({
  selector: 'app-main',
  imports: [LandingPage, AboutMe],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
