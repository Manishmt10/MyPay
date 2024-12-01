const { Router  } = require("express");
const jwt = require("jsonwebtoken");
const userAuth = require("./../auth/userAuth");
const { User, Account } = require("./../dB/db");
const { signinSchema, signupSchema, updateSchema } = require("./../Schemas/userSchema");
const jwt_secret = process.env.JWT_SECRET;

const router = Router();

router.post("/signup",async (req,res) => {
    const input = req.body;
    const response = signupSchema.safeParse(input);
    
    if(!response.success){
        return res.status(403).json({
            msg : "invalid input"
        })
    }
    

    try{
      const userCheck = await User.findOne({username : input.username});
        
        if(userCheck){
            return res.status(403).json({
                msg : "username already taken"
            })
        }

        const newUser = new User({
            username : input.username,
            firstName : input.firstName,
            lastName : input.lastName
        })

        const password_hash = await newUser.createHash(input.password);
        newUser.password = password_hash;

        await newUser.save();
        const amountInRs = 1 + Math.random()*1000;
        const amountInPaise = Math.floor(amountInRs * 100);

        await Account.create({
            userId : newUser._id,
            balance : amountInPaise
        })

        const token = jwt.sign({userId : newUser._id},jwt_secret);

        res.status(200).json({
            msg : "user created successfully.",
            token : token,
            redirectUrl : "/dashboard"
      })
        
    }catch(err){
        return res.status(411).json({
            msg : "Error ccured during creating user"
        })
    }
})

router.post("/signin",async (req,res) => {
    const input = req.body;
    const response = signinSchema.safeParse(input);

    if(!response.success){
        return res.status(403).json({
            msg : "input invalid"
        })
    }

    try {
        // checking if the user exists or not
       
        const user = await User.findOne({username : input.username});
        if(!user){
            return res.status(411).json({
                msg : "User not found."
            })
        } 
       
        // verifying the password
        const passwordCheck = await user.validatePassword(input.password);

        if(!passwordCheck){
            return res.status(403).json({
                msg : "incorrect password"
            })
        }
      
        const token = jwt.sign({userId : user._id},jwt_secret);
        res.status(200).json({
         msg : "successfully logged in",
         token : token,
         redirectUrl : "/dashboard"
        })
        
    }catch(err){
        return res.status(411).json({
            msg : "Error occurred." + err
        })
    }
})

router.put("/",userAuth,async (req,res) => {
    const input = req.body;
    const response = updateSchema.safeParse(input);

    if(!response.success){
        return res.status(403).json({
            msg : "invalid input"
        })
    }

    try{
        await User.updateOne(input,{
            _id : req.userId
        });
        return res.status(200).json({
            msg : "user updated successfully."
        })        
    }catch(err){
        return res.status(417).json({
            msg : "error occurred during updation."
        })
    }
})

router.get("/",userAuth,async (req,res) => {
   const id = req.userId;

   try {
      const user = await User.findOne({_id : id});
      res.status(200).json({
         name : user.firstName
      })
   }catch(err) {
      res.status(500).json({
         msg : "Sorry something went wrong."
      })
   }
})

router.get("/bulk",userAuth,async (req,res) => {
   let filter = req.query.filter;
   const userId = req.userId;

   if(!filter){
       filter = ""; 
    }
    
    const users = await User.find({
        $or : [{
            firstName : {
               "$regex" : filter,
               "$options" : "i"
         }
        },{
            lastName : {
               "$regex" : filter,
               "$options" : "i"
            }
        }],
      $and : [{
         _id : {
            $ne : userId
         }
      }]
   })

    res.status(200).json({
        users : users.map(user => ({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            userId : user._id
        }))
    })
})

module.exports = router;
