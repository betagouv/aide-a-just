const sourceUrl = 'https://a-just.beta.gouv.fr/';
export const environment = {
  production: true,
  environment: 'aucun',
  isCA: false,
  isTJ: true,
  sourceUrl,
  NG_APP_SERVER_URL: sourceUrl + 'api/',
  /**
   * Lien de la documentation
   */
  DOCUMENTATION_URL: 'https://docs.a-just.beta.gouv.fr/documentation-deploiement/',
  /**
   * Lien de la calculate
   */
  CALCULATE_DOWNLOAD_URL: sourceUrl + 'assets/Calculatrice_de_ventilation_du_temps_par_activité_A-JUST_MAG_et_GRF.xlsx',
  /**
   * Lien pour le guide de la donnée
   */
  DATA_GITBOOK: 'https://docs.a-just.beta.gouv.fr/le-data-book/',
  /**
   * URL de la nomenclature TJ
   */
  NOMENCLATURE_DOWNLOAD_URL: sourceUrl + 'assets/nomenclature-A-Just.html',
  /**
   * URL de la nomenclature TJ avec droit local
   */
  NOMENCLATURE_DROIT_LOCAL_DOWNLOAD_URL: sourceUrl + 'assets/nomenclature-A-Just-TJ-droit-local.html',
  contactFormId: '0f776962-cddf-4ccb-b2a8-100936289ebb',
  callFormId: '229eda51-8847-45e9-a629-74a59e6bc551',
};
