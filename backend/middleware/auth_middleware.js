// const express = require("express");
const jwt = require("jsonwebtoken")

const auth_mid = (req,res,next) => {
    const auth_token = req.headers?.authorization;
    //add token matching logic later
    try{
        // replace secret key later
        const payload = jwt.verify(auth_token.split(" ")[1],process.env.JWT_SECRET);
        req.userId = payload.userId;
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(401).json({
        success: false,
        "message": "Unauthorized access. Check your Authorization Token."
    })
    }   
}

module.exports = auth_mid;