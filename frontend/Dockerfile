#start with a base image
#using light weight node.js image
FROM node:18-alpine AS build

#set the working directory
WORKDIR /app

#copy package json file
COPY package*.json ./

#install dependencies
RUN npm install

#copy the rest of the application code
COPY . .

#build the react app for production
# RUN npm run build

#run the react app
CMD ["npm", "run", "dev"]