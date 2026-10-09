# Tundra Delta Aurora — démarrage local

## Prérequis
- Node.js 22 LTS recommandé
- npm fourni avec Node.js
- Windows 10/11, macOS ou Linux

## Installation sous Windows
1. Décompressez l’archive ZIP dans un dossier simple, par exemple `C:\\Projets\\tundra-delta-aurora-gem`.
2. Ouvrez ce dossier dans PowerShell ou le terminal intégré de VS Code.
3. Installez les dépendances :

```powershell
npm install
```

4. Lancez le serveur de développement :

```powershell
npm run dev
```

5. Ouvrez l’adresse affichée dans le terminal. Le projet configure normalement le port 8080 : `http://localhost:8080`.

## Vérifications
```powershell
npm test
npm run typecheck
npm run build
```

Si une commande échoue, copiez l’intégralité du message d’erreur. Le build exécute aussi les migrations locales configurées dans le projet.

## Notes
- Le dossier `node_modules` n’est pas inclus dans les archives : `npm install` le crée.
- Ne copiez pas de clés API ou de fichiers `.env` contenant des secrets dans une archive partagée.
- Les paiements de cette branche sont simulés ; aucun prestataire de paiement réel n’est connecté.
- Les données de démonstration et les actualités du prototype peuvent rester dans le stockage local du navigateur.
- L’administration n’est pas sécurisée pour une mise en production.
