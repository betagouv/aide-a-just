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

  ngAfterViewInit() {
    const my_awesome_script = document.createElement('script');
    my_awesome_script.setAttribute('type', 'text/javascript');
    my_awesome_script.setAttribute(
      'src',
      'https://assets.calendly.com/assets/external/widget.js'
    );
    document.head.appendChild(my_awesome_script);

    this.loadCalendly();
  }

  loadCalendly() {
    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/support-a-just/support?hide_gdpr_banner=1',
        parentElement: document.getElementById('calendly'),
        prefill: {},
        utm: {},
      });
    } else {
      setTimeout(() => {
        this.loadCalendly();
      }, 100);
    }
  }
}
