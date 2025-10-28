import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WrapperNoConnectedComponent } from '../../components/wrapper-no-connected/wrapper-no-connected.component';
import { SWITCH_LINE_KEY_EMAIL } from '../../constants/switch-line.constants';

/**
 * Être rappelé
 */

@Component({
  standalone: true,
  imports: [WrapperNoConnectedComponent],
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {
  SWITCH_LINE_KEY_EMAIL = SWITCH_LINE_KEY_EMAIL;

  /**
   * Constructeur
   * @param title
   */
  constructor(private title: Title) {
    this.title.setTitle('Contact | A-Just');
  }
}
