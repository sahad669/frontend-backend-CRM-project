import jwt from 'jsonwebtoken';

export const isLogged = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "You are not logged in" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = verified; // verified will now have _id
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token is not valid" });
  }
};
