const express =require('express');

const {registerUser, loginUser, getUser}= require('../controllers/authController');
const authMiddleware=require('../middlewares/authMiddleware');


const router =express.Router();

router.post ('/register', registerUser);
router.post ('/login', loginUser);
router.post ('/user',authMiddleware, getUser);

module.exports=router;