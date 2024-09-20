FROM node:18-alpine AS dist
# Add a work directory
WORKDIR /front
COPY package.json .
COPY package-lock.json .
RUN npm install
ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
# Copy app files
COPY . .
RUN npm run build

# Prepare nginx
FROM nginx:1.16.0-alpine
COPY --from=dist /front/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY config/nginx/nginx.conf /etc/nginx/conf.d

# Fire up nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]