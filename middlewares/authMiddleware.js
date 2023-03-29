const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_KEY);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      // console.error(error);
      res.status(401);
      throw new Error("Not Authorized , Token failed");
    }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, not token");
  }
});

const issAdmin = async (req, res, next)=>{
  try{
    const user = await User.findById(req.user._id)
      if(user.isAdmin === false){
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        })
      }else{
        next()
      }

  } catch(error){
    console.log(error)
    // res.send({ error });
    res.status(401).send({
      success:false,
      error, 
      message:"Error in admin middleware"
    });
  }
}
module.exports = { protect, issAdmin  };