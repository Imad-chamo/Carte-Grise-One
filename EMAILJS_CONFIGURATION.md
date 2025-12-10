# Configuration EmailJS - Guide Complet

## ✅ Modifications effectuées

Les fichiers ont été modifiés pour utiliser EmailJS au lieu de PHP :
- ✅ `index.html` : Script EmailJS ajouté
- ✅ `script.js` : Code modifié pour utiliser EmailJS

## 📋 Étapes de configuration (5 minutes)

### Étape 1 : Créer un compte EmailJS

1. Aller sur https://www.emailjs.com
2. Cliquer sur **"Sign Up"** (gratuit jusqu'à 200 emails/mois)
3. Créer un compte avec votre email

### Étape 2 : Ajouter un service email

1. Dans le Dashboard EmailJS, aller dans **"Email Services"**
2. Cliquer sur **"Add New Service"**
3. Choisir votre fournisseur d'email :
   - **Gmail** (recommandé si vous avez Gmail)
   - **Outlook** (si vous avez Outlook/Hotmail)
   - **Custom SMTP** (pour OVH Cloud)
4. Suivre les instructions pour connecter votre compte
5. **Noter le Service ID** (ex: `service_abc123`)

### Étape 3 : Créer un template d'email

1. Dans le Dashboard, aller dans **"Email Templates"**
2. Cliquer sur **"Create New Template"**
3. **Noter le Template ID** (ex: `template_xyz789`)

4. Configurer le template :

   **Subject:**
   ```
   Nouvelle demande de contact - CARTE GRISE ONE
   ```

   **Content (HTML):**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <meta charset='UTF-8'>
       <style>
           body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
           .container { max-width: 600px; margin: 0 auto; padding: 20px; }
           .header { background: #FFFF00; color: #000; padding: 20px; text-align: center; font-weight: bold; }
           .content { background: #f9f9f9; padding: 20px; }
           .field { margin-bottom: 15px; }
           .label { font-weight: bold; color: #000; }
           .value { color: #555; margin-top: 5px; }
           .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
       </style>
   </head>
   <body>
       <div class='container'>
           <div class='header'>
               <h2>Nouvelle demande de contact</h2>
           </div>
           <div class='content'>
               <div class='field'>
                   <div class='label'>Nom complet :</div>
                   <div class='value'>{{firstName}} {{lastName}}</div>
               </div>
               <div class='field'>
                   <div class='label'>Email :</div>
                   <div class='value'>{{email}}</div>
               </div>
               <div class='field'>
                   <div class='label'>Téléphone :</div>
                   <div class='value'>{{phone}}</div>
               </div>
               <div class='field'>
                   <div class='label'>Service demandé :</div>
                   <div class='value'>{{service}}</div>
               </div>
               {{#if vehicleType}}
               <div class='field'>
                   <div class='label'>Type de véhicule :</div>
                   <div class='value'>{{vehicleType}}</div>
               </div>
               {{/if}}
               <div class='field'>
                   <div class='label'>Message :</div>
                   <div class='value'>{{message}}</div>
               </div>
           </div>
           <div class='footer'>
               <p>Email envoyé depuis le formulaire de contact de cartegriseone.fr</p>
           </div>
       </div>
   </body>
   </html>
   ```

   **Settings:**
   - **To Email:** `{{to_email}}`
   - **From Name:** `CARTE GRISE ONE`
   - **From Email:** `noreply@cartegriseone.fr` (ou votre email)
   - **Reply To:** `{{email}}`

5. Cliquer sur **"Save"**

### Étape 4 : Récupérer la clé publique

1. Dans le Dashboard, aller dans **"Account"** → **"General"**
2. Copier la **"Public Key"** (ex: `abcdefghijklmnop`)

### Étape 5 : Mettre à jour le code

Ouvrir `script.js` et remplacer les 3 valeurs suivantes :

**Ligne ~342 :**
```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Remplacer par votre Public Key
```

**Ligne ~404 :**
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { // Remplacer par vos IDs
```

**Exemple après modification :**
```javascript
emailjs.init("abcdefghijklmnop");
// ...
emailjs.send('service_abc123', 'template_xyz789', {
```

## 🧪 Tester

1. Ouvrir votre site web
2. Remplir le formulaire de contact
3. Soumettre le formulaire
4. Vérifier que l'email arrive bien à `contact@cartegriseone.fr`

## ⚠️ Notes importantes

- **Gratuit jusqu'à 200 emails/mois** avec le plan gratuit
- **Pas besoin de configuration serveur** - tout fonctionne côté client
- **Sécurisé** - les clés sont publiques mais limitées par EmailJS
- Le fichier `send-email.php` n'est plus utilisé mais peut être conservé en backup

## 🔧 Configuration OVH Cloud (optionnel)

Si vous utilisez OVH Cloud et choisissez "Custom SMTP" :

- **SMTP Server:** `ssl0.ovh.net`
- **SMTP Port:** `465` (SSL) ou `587` (STARTTLS)
- **SMTP Username:** Votre email OVH complet
- **SMTP Password:** Mot de passe de votre email OVH

## 📞 Support

Si vous avez des problèmes :
1. Vérifier la console du navigateur (F12) pour les erreurs
2. Vérifier que tous les IDs sont corrects dans `script.js`
3. Vérifier que le template EmailJS utilise les bonnes variables ({{firstName}}, etc.)



