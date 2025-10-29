# 📘 GUIDE CLIENT - CARTE GRISE ONE

Bienvenue ! Ce guide vous aidera à comprendre et utiliser votre nouveau site web.

---

## 🎉 Félicitations !

Votre site web professionnel est **prêt** ! Il a été développé avec les dernières technologies et optimisé pour la performance et le référencement.

---

## 📂 Qu'avez-vous reçu ?

### Fichiers principaux
1. **index.html** - Votre page web
2. **styles.css** - Le design de votre site
3. **script.js** - Les fonctionnalités interactives
4. **Images** - Vos logos (CR-ONE-logo.png, etc.)

### Fichiers de configuration
5. **.htaccess** - Configuration serveur (performance + sécurité)
6. **robots.txt** - Pour Google et les moteurs de recherche
7. **sitemap.xml** - Plan de votre site pour Google

### Documentation
8. **README.md** - Documentation technique
9. **DEPLOYMENT.md** - Guide de mise en ligne
10. **CHANGELOG.md** - Historique des versions
11. **RAPPORT_FINAL.md** - Rapport détaillé du projet
12. **GUIDE_CLIENT.md** - Ce guide

---

## 🚀 Comment mettre mon site en ligne ?

### Option 1 : Vous avez un hébergeur (OVH, O2Switch, etc.)

1. **Connectez-vous à votre espace d'hébergement**
2. **Accédez au gestionnaire de fichiers** (ou utilisez FileZilla)
3. **Uploadez tous les fichiers** dans le dossier `public_html/` ou `www/`
4. **C'est tout !** Votre site est en ligne

### Option 2 : Vous n'avez pas encore d'hébergeur

Je recommande :
- **O2Switch** (France) : ~5€/mois - Excellent support
- **OVH** (France) : ~3€/mois - Très populaire
- **Hostinger** : ~2€/mois - Économique

**Besoin d'aide ?** Je peux vous assister pour 50€ supplémentaires.

---

## ⚠️ IMPORTANT : Images manquantes

Votre site a besoin de **2 dossiers d'images** :

### 1. Dossier `Plates/`
Créez un dossier nommé `Plates` et ajoutez **10 images** :
- `1.png` - Logo ANTS
- `2.png` - Logo Ministère
- `3.png` - Logo Préfecture
- `4.png` - Logo SIV
- `5.png` - Logo Gouvernement
- `6.png` - Logo Service Public
- `7.png` - Logo Administration
- `8.png` - Logo Institution
- `9.png` - Logo Organisme
- `10.png` - Logo Partenaire

**Format recommandé** : PNG transparent, 200x100px

### 2. Dossier `gallery/`
Créez un dossier `gallery` avec 3 sous-dossiers :

