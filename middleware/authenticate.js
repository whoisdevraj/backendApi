import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // if authHeader not found which means user without token is trying to access
  if (authHeader === null || authHeader === undefined) {
    return res.status(401).json({ status: 401, message: "UNAUTHORIZED" }); //error 401 means authorize
  }

  const token = authHeader.split(" ")[1];

  // verify the JWT Token

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(401).json({ status: 401, message: "UNAUTHORIZED" });
    req.user = user;
    next();
  });
};

export default authMiddleware;
