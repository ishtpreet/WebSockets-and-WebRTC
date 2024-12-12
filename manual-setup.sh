#!/bin/bash

# Ensuring we exit on any error
set -e

#Start Backend
cd ./backend && npm i && npm start &


#Start Frontend
cd ./frontend
touch .env & 
cat .env.example > .env
npm i && npm start