**gallery/bureau/** (photos de votre bureau)
- `bureau1.jpg`
- `bureau2.jpg`
- `bureau3.jpg`
- etc.

**gallery/processus/** (photos du processus de travail)
- `processus1.jpg`
- `processus2.jpg`
- `processus3.jpg`
- etc.

**gallery/equipe/** (photos de votre équipe)
- `equipe1.jpg`
- `equipe2.jpg`
- `equipe3.jpg`
- etc.

**Format recommandé** : JPG, 800x600px, optimisées pour le web

---

## 📝 Comment modifier le contenu ?

### Changer le texte

1. **Ouvrez `index.html`** avec un éditeur de texte (Notepad++, VS Code, etc.)
2. **Cherchez le texte** que vous voulez modifier
3. **Remplacez-le** par votre nouveau texte
4. **Sauvegardez** le fichier
5. **Uploadez** le fichier modifié sur votre serveur

**Exemple** : Pour changer le numéro de téléphone
```html
<!-- Cherchez -->
03 88 97 18 60

<!-- Remplacez par votre nouveau numéro -->
03 XX XX XX XX
```

### Changer les couleurs

1. **Ouvrez `styles.css`**
2. **Cherchez** `#FFFF00` (jaune flash actuel)
3. **Remplacez** par votre nouvelle couleur (ex: `#FF5733` pour orange)
4. **Sauvegardez** et uploadez

### Changer les images

1. **Préparez votre nouvelle image** (même nom ou renommez-la)
2. **Uploadez-la** dans le même dossier
3. **Remplacez** l'ancienne image

---

## 📞 Fonctionnalités de votre site

### 1. **Chat WhatsApp** 💬
Le bouton vert en bas à droite ouvre un chat automatique.

**Comment le personnaliser ?**
- Ouvrez `script.js`
- Cherchez `function getBotReply`
- Modifiez les réponses automatiques

**Pour rediriger vers votre vrai WhatsApp :**
Changez le lien dans `index.html` :
```html
<a href="https://wa.me/33388971860" target="_blank">
```
Remplacez `33388971860` par votre numéro (format international sans +)

### 2. **Formulaire de contact** 📧
Actuellement, le formulaire affiche juste un message de confirmation.

**Pour recevoir les emails :**
Vous avez 2 options :

**Option A : PHP simple** (gratuit)
- Je vous fournis un fichier `send-email.php`
- Coût : 30€

**Option B : Service externe** (recommandé)
- Formspree.io (gratuit jusqu'à 50 emails/mois)
- EmailJS (gratuit jusqu'à 200 emails/mois)
- Coût : 20€ pour la configuration

### 3. **Galerie photos** 📸
Cliquez sur les onglets (Bureau, Processus, Équipe) pour changer de galerie.

**Pour ajouter des photos :**
1. Ajoutez vos images dans `gallery/bureau/`, `gallery/processus/`, ou `gallery/equipe/`
2. Ouvrez `index.html`
3. Copiez une ligne existante :
```html
<img src="gallery/bureau/bureau1.jpg" alt="Bureau">
```
4. Changez le nom du fichier
5. Sauvegardez

### 4. **FAQ** ❓
Les questions s'ouvrent/ferment au clic.

**Pour modifier les questions :**
1. Ouvrez `index.html`
2. Cherchez `<div class="faq-item">`
3. Modifiez le texte
4. Sauvegardez

---

## 🔍 Référencement Google (SEO)

Votre site est **déjà optimisé** pour Google, mais voici comment l'améliorer :

### 1. Google Search Console (GRATUIT)
1. Allez sur https://search.google.com/search-console
2. Ajoutez votre site `cartegriseone.fr`
3. Soumettez votre sitemap : `https://cartegriseone.fr/sitemap.xml`

### 2. Google My Business (GRATUIT et ESSENTIEL)
1. Allez sur https://www.google.com/business/
2. Créez votre fiche entreprise
3. Ajoutez votre adresse, horaires, photos
4. **Résultat** : Vous apparaîtrez sur Google Maps !

### 3. Mots-clés importants
Votre site est optimisé pour :
- "carte grise Mundolsheim"
- "carte grise Strasbourg"
- "carte grise rapide"
- "agence ANTS"

**Conseil** : Créez du contenu autour de ces mots-clés (blog, actualités)

---

## 📊 Statistiques (Google Analytics)

Pour savoir combien de visiteurs vous avez :

1. Créez un compte Google Analytics (gratuit)
2. Obtenez votre code de suivi (ex: G-XXXXXXXXXX)
3. Envoyez-moi le code, je l'ajoute au site (10€)

**Ou faites-le vous-même :**
1. Ouvrez `index.html`
2. Ajoutez ce code avant `</head>` :
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-VOTRE-CODE"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-VOTRE-CODE');
</script>
```

---

## 🔒 Sécurité HTTPS (Cadenas vert)

**IMPORTANT** : Activez le HTTPS pour :
- ✅ Sécuriser les données de vos clients
- ✅ Améliorer votre référencement Google
- ✅ Inspirer confiance

**Comment faire ?**
La plupart des hébergeurs offrent un **certificat SSL gratuit** (Let's Encrypt).

1. Connectez-vous à votre hébergeur
2. Cherchez "SSL" ou "Certificat"
3. Activez le SSL gratuit
4. Attendez 10-30 minutes

**Puis, modifiez `.htaccess`** :
Décommentez ces lignes (retirez le #) :
```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## 💰 Tarifs des services supplémentaires

| Service | Prix | Délai |
|---------|------|-------|
| Configuration email formulaire | 30€ | 1h |
| Installation Google Analytics | 10€ | 30min |
| Ajout d'une nouvelle page | 50€ | 2h |
| Modification design | 40€/h | Variable |
| Maintenance mensuelle | 50€/mois | Continu |
| Support prioritaire | 80€/mois | Continu |
| Formation utilisation site | 60€ | 1h30 |

---

## 🆘 Besoin d'aide ?

### Problèmes courants

**1. Mon site n'affiche pas les images**
- Vérifiez que les images sont bien uploadées
- Vérifiez les noms de fichiers (majuscules/minuscules)
- Vérifiez les permissions (644 pour les fichiers)

**2. Le formulaire ne fonctionne pas**
- Normal ! Il faut configurer l'envoi d'emails (voir plus haut)

**3. Mon site est lent**
- Optimisez vos images (max 200 KB par image)
- Activez le cache (déjà fait dans .htaccess)
- Contactez votre hébergeur

**4. Je veux changer quelque chose mais j'ai peur de casser le site**
- Faites toujours une **copie de sauvegarde** avant de modifier
- Testez sur un sous-domaine d'abord (ex: test.cartegriseone.fr)
- Contactez-moi pour assistance

---

## 📞 Contact Support

**Email** : [votre-email@exemple.com]  
**Téléphone** : [votre-numéro]  
**Disponibilité** : Lun-Ven, 9h-18h

**Tarif support** :
- Première heure : Incluse dans le prix du site
- Heures suivantes : 40€/h

---

## ✅ Checklist de lancement

Avant de promouvoir votre site, vérifiez :

- [ ] Toutes les images sont uploadées
- [ ] Le numéro de téléphone est correct
- [ ] L'adresse email est correcte
- [ ] Les horaires sont à jour
- [ ] Le site s'affiche bien sur mobile
- [ ] Le HTTPS est activé (cadenas vert)
- [ ] Google My Business est créé
- [ ] Google Search Console est configuré
- [ ] Vous avez testé le formulaire de contact
- [ ] Vous avez testé le chat WhatsApp
- [ ] Vous avez partagé le site sur vos réseaux sociaux

---

## 🎯 Conseils pour réussir

### 1. **Contenu régulier**
Ajoutez du contenu régulièrement (actualités, conseils) pour améliorer votre SEO.

### 2. **Avis clients**
Demandez à vos clients satisfaits de laisser un avis sur Google My Business.

### 3. **Réseaux sociaux**
Partagez votre site sur Facebook, Instagram, LinkedIn.

### 4. **Publicité locale**
- Google Ads (payant mais efficace)
- Facebook Ads (ciblage local)
- Flyers avec QR code vers votre site

### 5. **Partenariats**
Échangez des liens avec des garages, concessionnaires, etc.

---

## 📈 Évolutions futures possibles

Voici ce qu'on pourrait ajouter plus tard :

1. **Blog** (pour le SEO) - 200€
2. **Réservation en ligne** - 300€
3. **Espace client** (suivi de dossier) - 500€
4. **Paiement en ligne** - 400€
5. **Application mobile** - 1500€
6. **Version multilingue** (Allemand) - 300€

---

## 🎉 Merci de votre confiance !

Votre site a été développé avec soin et professionnalisme. J'espère qu'il vous apportera beaucoup de clients !

**N'hésitez pas à me contacter** pour toute question ou amélioration.

**Bonne chance avec votre nouveau site ! 🚀**

---

**Développé par** : [Votre nom]  
**Date de livraison** : 27 octobre 2025  
**Version** : 1.0.0  
**Garantie** : 1 mois de corrections gratuites

