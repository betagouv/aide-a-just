import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { AlertInterface } from './interfaces/alert';
import { AppService } from './services/app/app.service';
import { AlertComponent } from './components/alert/alert.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('aide-a-just');
  protected readonly environment = environment;
  /**
   * Variable qui permet d'afficher une alert
   */
  alertMessage: AlertInterface | null = null

  constructor(private appService: AppService) {
    this.appService.alert.subscribe((alert) => {
      this.alertMessage = alert;
    });
  }

  onCloseAlert() {
    this.alertMessage = null;
  }

  /**
   * Suppression de l'alert et du texte dans le service
   */
  onCloseAlertSecondary(clickToOk = false) {
    const alertObject = this.appService.alert.getValue()
    this.appService.alert.next(null)
    if (clickToOk && alertObject && alertObject.callbackSecondary) {
      alertObject.callbackSecondary()
    }
  }
  
}
