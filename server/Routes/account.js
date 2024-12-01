const { Router } = require("express");
const userAuth = require("../auth/userAuth");
const { Account } = require("../dB/db");
const mongoose = require("mongoose");

const router = Router();

router.get("/balance",userAuth,async (req,res) => {
    const userId = req.userId;
    const { balance } = await Account.findOne({userId : userId});

    res.status(200).json({
        balance : balance
    })
})

router.post("/transfer",userAuth,async (req,res) => {
    const session = await mongoose.startSession();
    await session.startTransaction();

    const userId = req.userId;
    const { to, amount} = req.body;
    
    const account = await Account.findOne({userId : userId}).session(session);

    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(403).json({
            msg : "insufficient balance"
        })
    }

    const toAccount = await Account.findOne({userId : to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(403).json({
            msg : "Account not found."
        })
    }

    await Account.updateOne({userId : to},{$inc : { balance : amount*100}}).session(session);
    await Account.updateOne({userId : userId},{$inc : {balance : -amount*100}}).session(session);

    session.commitTransaction();
    res.status(200).json({
        msg : `Rs ${amount} transferred successfully.`
    })

})

router.use((req,res,next,err) => {
    res.status(500).json({
        msg : "internal server error."
    })
})

module.exports = router;

