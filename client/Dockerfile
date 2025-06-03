FROM node:20-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN printenv VITE_APPLICATION_PROFILE
RUN printenv VITE_SERVER_URL
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
