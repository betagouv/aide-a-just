import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { SWITCH_LINE_KEY_EMAIL } from '../../constants/switch-line.constants';
import { SWITCH_LINE_KEY_CALL } from '../../constants/switch-line.constants';
import { SWITCH_LINE_KEY_APPOINTMENT } from '../../constants/switch-line.constants';

@Component({
  selector: 'aj-switch-line',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './switch-line.component.html',
  styleUrls: ['./switch-line.component.scss'],
})
export class SwitchLineComponent {
  @Input() keySelected: string = '';
  SWITCH_LINE_KEY_EMAIL = SWITCH_LINE_KEY_EMAIL;
  SWITCH_LINE_KEY_CALL = SWITCH_LINE_KEY_CALL;
  SWITCH_LINE_KEY_APPOINTMENT = SWITCH_LINE_KEY_APPOINTMENT;

  onClick(key: string) {
    this.keySelected = key;
  }
}
