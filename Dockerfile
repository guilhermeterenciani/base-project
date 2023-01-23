FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN apt update && apt install -y

