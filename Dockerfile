FROM node:21-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN ng build --prod

# Install openssh-client for scp command
RUN apk add --no-cache openssh-client

FROM nginx:latest

COPY --from=builder /app/dist/mux-ui /usr/share/nginx/html

EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"]