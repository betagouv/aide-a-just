const sourceUrl = 'https://a-just.incubateur.net/';
export const environment = {
  production: false,
  environment: 'tj staging',
  NG_APP_GITBOOK_ID: process.env['NG_APP_GITBOOK_ID'] || '',
  NG_APP_GITBOOK_ORG_ID: process.env['NG_APP_GITBOOK_ORG_ID'] || '',
  NG_APP_GITBOOK_TOKEN: process.env['NG_APP_GITBOOK_TOKEN'] || '',
  isCA: false,
  isTJ: true,
  sourceUrl,
  NG_APP_SERVER_URL: sourceUrl+'/api',
  /**
 * Lien de la documentation
 */
 DOCUMENTATION_URL: 'https://docs.a-just.beta.gouv.fr/documentation-deploiement/',
 /**
  * Lien de la calculate
  */
 CALCULATE_DOWNLOAD_URL: sourceUrl+'/assets/Calculatrice_de_ventilation_du_temps_par_activité_A-JUST_MAG_et_GRF.xlsx',
 /**
  * Lien pour le guide de la donnée
  */
 DATA_GITBOOK: 'https://docs.a-just.beta.gouv.fr/le-data-book/',
 /**
  * URL de la nomenclature TJ
  */
 NOMENCLATURE_DOWNLOAD_URL: sourceUrl+'/assets/nomenclature-A-Just.html',
 /**
  * URL de la nomenclature TJ avec droit local
  */
 NOMENCLATURE_DROIT_LOCAL_DOWNLOAD_URL: sourceUrl+'/assets/nomenclature-A-Just-TJ-droit-local.html',

};
