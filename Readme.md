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
## use extension for the file imports if error occurs and recheck the connection string

# Middleware -> coockieparser cors -> used to handle cross continent request i guess
## npm i cookie-parser cors

## we use middleware with app.use(middleware())
## CORS_ORIGIN = * => FOR REQUEST FROM ANY WHERE

# middlewares -> extra validation before response if the requester is eligible to accept the response or not i.e if the user is logged in or not? or check if user is admin or not?

# jane se phle mujhse milke jana

# we can use multiple middlewares 
## (err, req, res, next)
### next is flag that specifies the it's work is done and turn of the next method

# models

## good naming conventions for models -> name.models.js

# we can store files in mongodb itselft but it is not so good practice

##  index:true //optimized searching

##     type :String,//cloudinary url ->cloud storage for files

# Aggregation for mongodb  -> 
# $ npm i mongoose-aggregate-paginate-v2

# bcrypt and bcryptjs ->
## it helps to hash password

# JWT (json web token) ->
## 


# Pre (hook) -> does something just before saving or doing something

# file upload handling
## cloudinary -> online cloud to store files 
## express file upload // multer file upload
## we should use two step method to upload file 
## upload file on our local server for temparory using multer then upload it to cloudinary then remover from local server
# install multer and cloudinary
# make a middleware for multer for file upload

## we are using disk storage in multer



