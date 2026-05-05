import jwt from "jsonwebtoken";

// export const authMiddleware = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "No autorizado" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded;

//     next();

//   } catch (error) {
//     res.status(401).json({ message: "Token inválido" });
//   }
// };

export function verifyToken(req, res, next) {

  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ msg: 'No token' });
  }

  try {

    const decoded = jwt.verify(
      token.replace('Bearer ', ''),
      'SECRET_KEY'
    );

    req.user = decoded;

    next();

  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' });
  }
}