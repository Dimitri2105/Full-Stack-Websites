const express = require('express');

const userController = require('../controller/userController')

const router = express.Router()


router.post('/add-user',userController.saveToStorage)

router.get('/get-users',userController.getAllUsers)

router.delete('/delete-users/:id',userController.deleteUser)


module.exports=router


// router.post('/insert-user', userControlls.addUser);
// router.get('/get-users', userControlls.getUsers);
// router.post('/delete-user', userControlls.deleteUser);



