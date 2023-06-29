require("dotenv").config();
const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJwt = async (req, res = response, next) => {
  try {
    console.log("-----------------------------------------------------------------");
    console.log(req.headers);
    const jwtValidate = jwt.verify(req.headers.jwt, process.env.PRIVATE_KEY);
    if (jwtValidate) {
      console.log("JWT Valido")
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized - Bad Token",
        
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized - Error",
      error: err,
    });
  }
};

module.exports = validateJwt;
