const jwt_decode = require("jwt-decode");
const User = require("../models/userModel");

async function verify(req, res, next) {
  try {

    const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).send("you have to login first");
  }

  const tokenJwt = authorization.replace("Bearer ", "");

    //const tokenJwt = req.headers.authorization.split(" ")[1];

    //console.log(req.headers.authorization)

    const googleJwt = jwt_decode(tokenJwt)?.sub;

    const userdata = await User.find({ googleSub: googleJwt });

    if (userdata) {
      req.user = userdata;
    }
    next();
  } catch (err) {
    res.json({
      sucess:false,
      data:"user Not Aouthorized"
    });
  }
}

module.exports = verify;
