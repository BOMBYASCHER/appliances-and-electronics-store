FROM node:20-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN echo $VITE_APPLICATION_PROFILE
RUN echo $VITE_SERVER_URL
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
