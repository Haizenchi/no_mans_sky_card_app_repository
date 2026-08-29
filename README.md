# Atlas Identity Card

Générateur web de carte d'identification RP inspirée de l'univers de No Man's Sky.

**Créateur : Haizenchi**

## Utilisation

1. Ouvrir `index.html` dans un navigateur récent.
2. Remplir les champs Nom, Race, Code et Discord.
3. Ajouter éventuellement un portrait.
4. Ajuster le portrait avec le zoom et le déplacement.
5. Exporter la carte en PNG.

Les champs démarrent volontairement vides à chaque lancement.
L'application fonctionne entièrement côté navigateur et ne nécessite aucun serveur.

## Numéro de série

Le numéro affiché en haut à droite est généré automatiquement à partir du champ `Code` :

`AT-E01-CP-XXXX-16`

- `AT` : autorité Atlas ;
- `E01` : galaxie Euclid, galaxie n° 1 ;
- `CP` : Captain / Pilot ;
- `XXXX` : fragment de 4 caractères extrait du code saisi ;
- `16` : référence à Atlas / 16.

Exemple : le code `AX-7F9K-21Q3` produit `AT-E01-CP-7F9K-16`. Tant que le champ Code est vide, le fragment reste `XXXX`.

## Export PNG

- 1600 × 1000
- 2400 × 1500
- 3200 × 2000

## Architecture

```text
atlas-id-card-app/
├── index.html
├── README.md
├── SIGNATURE.txt
├── css/
│   └── style.css
└── script/
    └── script.js
```

## Données

Les informations saisies et le portrait restent uniquement dans la session courante du navigateur. Aucune donnée n'est envoyée à un serveur par l'application.

## Signature d'auteur

Les fichiers contiennent les métadonnées d'auteur `Haizenchi`. `SIGNATURE.txt` contient également les empreintes SHA-256 des fichiers principaux afin de permettre un contrôle d'intégrité.
