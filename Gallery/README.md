# 📁 Gallery Folder

Ce dossier contient tous les médias du site CARTE GRISE ONE.

## 📂 Structure

```
gallery/
├── demande_de_certificat_immatriculation_vehicule_remplissable.pdf  ← Formulaire Cerfa officiel
├── Plates/                  ← Images des plaques d'immatriculation (1.png à 10.png)
├── local/                   ← Photos du bureau
│   └── pic1.jpg
├── Partenaires/             ← Logos des entreprises partenaires
│   ├── lm-cars.png
│   ├── auto-vogue.png
│   ├── andac-cars.png
│   ├── corvette-avenue.png
│   ├── espace-alsace-motos.png
│   ├── americars.png
│   ├── nesta.png
│   ├── terrassement-jung.png
│   ├── pro-controle.png
│   ├── norisko.png
│   ├── ritterbeck.png
│   └── estteam-auto.png
├── bureau/                  ← (Optionnel) Photos bureau
├── processus/               ← (Optionnel) Photos du processus
└── equipe/                  ← (Optionnel) Photos de l'équipe
```

## 📄 Formulaire Cerfa

**Fichier** : `demande_de_certificat_immatriculation_vehicule_remplissable.pdf`

- **Nom complet** : Cerfa 13750*07
- **Titre** : Demande de certificat d'immatriculation d'un véhicule
- **Type** : Formulaire PDF remplissable
- **Usage** : Clients téléchargent ce formulaire pour le remplir avant de venir
- **Statut** : ✅ Fichier présent dans gallery/

## 🖼️ Images

### Plates (Plaques d'immatriculation)
- **Format** : PNG
- **Nommage** : 1.png, 2.png, 3.png... 10.png
- **Usage** : Section scrolling animée sous le Hero

### Local (Bureau)
- **Format** : JPG/PNG
- **Fichier principal** : `pic1.jpg`
- **Usage** : Section "Découvrez nos locaux"
- **Recommandations** :
  - Résolution : 1200x800px minimum
  - Format paysage
  - Bonne luminosité

### Partenaires
- **Format** : PNG (avec transparence de préférence)
- **Dimensions recommandées** : 300x150px
- **Usage** : Section "Nos Partenaires"
- **Liste des entreprises** :
  1. LM CARS 67
  2. AUTO VOGUE
  3. ANDAC CARS
  4. CONSEIL DE L'EUROPE / PERMANENCE DES PAYS DE L'UE
  5. CORVETTE AVENUE
  6. ESPACE ALSACE MOTOS PIÈCES
  7. AMERICARS
  8. NESTA Mundolsheim
  9. TERRASSEMENT JUNG
  10. PRO CONTRÔLE MUNDOLSHEIM
  11. NORISKO SOUFFEL
  12. AUTOMOBILE RITTERBECK
  13. EST'TEAM AUTO

## 📝 Notes

- **Optimisation** : Compresser les images avant upload (TinyPNG, Squoosh)
- **Formats** : JPG pour photos, PNG pour logos/transparence
- **Nommage** : Utiliser des noms explicites et sans espaces
- **Copyright** : S'assurer d'avoir les droits sur toutes les images

## 🔗 Liens dans le code

### Cerfa PDF
```javascript
// script.js ligne 67
const cerfaUrl = 'gallery/demande_de_certificat_immatriculation_vehicule_remplissable.pdf';
```

### Plates
```html
<!-- index.html -->
<img src="gallery/Plates/1.png">
<img src="gallery/Plates/2.png">
...
```

### Local
```html
<!-- index.html -->
<img src="gallery/local/pic1.jpg">
```

### Partenaires
```html
<!-- index.html -->
<img src="gallery/Partenaires/lm-cars.png">
<img src="gallery/Partenaires/auto-vogue.png">
...
```

---

**Dernière mise à jour** : 28 octobre 2025

