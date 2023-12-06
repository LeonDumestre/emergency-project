# Utilisez l'image Node.js 20 comme image de base
FROM node:20

# Créez le répertoire de travail
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers de l'application
COPY . .

# Construisez l'application Nuxt.js
RUN npm run build

# Démarrez l'application Nuxt.js
CMD ["npm", "run", "serve"]