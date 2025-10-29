const express = require('express');
const models = require('./models');
const {body, validationResult} = require('express-validator');
const { where } = require('sequelize');
const bcrypt = require('bcryptjs');
const {Op} = require('sequelize');
const app = express();


///JSON Paser
app.use(express.json())

const registerValidator = [
    body('username', 'username cannot be empty! ').not().isEmpty(),
     body('password', 'password cannot be empty!').not().isEmpty(),
]

///registration route
app.post('/register',registerValidator, async (req, res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const msg = errors.array().map(errors => errors.msg).join('')
        return res.status(422).json({success:false, message: msg})
    }


    try {
    const {username, password} = req.body

    //create var to see if the user exist and validate capitalization
    const existingUser = await models.User.findOne({
        where:{

            //auto cap and upper cap insensitive
            username: {[Op.iLike]: username}
        }
    })

    //check if the user exist
    if(existingUser){
        return res.json({message: 'Username taken!', success: false})
    }

    ///creeate password hash
    const salt = await bcrypt.genSalt(10); // random string that pass to password > = secure
    const hash = await bcrypt.hash(password,salt);
    ///if not
    


    //create a new user
    const _ = models.User.create({
        username: username,
        password: hash ///change for hash
    })
    //if fault 


    res.status(201).json({success: true})
    }catch(error){
        res.status(500).json({message: 'Internal server error', success: false})
    }
    

})


//start server
app.listen(8080, () => {
    console.log("Server is running");
})