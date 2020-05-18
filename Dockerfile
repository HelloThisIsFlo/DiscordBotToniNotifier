FROM node:14-slim

# Prepare app dir
RUN mkdir /app
WORKDIR /app

# Install deps
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

# Copy src
COPY ./bot.js .
COPY ./secrets.json .

# Run app
CMD [ "npm", "start" ]