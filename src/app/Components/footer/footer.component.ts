import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  faGithub = faGithub;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faFacebook = faFacebook;
}
