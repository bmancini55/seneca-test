FROM node:4.2.6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ONBUILD COPY . /usr/src/app
ONBUILD RUN rm -r /usr/src/app/node_modules
ONBUILD RUN npm install

CMD [ "npm", "start" ]
