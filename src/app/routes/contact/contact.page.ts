import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WrapperNoConnectedComponent } from '../../components/wrapper-no-connected/wrapper-no-connected.component';
import { SWITCH_LINE_KEY_EMAIL } from '../../constants/switch-line.constants';
import { loadFile } from '../../utils/js-loader';
import { environment } from '../../../environments/environment';

declare const hbspt: any;

/**
 * Formulaire de contact
 */

@Component({
  selector: 'aj-contact-page',
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

  ngAfterViewInit() {
    loadFile('https://js-eu1.hsforms.net/forms/embed/v2.js').then(() => {
      hbspt.forms.create({
        portalId: '26493393',
        formId: environment.contactFormId,
        region: 'eu1',
        target: '#hubspotForm',
      });
    });
  }
}
