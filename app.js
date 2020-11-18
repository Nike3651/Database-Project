const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Required routes
const UserRoutes = require('./api/routes/Users');

mongoose.connect('mongodb+srv://Nike:' + process.env.MongoPW + '@cluster0.asdj8.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method == 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
        return res.status(200).json({});
    }
    next();
});

app.use('/Users', UserRoutes);

app.use((req, res, next) =>
{
    const error = new Error('Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => 
{
    res.status(error.status || 500);
    res.json(
        {
            error:
            {
                message: error.message
            }
        }
    )
});

module.exports = app;