// const express = require("express");
const jwt = require("jsonwebtoken")

const auth_mid = (req,res,next) => {
    const auth_token = req.headers?.["Authorization"];
    //add token matching logic later
    if(auth_token){
        // replace secret key later
        const payload = jwt.verify(auth_token.split()[1],secret_key);
        req.userId = payload.userId;
        next();
    }
    res.status(401).json({
        success: false,
        "message": "Unauthorized access. Check your Authorization Token."
    }
)

}   

module.exports(auth_mid);