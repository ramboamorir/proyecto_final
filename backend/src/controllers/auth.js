import userModel from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
};

// 📝 REGISTER
// export const register = async (req, res) => {
//   try {
//     const { name, email, password,role } = req.body;

//     // Validar si existe
//     const exists = await userModel.findOne({ email });
//     if (exists) {
//       return res.status(400).json({
//         message: "El usuario ya existe"
//       });
//     }

//     const user = new User(req.body);
//     await user.save();

//     const token = generateToken(user);

//     res.status(201).json({
//       message: "Usuario creado",
//       token
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const register = async (req, res) => {
  console.log("🚀 REGISTER ENTRÓ");
  console.log(req.body);
  try {

    const { name, email, password, role } = req.body;

    console.log("ROLE:", req.body.role);

    if (!password) {
      return res.status(400).json({
        message: "Password requerido"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashedPassword, // 🔥 ESTE ES EL CLAVE
      role
    });

    await user.save();

    res.json({
      message: "Usuario creado"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔑 LOGIN
export const login = async (req, res) => {
  try {

    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        message: "Email y password requeridos"
      });
    }

    const user = await userModel.findOne({ email }).select('+password');

    // console.log("USER FROM DB:", user);

    if (!user) {
      return res.status(400).json({
        message: "Credenciales inválidas"
      });
    }

    if (!user.password) {
      return res.status(500).json({
        message: `El usuario no tiene contraseña registrada , ${user.password}`
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Credenciales inválidas"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      'SECRET_KEY',
      { expiresIn: '2h' }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });


  } catch (error) {
    console.error("ERROR LOGIN:", error);
    res.status(500).json({ message: error.message });
  }

};