FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Build the NestJS app (adjust if using Nx workspace)
RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start:prod"]
