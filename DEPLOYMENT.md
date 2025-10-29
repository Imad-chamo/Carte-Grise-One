# 🚀 Guide de Déploiement - CARTE GRISE ONE

## 📋 Checklist avant déploiement

### 1. Fichiers requis
- [x] index.html
- [x] styles.css
- [x] script.js
- [x] .htaccess
- [x] robots.txt
- [x] sitemap.xml
- [x] CR-ONE-logo.png
- [x] CR-ONE-logo-footer.png
- [ ] Dossier `Plates/` avec 10 images (1.png à 10.png)
- [ ] Dossier `gallery/` avec sous-dossiers (bureau, processus, equipe)

### 2. Configuration serveur

#### Prérequis Apache
```apache
# Modules requis
mod_rewrite
mod_deflate
mod_expires
mod_headers
mod_mime
```

#### Vérifier les modules
```bash
apache2ctl -M | grep -E 'rewrite|deflate|expires|headers|mime'
```

### 3. Configuration DNS
```
Type A  : cartegriseone.fr → [IP_SERVEUR]
Type A  : www.cartegriseone.fr → [IP_SERVEUR]
```

### 4. SSL/HTTPS
```bash
# Avec Let's Encrypt (recommandé)
certbot --apache -d cartegriseone.fr -d www.cartegriseone.fr
```

Puis décommenter dans `.htaccess` :
```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## 📦 Étapes de déploiement

### Option 1 : FTP/SFTP
```bash
# Connexion SFTP
sftp user@cartegriseone.fr

# Upload des fichiers
put -r * /var/www/html/

# Vérifier les permissions
chmod 644 *.html *.css *.js *.xml *.txt
chmod 755 Plates/ gallery/
```

### Option 2 : Git (recommandé)
```bash
# Sur le serveur
cd /var/www/html/
git clone https://github.com/votre-repo/cartegriseone.git .

# Ou mise à jour
git pull origin main
```

### Option 3 : cPanel
1. Connectez-vous à cPanel
2. Allez dans "Gestionnaire de fichiers"
3. Uploadez tous les fichiers dans `public_html/`
4. Vérifiez que `.htaccess` est présent

## 🔧 Configuration post-déploiement

### 1. Tester le site
```bash
# Vérifier que le site répond
curl -I https://cartegriseone.fr

# Tester la compression GZIP
curl -H "Accept-Encoding: gzip" -I https://cartegriseone.fr
```

### 2. Mettre à jour sitemap.xml
Remplacer la date dans `sitemap.xml` :
```xml
<lastmod>2025-10-27</lastmod>
```

### 3. Soumettre à Google
1. Google Search Console : https://search.google.com/search-console
2. Ajouter la propriété `cartegriseone.fr`
3. Soumettre le sitemap : `https://cartegriseone.fr/sitemap.xml`

### 4. Configurer Google Analytics (optionnel)
Ajouter avant `</head>` dans `index.html` :
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 5. Tester la performance
- PageSpeed Insights : https://pagespeed.web.dev/
- GTmetrix : https://gtmetrix.com/
- WebPageTest : https://www.webpagetest.org/

**Objectifs** :
- ✅ Score PageSpeed > 90
- ✅ Temps de chargement < 2s
- ✅ First Contentful Paint < 1s

## 🔒 Sécurité

### 1. Permissions fichiers
```bash
# Fichiers
find . -type f -exec chmod 644 {} \;

# Dossiers
find . -type d -exec chmod 755 {} \;

# .htaccess
chmod 644 .htaccess
```

### 2. Backup réguliers
```bash
# Script de backup automatique
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf backup-cartegriseone-$DATE.tar.gz /var/www/html/
```

### 3. Monitoring
- Uptime Robot : https://uptimerobot.com/
- Pingdom : https://www.pingdom.com/

## 📧 Configuration email (formulaire de contact)

### Option 1 : PHP Mail (basique)
Créer `send-email.php` :
```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars($_POST['phone']);
    $service = htmlspecialchars($_POST['service']);
    $message = htmlspecialchars($_POST['message']);
    
    $to = "contact@cartegriseone.fr";
    $subject = "Nouveau contact - $service";
    $body = "Nom: $name\nEmail: $email\nTéléphone: $phone\nService: $service\n\nMessage:\n$message";
    $headers = "From: $email\r\nReply-To: $email";
    
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
}
?>
```

Modifier `script.js` ligne 189 :
```javascript
// Envoi réel au serveur
fetch('send-email.php', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        showNotification('Votre demande a été envoyée !', 'success');
        contactForm.reset();
    } else {
        showNotification('Erreur lors de l\'envoi.', 'error');
    }
});
```

### Option 2 : Service externe (recommandé)
- **Formspree** : https://formspree.io/
- **EmailJS** : https://www.emailjs.com/
- **SendGrid** : https://sendgrid.com/

## 🐛 Dépannage

### Le site ne s'affiche pas
```bash
# Vérifier les logs Apache
tail -f /var/log/apache2/error.log

# Vérifier les permissions
ls -la /var/www/html/
```

### Les images ne chargent pas
```bash
# Vérifier que les dossiers existent
ls -la Plates/
ls -la gallery/

# Vérifier les permissions
chmod 755 Plates/ gallery/
chmod 644 Plates/*.png gallery/*/*.jpg
```

### .htaccess ne fonctionne pas
```apache
# Dans la config Apache (/etc/apache2/sites-available/000-default.conf)
<Directory /var/www/html>
    AllowOverride All
</Directory>

# Redémarrer Apache
sudo systemctl restart apache2
```

### Compression GZIP inactive
```bash
# Activer mod_deflate
sudo a2enmod deflate
sudo systemctl restart apache2
```

## 📊 Monitoring post-déploiement

### Métriques à surveiller
- **Uptime** : > 99.9%
- **Temps de réponse** : < 500ms
- **Taux d'erreur** : < 0.1%
- **Trafic** : Augmentation mensuelle

### Outils recommandés
- Google Analytics : Trafic et comportement
- Google Search Console : SEO et indexation
- Hotjar : Heatmaps et enregistrements
- Cloudflare : CDN et protection DDoS (optionnel)

## 🔄 Mises à jour

### Procédure de mise à jour
1. **Backup** du site actuel
2. **Test** en local ou sur un environnement de staging
3. **Upload** des nouveaux fichiers
4. **Test** en production
5. **Rollback** si problème

### Fréquence recommandée
- **Contenu** : Mensuel (actualités, photos)
- **Sécurité** : Immédiat (patches)
- **Fonctionnalités** : Trimestriel

## ✅ Checklist finale

- [ ] Site accessible via HTTPS
- [ ] Toutes les images chargent correctement
- [ ] Formulaire de contact fonctionne
- [ ] Chat WhatsApp opérationnel
- [ ] Navigation mobile fluide
- [ ] Score PageSpeed > 90
- [ ] Sitemap soumis à Google
- [ ] Analytics configuré
- [ ] Backup automatique en place
- [ ] Monitoring actif

---

**Support** : Pour toute question, contactez l'équipe technique.

**Date de déploiement** : _____________  
**Version** : 1.0.0

