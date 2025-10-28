import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WrapperNoConnectedComponent } from '../../components/wrapper-no-connected/wrapper-no-connected.component';
import { SWITCH_LINE_KEY_APPOINTMENT } from '../../constants/switch-line.constants';

/**
 * Être rappelé
 */

@Component({
  selector: 'aj-meet-page',
  standalone: true,
  imports: [WrapperNoConnectedComponent],
  templateUrl: './meet.page.html',
  styleUrls: ['./meet.page.scss'],
})
export class MeetPage {
  SWITCH_LINE_KEY_APPOINTMENT = SWITCH_LINE_KEY_APPOINTMENT;
  /**
   * Constructeur
   * @param title
   */
  constructor(private title: Title) {
    this.title.setTitle('Rencontrer un expert | A-Just');
  }
}
