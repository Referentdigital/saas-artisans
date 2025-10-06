# Étape 1 : Build du frontend React
FROM node:18 AS build-frontend

WORKDIR /app/frontend

COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install

# tout le front, y compris src et public
COPY ./frontend ./
RUN npm run build

# Étape 2 : Backend Node/Express
FROM node:18

WORKDIR /app

COPY ./backend ./backend

# Copie le build React dans backend/public pour qu'Express serve le front
COPY --from=build-frontend /app/frontend/build ./backend/public

WORKDIR /app/backend
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install

EXPOSE 5000

CMD ["npm", "start"]