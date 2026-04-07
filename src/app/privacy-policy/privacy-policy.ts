import { Component } from '@angular/core';
import { FooterMinorPage } from '../shared/footer-minor-side/footer-minor-side';

@Component({
  standalone: true,
  selector: 'app-privacy-policy',
  imports: [FooterMinorPage],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy {

}
