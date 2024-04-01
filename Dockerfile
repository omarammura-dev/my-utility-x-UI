FROM node:21-alpine
WORKDIR /app/f
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build --prod
FROM nginx:latest
COPY --from=builder /app/dist/your-angular-app-name /var/www/html
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]