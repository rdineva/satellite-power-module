# Satellite Power Module Dashboard Simulation

## Overview
Full stack application that simulates the workflow of a satellite power module. It has two payloads - an On-Board Computer (OBC) and a Camera. Each of them has a voltage and a current draw property. The fluctuating values of those are simulated by a function that evaluates every second on the server.

The Commanding Panel has functionality for connecting and disconnecting each payload. When a payload is disconnected, it stops drawing current.

The Notification Panel shows the current alerts, if there are any. There are three types:
- Low Voltage Alert - when voltage falls below 18V
- Full Charge Alert - activated at a voltage of 30V
- High Current Alert - when current draw exceeds 3A

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
*Front-end* - ReactJS, Redux, TypeScript

*Back-end* - NestJS, TypeScript, MongoDB
