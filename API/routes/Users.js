const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User');

router.get('/', (req, res, next) => 
{
    User.find().exec().then(docs => 
        {
            console.log(docs);
            //if(docs.length >= 0)
            //{
                res.status(200).json(docs);
            //}
            //else
            //{
            //    res.status(404).json({message: 'No entries are available!'});
            //}
        }
    ).catch( err => 
        {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.post('/', (req, res, next) => 
{
    const user = new User(
        {
            _id: mongoose.Types.ObjectId(),
            Name: req.body.Name,
            Email: req.body.Email,
            Password: req.body.Password,       
            ID_Num: req.body.ID_Num
        }
    );
    user.save().then(result =>
        {
            console.log(result);
            res.status(200).json(
                {
                    message: 'Handling POST request',
                    createdUser: result
                }
            );
        }
    ).catch(err => 
        {
            console.log(err);
            res.status(500).json({error: err});
        });   
});

router.get('/:UserID',(req, res, next) => 
{
    const ID = req.params.UserID;
    User.findById(ID).exec().then(doc => 
        {
            console.log("From database", doc);
            if(doc)
            {
                res.status(200).json(doc);
            }
            else
            {
                res.status(404).json({message: 'No entry found!'});
            }
            
        })
    .catch(err => 
        {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:UserID',(req, res, next) => 
{
    const ID = req.params.UserID;
    const UpdateOps = {};
    for (const Ops of req.body)
    {
        UpdateOps[Ops.propName] = Ops.value;
    }
    User.update({_id: ID}, {$set: UpdateOps}).exec().then(result => 
        {
            console.log(result);
            res.status(200).json(result)
        }
    ).catch( err =>
        {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.delete('/:UserID',(req, res, next) => 
{
    const ID = req.params.UserID;
    User.remove({_id: ID}).exec().then(result =>
        {
            res.status(200).json(result);
        }
    ).catch(err =>
        {
            console.log(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;