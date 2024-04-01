FROM node:21-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN ng build --prod

# Install openssh-client for scp command


FROM nginx:latest

COPY --from=builder /app/dist/front-end /usr/share/nginx/html

EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"]