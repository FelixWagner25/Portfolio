import { Component } from '@angular/core';
import { FooterMinorSide } from '../shared/footer-minor-side/footer-minor-side';

@Component({
  standalone: true,
  selector: 'app-privacy-policy',
  imports: [FooterMinorSide],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy {

}
