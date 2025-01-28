# AI Chat Application

Une application de chat moderne avec une IA, construite avec React, TypeScript et Mantine UI.

## �� Fonctionnalités

- 💬 Chat en temps réel avec une IA
- 🎨 Interface utilisateur moderne et responsive
- 🌙 Support des thèmes clair/sombre
- ⚡ Performance optimisée
- 🔒 Gestion sécurisée des clés API
- 📱 Compatible mobile

## 🛠️ Technologies

- React 18
- TypeScript
- Mantine UI v7
- Vitest
- Testing Library
- Framer Motion
- OpenAI API

## 🏗️ Installation

```bash
# Cloner le projet
git clone https://github.com/ramas69/react-chatbot.git

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Ajouter votre clé API OpenAI dans .env
VITE_OPENAI_API_KEY=votre-clé-api

# Lancer le projet
npm run dev
```

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Voir la couverture des tests
npm run test:coverage
```

## 📁 Structure du Projet

```
src/
├── components/        # Composants React (Atomic Design)
│   ├── atoms/        # Composants de base
│   ├── molecules/    # Composants composés
│   ├── organisms/    # Composants complexes
│   ├── templates/    # Templates de pages
│   └── pages/        # Pages complètes
├── contexts/         # Contextes React
├── services/         # Services (API, etc.)
├── hooks/            # Hooks personnalisés
├── types/           # Types TypeScript
└── test/            # Configuration des tests
```

## 📝 License

MIT

## 👤 Auteur

Rama SOUMARE
