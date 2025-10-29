const sourceUrl = 'https://a-just-ca.incubateur.net/';
export const environment = {
  production: false,
  environment: 'ca staging',
  isCA: true,
  isTJ: false,
  sourceUrl,
  NG_APP_SERVER_URL: sourceUrl + 'api/',
  /**
   * Lien de la documentation
   */
  DOCUMENTATION_URL: 'https://docs.a-just.beta.gouv.fr/guide-dutilisateur-a-just-ca/',
  /**
   * Lien de la calculate
   */
  CALCULATE_DOWNLOAD_URL:
    sourceUrl + '/assets/Calculatrice_de_ventilation_du_temps_par_activité_A-JUST_MAG_et_GRF.xlsx',
  /**
   * Lien pour le guide de la donnée de CA
   */
  DATA_GITBOOK: 'https://docs.a-just.beta.gouv.fr/le-data-book-des-ca/',
  /**
   * URL de la nomenclature TJ
   */
  NOMENCLATURE_DOWNLOAD_URL: sourceUrl + '/assets/nomenclature-A-Just-CA.html',
  /**
   * URL de la nomenclature TJ avec droit local
   */
  NOMENCLATURE_DROIT_LOCAL_DOWNLOAD_URL: sourceUrl + '/assets/nomenclature-A-Just-CA.html',
};
