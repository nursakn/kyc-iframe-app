FROM node:18 AS builder

ARG API_URL

WORKDIR /app
COPY ./ /app/

RUN npm i

RUN echo "VITE_APP_API_URL=$API_URL" > .env

RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

