import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

/**
 * Composant de mise en page en mode non connecté
 */

@Component({
  selector: 'aj-button',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  /**
   * Titre du bouton
   */
  @Input() title: string = '';
  /**
   * Affiche l'icone à gauche du bouton
   */
  @Input() showLeftIcon: string = '';
  /**
   * Affiche l'icone à droite du bouton
   */
  @Input() showRightIcon: string = '';
  /**
   * URL du bouton
   */
  @Input() url: string = '';
}
