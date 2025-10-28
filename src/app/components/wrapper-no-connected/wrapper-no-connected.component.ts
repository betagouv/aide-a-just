import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { environment } from '../../../environments/environment';
import { SwitchLineComponent } from '../switch-line/switch-line.component';
import { RouterModule } from '@angular/router';

/**
 * Composant de mise en page en mode non connecté
 */

@Component({
  selector: 'aj-wrapper-no-connected',
  standalone: true,
  imports: [CommonModule, ButtonComponent, SwitchLineComponent, RouterModule],
  templateUrl: './wrapper-no-connected.component.html',
  styleUrls: ['./wrapper-no-connected.component.scss'],
})
export class WrapperNoConnectedComponent {
  /**
   * Titre de la page du paneau gauche
   */
  @Input() title: string = '';
  /**
   * Affiche ou non le paneau de gauche
   */
  @Input() showLeftPanel: boolean = true;
  /**
   * Ajout ou non de padding sur le contenu
   */
  @Input() contentPadding: boolean = true;
  /**
   * Clé sélectionnée
   */
  @Input() switchLinekeySelected: string = '';

  protected readonly environment = environment;
  /**
   * Clé sélectionnée
   */
  @Input() keySelected: string = '';
}
