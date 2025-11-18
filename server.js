// server.js
const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();
const helmet = require('helmet');

const csp = {
  xFrameOptions: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [
        "'self'",
        '*.hs-scripts.com',
        '*.hsforms.net',
        '*.beta.gouv.fr',
        '*.incubateur.net',
        '*.gitbook.com',
      ],
      scriptSrc: [
        "'self'",
        '*.hs-scripts.com',
        '*.hsforms.net',
        '*.beta.gouv.fr',
        '*.incubateur.net',
        '*.gitbook.com',
        '*.usemessages.com',
        '*.hs-analytics.net',
        '*.hscollectedforms.net',
        '*.hs-banner.com',
        'hubspot-forms-static-embed-eu1.s3.amazonaws.com',
      ],
      connectSrc: [
        "'self'",
        '*.hs-scripts.com',
        '*.hsforms.net',
        '*.beta.gouv.fr',
        '*.incubateur.net',
        '*.gitbook.com',
        '*.hscollectedforms.net',
        '*.hs-banner.com',
        '*.hsforms.com',
      ],
      frameSrc: ["'self'", '*.hsforms.net', '*.beta.gouv.fr', '*.incubateur.net', '*.gitbook.com', '*.hsforms.com'],
      imgSrc: ["'self'", '*.hs-scripts.com', '*.hsforms.net', '*.beta.gouv.fr', '*.incubateur.net', '*.gitbook.com'],
      childSrc: ["'self'", '*.hsforms.net', '*.beta.gouv.fr', '*.incubateur.net', '*.gitbook.com', '*.hsforms.com'],
    },
  },
};
// Activer la compression gzip pour toutes les réponses
app.use(
  compression({
    level: 9, // Niveau de compression max (1-9)
    threshold: 1024, // Compresser seulement si > 1KB
    filter: (req, res) => {
      // Compresser tous les types de contenu sauf si explicitement désactivé
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
  }),
);

app.use(helmet(csp));

// Servir les fichiers statiques du dossier dist/browser
app.use(express.static(path.join(__dirname, '/dist/aide-a-just/browser')));

// Redirection SPA : si le fichier n'existe pas, servir index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '/dist/aide-a-just/browser/index.html'));
});

// Démarrer le serveur
const port = process.env.PORT || 12080;
app.listen(port, () => {
  console.log(`🚀 Serveur démarré sur le port ${port}`);
});
