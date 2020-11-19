const User = require('../models/User');
const mongoose = require('mongoose');

exports.Get_All_Users = (req, res, next) => 
{
    User.find().select('_id Name Email Password ID_Num ').exec().then(docs => 
        {
            const response =
            {
                count: docs.length,
                users: docs.map(doc =>
                    {
                        return{
                            _id: doc._id,
                            Name: doc.Name,
                            Email: doc.Email,
                            Password: doc.Password,
                            ID_Num: doc.ID_Num,
                            request:{
                                type: 'GET',
                                url: 'http://Localhost:3000/Users/' + doc._id
                            }
                        }
                    })
            };
            //if(docs.length >= 0)
            //{
                res.status(200).json(response);
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
}
exports.Create_New_User = (req, res, next) => 
{
    const user = new User(
        {
            _id: new mongoose.Types.ObjectId(),
            Name: req.body.Name,
            Email: req.body.Email,
            Password: req.body.Password,       
            ID_Num: req.body.ID_Num
        }
    );
    user.save().then(result =>
        {
            console.log(result);
            res.status(201).json(
                {
                    message: 'Added user successfully!',
                    createdUser:{
                        _id: result._id,
                        Name: result.Name,
                        Email: result.Email,
                        Password: result.Password,
                        ID_Num: result.ID_Num,
                        request:{
                            type: 'GET',
                            url: 'http://Localhost:3000/Users/' + result._id
                        }
                    }
                }
            );
        }
    ).catch(err => 
        {
            console.log(err);
            res.status(500).json({error: err});
        });   
}
exports.Get_User = (req, res, next) => 
{
    const ID = req.params.UserID;
    User.findById(ID).select('_id Name Email Password ID_Num').exec().then(doc => 
        {
            console.log("From database", doc);
            if(doc)
            {
                res.status(200).json({
                    user: doc,
                    request:{
                        type: 'GET',
                        url: 'http://Localhost:3000/Users'
                    }
                });
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
}
exports.Patch_User = (req, res, next) => 
{
    const ID = req.params.UserID;
    const UpdateOps = {};
    for (const Ops of req.body)
    {
        UpdateOps[Ops.propName] = Ops.value;
    }
    User.update({_id: ID}, {$set: UpdateOps}).exec().then(result => 
        {  
            res.status(200).json(
                {
                    message: 'Successfully changed User data!',
                    request:{
                        type: 'GET',
                        url: 'http://Localhost:3000/Users/' + ID
                    }
                }
            )
        }
    ).catch( err =>
        {
            console.log(err);
            res.status(500).json({error: err});
        });
}
exports.Delete_User = (req, res, next) => 
{
    const ID = req.params.UserID;
    User.remove({_id: ID}).exec().then(result =>
        {
            res.status(200).json({
                message: 'User deleted!',
                request:{
                    type: 'GET',
                    url: 'http://Localhost:3000/Users'
                }
            });
        }
    ).catch(err =>
        {
            console.log(err);
            res.status(500).json({error: err});
        });
}