FROM node:8.11-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g grunt-cli
RUN grunt

# This is the final container that serves the static content.
FROM nginx:alpine
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
