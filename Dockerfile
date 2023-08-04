FROM node:alpine
WORKDIR '/first-app'

COPY package.json .
RUN npm install
COPY . .
CMD ["npm","start"]