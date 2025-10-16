import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WrapperNoConnectedComponent } from '../../components/wrapper-no-connected/wrapper-no-connected.component';

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
  /**
   * Constructeur
   * @param title
   */
  constructor(private title: Title) {
    this.title.setTitle('Contact | A-Just');
  }
}
