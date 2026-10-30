# Botova.dev

Site web vitrine consacré au développement et à la création de solutions numériques.

**Site web :** https://botova.dev  
**Dépôt GitHub :** https://github.com/montblancsw-debug/botova

## Présentation

Botova présente des solutions de développement web, des applications, des logiciels, des bots et des plugins.

Le site permet de découvrir les prestations proposées, de consulter les différentes plateformes.

## Technologies utilisées

- HTML5
- CSS3
- JavaScript natif
- Modules JavaScript ES6
- Visual Studio Code

Le projet fonctionne sans framework JavaScript et sans base de données.

## Fonctionnalités

### Navigation

- Barre de navigation avec menus déroulants.
- Navigation entre les différentes pages.
- Ancres de navigation pour accéder aux sections.
- Menus adaptés aux ordinateurs, tablettes et smartphones.
- Pied de page commun aux différentes pages.
- Page 404 pour les rubriques non disponibles.

### Bots et plugins

- Présentation des offres Botova.
- Catalogue des solutions Discord.
- Présentation des bots et des plugins.
- Navigation entre les différentes fiches Discord.
- Pagination des cartes de plugins.
- Carrousel des plateformes avec flèches, indicateurs et navigation tactile.
- Pages de présentation Twitch, YouTube, WhatsApp et LinkedIn.

### Compte utilisateur

- Formulaire d'inscription avec nom, prénom, adresse e-mail et mot de passe.
- Formulaire de connexion avec vérification des identifiants.
- Page de profil affichant les informations du compte.
- Gestion de la connexion et de la déconnexion.
- Validation des champs et affichage des messages.

Le système de comptes est une démonstration.
Les données sont conservées localement dans le navigateur à l'aide de localStorage et sessionStorage.

Les mots de passe sont hachés avant leur enregistrement local.

### Contact

- Formulaire de contact avec champs obligatoires.
- Vérification des informations saisies.
- Contrôle du format de l'adresse e-mail.
- Affichage des erreurs et d'un message de confirmation.

Le formulaire fonctionne est fictif : aucun message n'est envoyé au serveur.

## Organisation du projet

Le dossier `public` contient les pages et les ressources nécessaires au fonctionnement du site.

```text
Botova.dev/
├── public/
│   ├── css/
│   │   ├── base/
│   │   │   └── responsive/
│   │   ├── components/
│   │   └── pages/
│   ├── html/
│   │   ├── 404/
│   │   ├── about/
│   │   ├── account/
│   │   ├── bots/
│   │   ├── components/
│   │   └── contact/
│   ├── images/
│   │   ├── logos/
│   │   └── platforms/
│   ├── js/
│   │   ├── account/
│   │   ├── bots/
│   │   ├── components/
│   │   └── contact/
│   └── index.html
└── README.md
```

### Fichiers HTML

Les pages sont regroupées dans `public/html/`.

Le dossier `components/` contient les éléments partagés, notamment la navigation, les menus déroulants, les ancres et le pied de page.

### Fichiers CSS

- `css/base/` : styles généraux et responsive.
- `css/components/` : styles des composants réutilisables.
- `css/pages/` : styles spécifiques aux différentes pages.

### Fichiers JavaScript

- `js/navigation.js` : navigation et gestion du compte de démonstration.
- `js/dropdown.js` : ouverture et fermeture des menus déroulants.
- `js/anchors.js` : navigation entre les sections.
- `js/components/html-loader.js` : chargement des composants HTML communs.
- `js/bots/` : carrousel, pagination et interactions des pages Bots.
- `js/account/` : formulaires et gestion du profil.
- `js/contact/` : validation du formulaire de contact.

## Installation et lancement en local

1. Cloner le dépôt GitHub :

```bash
git clone https://github.com/montblancsw-debug/botova.git
```

2. Ouvrir le dossier `botova` dans Visual Studio Code.

3. Installer l'extension **Live Server** si elle n'est pas déjà présente.

4. Ouvrir le fichier `public/index.html` avec **Open with Live Server**.

Le site est alors accessible localement, généralement à l'adresse :

`http://127.0.0.1:5500/public/`

Un serveur local est nécessaire pour permettre le chargement des modules JavaScript et des composants HTML.

Aucune installation de dépendances avec npm est nécessaire.

## Responsive et compatibilité

L'interface a été adaptée aux différentes tailles d'écran :

- Ordinateurs de bureau et écrans ultralarges.
- Ordinateurs portables.
- Tablettes en portrait et paysage.
- Smartphones.

Le fonctionnement et l'affichage ont été testés avec Google Chrome, Microsoft Edge et Mozilla Firefox et également Opéra.

Des audits Lighthouse ont également été réalisés sur la page d'accueil pour examiner les performances, l'accessibilité, les bonnes pratiques et le référencement.

## Conception graphique

La maquette a été réalisée avec Canva avant l'intégration en HTML, CSS et JavaScript.

L'interface utilise une charte graphique commune aux différentes pages, avec la police Inter et des composants réutilisables.

Une attention particulière a été portée à la cohérence de la navigation, à la lisibilité des contenus et à l'adaptation aux différents écrans.

## Hébergement

Le site est hébergé sur un serveur OVH et administré avec CloudPanel.

La configuration actuelle repose sur :

- Cloudflare pour la gestion du domaine et du DNS.
- Un certificat SSL/TLS pour l'accès en HTTPS.

Le contenu du dossier `public` est placé directement dans le répertoire racine du site sur le serveur.

Les URL publiques simplifiées sont gérées par la configuration du serveur et les règles de redirection, sans modification des chemins du projet local.