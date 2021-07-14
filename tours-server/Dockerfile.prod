FROM node:alpine

WORKDIR '/app'

COPY ./package.json ./
RUN ls -a
RUN npm install
COPY ./ ./
RUN ls -a
RUN npm run build



FROM node:alpine

WORKDIR '/app'
COPY ./package.json ./
RUN ls -a
RUN npm install --only=production
COPY ./ ./
RUN ls -a

EXPOSE 1337
CMD ["npm", "run", "start"]



