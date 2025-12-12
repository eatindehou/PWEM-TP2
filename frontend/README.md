# TODO App - TP2 React
## Description
Application de gestion de tâches refondue en React avec routage multi-pages.
## Installation
### Prérequis
- Node.js 16+
- npm
### Étapes
1. Clonez le dépôt
3. Lancez le serveur API PHP :
`
cd api && php -S localhost:8000`
2. Installez les dépendances et lancez le serveur de développement :
`
cd frontend && npm install && npm run dev
`
## Utilisation
- Accédez à http://localhost:5173
- Utilisez l'application pour gérer vos tâches
## Déploiement
L'application est déployée sur Vercel à l'adresse :
**[https://pwem-tp-2-eu0srdtm7-elmas-projects-d691e389.vercel.app/]**
L'API distante est hébergée sur notre dossier équipe Timunix3:
**[https://timunix3.csfoy.ca/~sugarswirls]**
## Structure du projet
-
`api/`
: Backend PHP
- task.php

`frontend/`
: Frontend React
- `src/: Code source React`

`components/`
: Composants réutilisables
- TaskForm.jsx
- TaskItem.jsx
- TaskList.jsx
- TaskStats.jsx

`hooks/`
- useTasks.js

`routes/`
: Pages et configuration routeur
- `stats/`
   - index.jsx
- __root.jsx
- index.jsx
- App.jsx
- main.jsx
- routeTree.gen.ts
## Technologies utilisées
- React 18
- Vite
- Tanstack Router
- Chart.js + react-chartjs-2