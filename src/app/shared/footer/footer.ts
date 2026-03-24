import { Component } from '@angular/core';
import { Contact } from '../../contact/contact';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [Contact],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {

}
