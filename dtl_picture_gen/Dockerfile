FROM node:18 as build

RUN mkdir -p /dtl-pic-gen/node_modules 

WORKDIR /dtl-pic-gen

COPY package.json package-lock.json ./

COPY . .

RUN npm install

RUN npm run build

FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build /dtl-pic-gen/dist /var/www/html/
CMD ["nginx","-g","daemon off;"]
