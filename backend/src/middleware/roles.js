import jwt from "jsonwebtoken";

export function isAdmin(req, res, next) {

  try {

    // 👇 viene del verifyToken
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        msg: 'No autenticado'
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        msg: 'Acceso denegado: se requiere rol admin'
      });
    }

    next();

  } catch (error) {
    return res.status(500).json({
      msg: 'Error en autorización',
      error
    });
  }
}