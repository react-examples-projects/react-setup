@ECHO OFF

start cmd -new_console:s /k "npm start"

cd ./server 
npm start
