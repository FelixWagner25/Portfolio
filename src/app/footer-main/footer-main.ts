import { Component } from '@angular/core';
import { Contact } from '../contact/contact';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-footer-main',
  imports: [Contact, RouterLink],
  templateUrl: './footer-main.html',
  styleUrl: './footer-main.scss',
})
export class FooterMain {

}
