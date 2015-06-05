# nodeJS official image
# built on debian 8 "jessie" (current stable release)
# see https://registry.hub.docker.com/_/node/
# see also https://github.com/joyent/docker-node/blob/master/0.12/Dockerfile
FROM node:0.12

# Maintained by Jacques L. Chereau
MAINTAINER jlchereau

# Set environment to production (and avoid installing devDependencies)
ENV NODE_ENV production

# Install prerequisites (especially to build mongoose)
# RUN apt-get update && apt-get install -y build-essential python

# Copy our application and install nodeJS modules
RUN mkdir -p /usr/src/
COPY . /usr/src/
WORKDIR /usr/src/
RUN npm install

# Delete cache
RUN rm -f /usr/src/webapp/cache/*

# Expose nodeJS port
EXPOSE 3000

# Start node application
# CMD [ "node", "webapp/server.js" ]
CMD [ "npm", "start" ]
