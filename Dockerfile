FROM node:16
WORKDIR /usr/node-projects/social-handler
COPY ./package.json .
RUN npm i --only=prod
COPY ./dist ./dist
EXPOSE 8080
CMD npm start
 