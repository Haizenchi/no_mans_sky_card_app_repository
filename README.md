# NMS Passport — Atlas Identity Toolkit v2.1

Application web statique créée par **Haizenchi** pour générer et partager des fiches communautaires inspirées de No Man's Sky.

## Modules

- **Identité** : voyageur, race, fonction, code, Discord, galaxie, portrait, adresse portail et numéro de série dynamique.
- **Vaisseau** : nom, type, classe, statistiques, système, galaxie, capture et glyphes.
- **Base** : nom, type, planète, système, description, capture et adresse portail.
- **Découverte** : catégorie, planète, biome, météo, sentinelles, ressources, capture et glyphes.

## Fonctions

- 5 thèmes : Atlas, Korvax, Vy'keen, Gek et Autophage.
- Sélecteur de 12 glyphes avec représentation hexadécimale 0–F.
- QR code réel : lien partageable sur HTTPS/localhost, données compactes uniquement en ouverture locale `file://`.
- Profils multiples enregistrés localement dans IndexedDB.
- Import / export JSON complet, images incluses.
- Export PNG en carte 16:10, carré 1:1 et bannière 16:9.
- Portraits/captures repositionnables par glisser-déposer et zoom à la molette.
- PWA installable et cache hors-ligne après la première visite.
- Aucun backend requis : le traitement des données et images reste côté navigateur.

## Numéro de série d'identité

Le format est : `AT-E01-CP-7F9K-16`.

- `AT` : autorité Atlas.
- `E01` : numéro de galaxie (`E01` = Euclid).
- `CP` : code de fonction (`CP` = Capitaine, `PL` = Pilote, `EX` = Explorateur, etc.).
- `7F9K` : fragment extrait du code voyageur.
- `16` : référence Atlas / 16.

Tant que les champs correspondants sont vides, leurs segments utilisent des valeurs neutres (`E00`, `XX`, `XXXX`).

## Sécurité et confidentialité

- Politique CSP stricte sur Vercel : scripts, styles, workers et connexions limités à l’origine de l’application ; objets, frames et scripts inline interdits.
- Trusted Types imposé sur les navigateurs compatibles afin de réduire la surface XSS.
- Protection anti-iframe (`frame-ancestors 'none'` + `X-Frame-Options: DENY`).
- `Permissions-Policy` désactive les capacités navigateur inutiles : caméra, micro, géolocalisation, capteurs, paiement, USB, Bluetooth, etc.
- Les imports JSON sont limités en taille, contrôlés par schéma et nettoyés champ par champ ; les clés inattendues sont ignorées.
- Les images importées sont limitées en taille, type et dimensions avant réutilisation.
- Les liens partagés sont limités et validés avant chargement. Ils sont encodés en Base64URL, **pas chiffrés** : toute personne possédant le lien ou le QR peut lire les données qu’il contient.
- En ouverture directe via `file://`, le QR reste disponible mais encode uniquement une charge compacte préfixée `NMSP2:` : aucun chemin local du PC n’est incorporé. Le bouton de partage devient alors « Copier les données ».
- Sur HTTPS (Vercel) ou `localhost`, le QR encode l’URL publique de la page avec la fiche dans le fragment `#p=…`. Les paramètres de requête éventuels de l’URL courante ne sont pas repris dans le QR.
- Le générateur de code voyageur utilise `crypto.getRandomValues()` au lieu de `Math.random()`.
- Les profils restent dans IndexedDB sur l’origine du site. Ce stockage local n’est pas chiffré et ne doit pas contenir de données sensibles.
- Le service worker ne met en cache que la coque de l’application et les ressources explicitement connues.

`SIGNATURE.txt` contient des empreintes SHA-256 pour le contrôle d’intégrité. Ce manifeste ne remplace pas une signature cryptographique d’auteur. Pour obtenir le badge GitHub **Verified**, les commits/tags de release doivent être signés avec une clé GPG/SSH ou un mécanisme de signature pris en charge par GitHub appartenant réellement à Haizenchi.

## Déploiement

Le projet ne nécessite aucune commande de build. Sur Vercel, importer le dépôt GitHub et conserver la racine du repo comme Root Directory.

## Architecture

```text
index.html
manifest.webmanifest
sw.js
README.md
SIGNATURE.txt
VENDOR-NOTICE.txt
css/
  style.css
script/
  script.js
  vendor/
    qrcode-browser.js
assets/
  icons/
    atlas-emblem.svg
    icon-192.png
    icon-512.png
```

## Données partagées

Les liens et QR codes n'incluent pas les images afin de garder une charge raisonnable. En `file://`, le QR contient une chaîne `NMSP2:<données>` et jamais le chemin du fichier local. Les fichiers JSON exportés, eux, peuvent contenir les images compressées.

Projet communautaire indépendant. No Man's Sky et ses éléments associés appartiennent à leurs ayants droit respectifs.
