FROM node:20-alpine

WORKDIR /app

# Copiar dependencias primero (mejor cache de Docker)
COPY package.json package-lock.json ./
RUN npm ci

# Copiar el resto del código
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
