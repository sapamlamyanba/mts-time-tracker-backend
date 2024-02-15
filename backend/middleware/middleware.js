const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw new Error("Authorization header missing");
    }

    const token = authHeader.split(" ")[1];
    // console.log("Received token:", token);

    const decoded = await JWT.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token payload:", decoded);

    req.body.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).send({
      message: error.message || "Authentication Failed",
      success: false,
    });
  }
};
