import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * Accueil
 */

@Component({
  standalone: true,
  imports: [],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  /**
   * Constructeur pour définir le titre de la page
   * @param title
   */
  constructor(private title: Title) {
    this.title.setTitle('Aide | A-Just');
  }
}
