const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const contactRoute = require('./routes/contact')
const dbConfig = require('./mongoConfig/mongoDB.json')
const mongoose = require('mongoose')

const app = express();
//middelw logger pour msg de log
app.use(logger('dev'));

//pour parser json
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/contact', contactRoute)

//pour gerer les erreurs
app.use((req, res, next)=> {
    next(createError(404))
})

mongoose.connect(dbConfig.mongo.uri)

module.exports = app;