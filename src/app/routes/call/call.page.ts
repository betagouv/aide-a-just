import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WrapperNoConnectedComponent } from '../../components/wrapper-no-connected/wrapper-no-connected.component';
import { SWITCH_LINE_KEY_CALL } from '../../constants/switch-line.constants';

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
  SWITCH_LINE_KEY_CALL = SWITCH_LINE_KEY_CALL;
  /**
   * Constructeur pour définir le titre de la page
   * @param title
   */
  constructor(private title: Title) {
    this.title.setTitle('Être rappelé | A-Just');
  }
}
