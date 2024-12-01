const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;
const { User } = require("./../dB/db");

async function userAuth(req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(403).json({
            msg : "token not found"
        })
    }

    try{
        const token  = authHeader.split(" ")[1];
        const decoded = jwt.verify(token,jwt_secret);

        const userWithToken = await User.findOne({_id : decoded.userId});
        if(!userWithToken){
            return res.status(411).json({
                msg  : "user not found"
            })
        }
        req.userId = decoded.userId;
    }catch(err){
        return res.status(411).json({
            msg : "error during user authentication"
        })
    }   
    next();
}

module.exports = userAuth;
