# Satellite Power Module Dashboard

![Screenshot 2024-01-19 at 22 20 51](https://github.com/rdineva/satellite-power-module/assets/32228357/eec4a6e0-dde2-4838-a1c2-8049fe8c413e)

## Setup

### Install dependencies
Run `npm install` in both `./client` and `./server`

## Running the application

### Start Database
You need to have **MongoDB** installed. A client like *MongoDB Compass* is needed for setting up the database. 

The URI Connection string should be `mongodb://localhost/satellite-power-module`.

Connect to the database and after running the server, the tables will be automatically created.

### Start server
Run `npm run start` in `./server`

### Start client
Run `npm run start` in `./client`

### Unit tests
Run `npm run test` in `./server`

## Tech Stack
Front-end - ReactJS, Redux, TypeScript

Back-end - NestJS, TypeScript, MongoDB
