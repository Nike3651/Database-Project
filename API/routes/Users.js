const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-authentication');

const UsersController= require('../Controllers/Users');
 
const User = require('../models/User');

router.get('/', UsersController.Get_All_Users);

router.post('/', checkAuth, UsersController.Create_New_User);

router.get('/:UserID', UsersController.Get_User);

router.patch('/:UserID', checkAuth, UsersController.Patch_User);

router.delete('/:UserID', checkAuth, UsersController.Delete_User);

module.exports = router;