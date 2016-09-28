# nodeJS official image
# built on debian 8 "jessie" (current stable release)
# see https://hub.docker.com/_/node/
# see also https://github.com/nodejs/docker-node/blob/master/6.4/Dockerfile
FROM node:6.7

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

# Add forever
# see https://github.com/foreverjs/forever
RUN npm install -g forever

# Delete cache (memba-blog and kidoju-blog)
# Do not comment as blog Dockerfile is copied from here
# and the if condition takes care of the specificity
RUN if [ -d /usr/src/webapp/cache ]; then rm -f /usr/src/webapp/cache/*; fi

# Expose nodeJS port
EXPOSE 3000

# Start node application
CMD [ "npm", "start" ]
