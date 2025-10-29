import { AfterViewInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WrapperNoConnectedComponent } from '../../components/wrapper-no-connected/wrapper-no-connected.component';
import { SWITCH_LINE_KEY_CALL } from '../../constants/switch-line.constants';
import { environment } from '../../../environments/environment';
import { loadFile } from '../../utils/js-loader';

declare const hbspt: any;

/**
 * Être rappelé
 */

@Component({
  selector: 'aj-call-page',
  standalone: true,
  imports: [WrapperNoConnectedComponent],
  templateUrl: './call.page.html',
  styleUrls: ['./call.page.scss'],
})
export class CallPage implements AfterViewInit {
  SWITCH_LINE_KEY_CALL = SWITCH_LINE_KEY_CALL;
  /**
   * Constructeur pour définir le titre de la page
   * @param title
   */
  constructor(private title: Title) {
    this.title.setTitle('Être rappelé | A-Just');
  }

  ngAfterViewInit() {
    loadFile('https://js-eu1.hsforms.net/forms/embed/v2.js').then(() => {
      hbspt.forms.create({
        portalId: '26493393',
        formId: environment.callFormId,
        region: 'eu1',
        target: '#hubspotForm',
      });
    });
  }
}
