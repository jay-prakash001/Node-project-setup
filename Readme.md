# backend project setup

This is a full setup for backend with js , node , express and mongoDB

## npm init
## git init
## add readme.md
## npm i
## touch .gitignore
## touch .env
## mkdir src
## cd src 
## touch app.js constants.js index.js
## in package.json -> "type" : "module"
## npm i -D nodemon
## scripts : => "dev" : "nodemon src/index.js"
## git add, commit , push => setup part 1
## cd src
## mkdir controllers db middlewares models routes utils 
## npm i -D prettier
## setup prettier -> .prettierrc, .prettierignore

## npm i mongoose dotenv express

## wrap the connection in try-catch and async-await as well to handle it properly
### note : ;(async ()=>{})()  :-> is ifis (immediately invoked function expression), the ; is not mandetory but used to resolve some issues if there is no ; in above statement( but it is good practice to use)
# MongoDB
## connect to mongodb atlas 
## build project 
## build cluster
## make network access
## make database access
## connect with connection string -> remove ending /
## we initialize dotenv as soon as possible at the very top 
## we can not use dotenv as import current so we need to 
### import dotenv from 'dotenv'
### dotenv.config(
###    {path:'./env'}
### ) and go to scripts in package.json "dev" : "nodemone -r dotenv/config --experimental-json-modules src/index.js"




