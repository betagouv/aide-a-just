import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WrapperNoConnectedComponent } from '../../components/wrapper-no-connected/wrapper-no-connected.component';

/**
 * Être rappelé
 */

@Component({
  standalone: true,
  imports: [WrapperNoConnectedComponent],
  templateUrl: './call.page.html',
  styleUrls: ['./call.page.scss'],
})
export class CallPage {
  /**
   * Constructeur pour définir le titre de la page
   * @param title
   */
  constructor(private title: Title) {
    this.title.setTitle('Être rappelé | A-Just');
  }
}
