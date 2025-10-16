import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WrapperNoConnectedComponent } from '../../components/wrapper-no-connected/wrapper-no-connected.component';

/**
 * Être rappelé
 */

@Component({
  standalone: true,
  imports: [WrapperNoConnectedComponent],
    templateUrl: './meet.page.html',
  styleUrls: ['./meet.page.scss'],
})
export class MeetPage {
 /**
   * Constructeur
   * @param title
   */
  constructor(
    private title: Title,
  ) {
    this.title.setTitle('Rencontrer un expert | A-Just');
  }
}
