# Build stage
FROM --platform=linux/arm64 node:22.1.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration=production

# Serve stage
FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/front-end/browser /usr/share/nginx/html

EXPOSE 80