FROM node:19-alpine3.16

WORKDIR /frontend
COPY package.json .

RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm install react-scripts
RUN npm install -g npm lerna cross-env rimraf --loglevel notice

COPY . ./

CMD ["npm", "start"]
