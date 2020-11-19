const { request } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 
const UserLogin = require('../models/Login');

router.post('/signup', (req, res, next) =>
{
    UserLogin.find({Email: req.body.Email}).exec().then(userlogin =>
    {
        if(userlogin.length >= 1)
        {
            return res.status(422).json({message: 'Email already exists!'});
        }
        else
        {
            bcrypt.hash(req.body.Password, 7, (err, hash) =>
            {
                if(err)
                {
                    return res.status(500).json({error: err});
                }
                else
                {
                    const userlogin = new UserLogin(
                    {
                        _id: new mongoose.Types.ObjectId(),
                        Email: req.body.Email,
                        Password: hash
                    });
                    userlogin.save().then(result =>
                    {
                        console.log(result);
                        res.status(201).json(
                            {
                                message: 'User created successfully!'
                            }
                        )
                    })
                    .catch(err => 
                    {
                        console.log(err);
                        res.status(500).json({error: err});
                    }); 
                }
            });  
        }
    });   
});

router.post('/login', (req, res, next) =>
{
    UserLogin.find({Email: req.body.Email}).exec().then(UserLogin =>
        {
            if(UserLogin < 1)
            {
                return res.status(401).json(
                    {
                        message: 'Authentication Failed!'
                    }
                );
            }
            bcrypt.compare(req.body.Password, UserLogin[0].Password, (err, result) =>
            {
                if(err)
                {
                    return res.status(401).json(
                        {
                            message: 'Authentication Failed!'
                        }
                    );
                }
                if(result)
                {
                    const token = jwt.sign({Email: UserLogin[0].Email}, process.env.JWT_KEY, {expiresIn: "1h"});
                    return res.status(200).json(
                        {
                            message: 'Authentication Successful!',
                            token: token
                        }
                    );
                }
                return res.status(401).json(
                    {
                        message: 'Authentication Failed!'
                    }
                );
            });
        })
        .catch(err => 
        {
            console.log(err);
            res.status(500).json({error: err});
        }); 
});

router.delete('/:userID', (req, res, next) =>
{
    UserLogin.remove({_id: req.params.userID}).exec().then(result => 
    {
        res.status(200).json({message: 'User deleted!'});
    })
    .catch(err => 
    {
        console.log(err);
        res.status(500).json({error: err});
    }); 
})

module.exports = router;