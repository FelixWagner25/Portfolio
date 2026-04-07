import { Component } from '@angular/core';
import { Contact } from '../contact/contact';

@Component({
  standalone: true,
  selector: 'app-footer-main',
  imports: [Contact],
  templateUrl: './footer-main.html',
  styleUrl: './footer-main.scss',
})
export class FooterMain {

}
