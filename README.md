# langton-s-ant

Installation

Télécharger les dépendances : 
  npm install

Pour l'adapter à son serveur il faut:
  Modifier l'adresse de connexion de sketch.js au début du fichier
  
  Optionnel
    Modifier les ports de server.js et partie.py
    
langton's Ant est une application python (ant.py game.py partie.py) à part du serveur et peut tourner en solitaire sans serveur.
server.js sert juste à faire le lien entre l'application et le client.

Il y a surement d'autre optimisation à faire mais ce sont celle-ci qui tourne le mieux sur mon serveur. 
Ce qui comptait pour moi soit que le tout ne soit pas très gourmand en CPU.

Néanmoins je suis preneur de toute optimisation possible.

Bug connu :
  Il y a un probleme avec sketch.js du à l'utilisation de p5
  Lors du setup les rect sont sont dessinés en 5x5
  Lors de "l'animation" les rects sont dessinés en 3x3 ou 4x4 ce qui laisse une bordure noire quand un rectangle blanc remplace un noir.
