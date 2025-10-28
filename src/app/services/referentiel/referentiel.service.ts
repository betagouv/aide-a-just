import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * Service de centralisation des traitements lié au référentiel
 */
@Injectable({
  providedIn: 'root',
})
export class ReferentielService {
  route = inject(ActivatedRoute);
  isDroitLocal: boolean = false;

  /**
   * Constructor
   */
  constructor() {
    const filter = this.route.snapshot.queryParamMap.get('dl');
    if (filter) {
      this.isDroitLocal = filter === 'true';
    }
  }
}
