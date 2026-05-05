import teachersModel from '../models/teachers.js';
import studentsModel from '../models/students.js';
import bcrypt from "bcrypt";

const teachersController = {
    create: async (req, res) => {
        try {
            const { code, name, lastname, worksday, email, password } = req.body;

            // console.log(`code: ${code}, nombre: ${name}, apellido: ${lastname}, jornada: ${worksday}, Correo: ${email}, Contraseña: ${password}`);

            const existing = await teachersModel.findOne({ code });

            if (existing) {
                return res.status(400).json({ message: "El codigo docente ya existe. ", existing })
            }

            // 🔐 Encriptar password
            // teachersModel.pre("save", async function (next) {
            // if (!this.isModified("password")) return next();

            // this.password = await bcrypt.hash(this.password, 6);
            // next();
            // });

            // // 🔑 Comparar password
            // teachersModel.methods.comparePassword = function (password) {
            // return bcrypt.compare(password, this.password);
            // };

            // const existing_Students = await studentsModel.findOne({ code_student });

            // if (!existing_Students) {
            //     return res.status(400).json({ message: "Debe existir al menos un estudiante. " })
            // }

            const newTeacher = new teachersModel({
                code,
                name,
                lastname,
                worksday,
                email,
                password,
            });

            if (!newTeacher.code) {
                res.status(401).json({ message: "El docente debe tener un codigo valido.", code })
            }
            if (!newTeacher.name) {
                res.status(401).json({ message: "El docente debe tener un nombre valido.", data: newTeacher.name })
            }
            if (!newTeacher.email) {
                res.status(401).json({ message: "El docente debe tener un email valido.", data: newTeacher.email })
            }
            if (!newTeacher.password) {
                res.status(401).json({ message: "El docente debe tener un password valido.", data: newTeacher.password })
            }
            await newTeacher.save();
            res.status(201).json({ message: "El docente ha sido creado. ", data: newTeacher })
        } catch (error) {
            res.status(500).json({ message: "Error al crear un docente. ", error })
        }
    },

    readAll: async (req, res) => {
        try {

            const allTeachers = await teachersModel.find();
            res.status(201).json({ data: allTeachers });

        } catch (error) {
            res.status(500).json({ error: 'Error al leer los datos de los docentes.' });
        }
    },

    read: async (req, res) => {
        try {
            const { code } = req.params
            const teacherFound = await teachersModel.findOne({ code });
            if (!teacherFound) {
                res.status(404).json({ message: 'Docente no encontrado' })
            } else {
                res.status(201).json({ data: teacherFound });
            }

        } catch (error) {
            res.status(500).json({ error: 'Error al leer los datos del docente.' });
        }
    },

    update: async (req, res) => {
        try {
            const { code } = req.params
            const { name, lastname, worksday } = req.body
            const teacherUpdate = await teachersModel.findOneAndUpdate({ code }, {
                name,
                lastname,
                worksday,
            });
            if (!teacherUpdate) {
                res.status(404).json({ message: 'Docente no encontrado' })
            } else {
                res.status(201).json({ data: teacherUpdate, message: 'Docente actualizado' });
            }

        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar los datos del docente.' });
        }
    },

    delete: async (req, res) => {
        try {
            const { code } = req.params
            const teacherDelete = await teachersModel.findOneAndDelete({ code });
            if (!teacherDelete) {
                res.status(404).json({ message: 'Docente no encontrado' })
            } else {
                res.status(201).json({ data: teacherDelete, message: 'Docente eliminado' });
            }

        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar los datos del docente.' });
        }
    },
};

export default teachersController;