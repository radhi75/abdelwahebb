const router=require('express').Router();
const PosteController=require('../controller/CreateUser');

router.post('/api/Create/newuser',PosteController.CreateStudent);
router.post('/api/login/user',PosteController.VerifyUser)
module.exports={UserRouter:router}