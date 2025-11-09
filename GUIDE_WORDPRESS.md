# 🚀 Guide de Migration vers WordPress

## 📋 Structure du Thème WordPress

Pour convertir votre site en thème WordPress, vous devez créer la structure suivante :

```
wp-content/themes/cartegriseone/
├── style.css              (avec en-tête WordPress)
├── functions.php          (fonctions du thème)
├── index.php              (template principal)
├── header.php             (en-tête)
├── footer.php             (pied de page)
├── front-page.php         (page d'accueil)
├── single.php             (pages individuelles)
├── page.php               (pages statiques)
├── screenshot.png         (aperçu du thème)
└── assets/
    ├── css/
    │   └── styles.css     (votre styles.css)
    ├── js/
    │   └── script.js      (votre script.js)
    └── images/
        └── (vos images)
```

## 🔧 Étapes d'Installation

### 1. Créer le dossier du thème
```bash
wp-content/themes/cartegriseone/
```

### 2. Copier les fichiers
- Copier `styles.css` → `assets/css/styles.css`
- Copier `script.js` → `assets/js/script.js`
- Copier le dossier `imgs/` → `assets/images/`

### 3. Créer les fichiers WordPress
Les fichiers suivants seront créés automatiquement.

### 4. Activer le thème
1. Aller dans **Apparence > Thèmes**
2. Activer **CARTE GRISE ONE**

## 📝 Modifications nécessaires

### Chemins des fichiers
Tous les chemins doivent utiliser `get_template_directory_uri()` :
- `styles.css` → `<?php echo get_template_directory_uri(); ?>/assets/css/styles.css`
- `script.js` → `<?php echo get_template_directory_uri(); ?>/assets/js/script.js`
- Images → `<?php echo get_template_directory_uri(); ?>/assets/images/...`

### Fonctions WordPress à utiliser
- `wp_enqueue_style()` pour les CSS
- `wp_enqueue_script()` pour les JS
- `wp_head()` dans header.php
- `wp_footer()` dans footer.php
- `get_header()` et `get_footer()` dans les templates

## ⚙️ Configuration WordPress

### Plugins recommandés
1. **Contact Form 7** ou **WPForms** (pour le formulaire)
2. **Yoast SEO** (pour le SEO)
3. **WP Rocket** (pour la performance)
4. **Smush** (optimisation images)

### Pages à créer
1. **Accueil** (utilise front-page.php)
2. **Mentions légales** (page statique)
3. **Politique de confidentialité** (page statique)

## 🔄 Migration du contenu

### Options
1. **Copier-coller** : Copier le HTML dans l'éditeur WordPress
2. **Custom Fields** : Utiliser des champs personnalisés pour le contenu dynamique
3. **Page Builder** : Utiliser Elementor ou Gutenberg Blocks

## 📞 Support

Pour toute question, consultez la documentation WordPress :
https://developer.wordpress.org/themes/



