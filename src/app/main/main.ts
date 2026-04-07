import { Component } from '@angular/core';
import { LandingPage } from '../landing-page/landing-page';
import { AboutMe } from '../about-me/about-me';
import { MySkills } from '../my-skills/my-skills';
import { MyPortfolio } from '../my-portfolio/my-portfolio';
import { FooterMain } from '../footer-main/footer-main';

@Component({
  selector: 'app-main',
  imports: [LandingPage, AboutMe, MySkills, MyPortfolio, FooterMain],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
