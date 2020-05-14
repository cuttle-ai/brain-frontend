FROM node:10.9.0

# make the workdir
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# install dependencies first to allow faster rebuilds
COPY brain-frontend/package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.0.2
COPY brain-frontend /app

CMD ["ng", "serve", "--host", "0.0.0.0", "--proxy-config", "proxy.conf.docker.json"]