const jwt = require("jsonwebtoken");
require('dotenv').config();

const fetchuser = (req,res,next) => {
    const token=req.cookies.authToken;
    if(!token)
    {
        if(req.url==='genOTP')
            return res.status(401).json({error:"Please try again after register !"});
        else
            return res.status(401).json({error:"Please try again after login !"});
    }
    try{
        const data=jwt.verify(token,process.env.JWT_SECRET);
        req.userId=data.userId;
        if(req.url === 'matchOTP') req.pageType = data.type;
        next();
    }
    catch(error){
        res.status(500).json({ error: "Internal server error !" });
    }
};
module.exports = fetchuser;