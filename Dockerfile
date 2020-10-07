FROM node:12-alpine

RUN mkdir -p /app/node_modules && chown -R node:node /app

# set working dir for docker
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies, prod only
RUN npm install --only=prod

USER node

# copy application code into container
COPY --chown=node:node . .

CMD [ "node", "server.js" ]