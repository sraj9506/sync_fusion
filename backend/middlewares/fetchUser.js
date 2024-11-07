const jwt = require("jsonwebtoken");
require('dotenv').config();

const fetchuser = (req,res,next) => {
    const token=req.header('auth-token');
    if(!token)
    {
        return res.status(401).json({error:"Please try again after login !"});
    }
    try{
        const data=jwt.verify(token,process.env.JWT_SECRET);
        req.userId=data.userId;
        next();
    }
    catch(error){
        res.status(500).json({ error: "Internal server error !" });
    }
};
module.exports = fetchuser;