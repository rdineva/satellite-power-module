# Satellite Power Module Dashboard Simulation

![Screen Recording 2025-01-24 at 21 24 07](https://github.com/user-attachments/assets/c4615f12-d4f3-4385-962f-f77a5c9e16e3)


## Overview
The application simulates the workflow of a satellite power module. It has two payloads - an *On-Board Computer (OBC)* and a *Camera*. Each of them has a *voltage* and a *current draw* property. The fluctuating values of those are simulated by a function that evaluates every second on the server.

The **Display Panel** shows the current state of the battery voltage and the current draw of each payload.

The **Commanding Panel** has functionality for connecting and disconnecting each payload. When a payload is disconnected, it stops drawing current.

The **Notification Panel** shows the current alerts, if there are any. There are three types:
- _Low Voltage Alert_ - when voltage falls below 18V
- _Full Charge Alert_ - activated at a voltage of 30V
- _High Current Alert_ - when current draw exceeds 3A

## Tech Stack

**Front-end** - ReactJS, Redux, TypeScript

**Back-end** - NestJS, TypeScript, MongoDB

## Setup

### Install dependencies
```shell
$ cd ./client && npm install
$ cd ./server && npm install
``` 

## Running the application

### Database
You need to have **MongoDB** installed. A client like *MongoDB Compass* is needed for setting up the database.

The URI Connection string should be `mongodb://localhost/satellite-power-module`.

Connect to the database and after running the server, the tables will be automatically created.

### Server
```shell
$ cd ./server
$ npm run start
```

### Client
```shell
$ cd ./client
$ npm run start
```

### Unit tests
```shell
$ cd ./server
$ npm run test
```
