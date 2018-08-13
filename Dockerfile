FROM node:latest

MAINTAINER Steve Leon
COPY . /project
ENV CONFIG=docker
WORKDIR /project
RUN npm install
EXPOSE 9100
ENTRYPOINT ["npm", "start"]
