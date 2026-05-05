import studentModel from '../models/students.js';
import teacherModel from '../models/teachers.js';

const studentsController ={
    create: async(req,res)=>{
        try {
            const {code, name, lastname, age, course, note, code_teacher} = req.body;

            // 🔍 Validar si ya existe
            const existing = await studentModel.findOne({ code });

            if(existing){
                return res.status(400).json({message:"El codigo del estudiante ya existe ", existing})
            }

            // 🔍 Verificar si existen docentes
            const teacherCount = await teacherModel.countDocuments();

            if (teacherCount === 0) {
            return res.status(400).json({
                message: "No existen docentes registrados. Debe crear al menos uno."
            });
            }

            // Validar que el docente exista
            const teacher = await teacherModel.findOne({code: req.body.code_teacher});
            if (!teacher) {
                return res.status(404).json({ message: "No se encuentra el Docente" });
            }

            const newStudent = new studentModel({
                code,
                name,
                lastname,
                age,
                course,
                note,
                code_teacher,
            });

            if(newStudent.note === 10 || newStudent.note <= 59){
                newStudent.calificate = 'DB (Desempeño Bajo)';
                newStudent.definitive = false;
            }
            else{
                if(newStudent.note === 60 || newStudent.note <= 79){
                    newStudent.calificate = 'DBs (Desempeño Basico)';
                    newStudent.definitive = true;
                }
                    else{
                        if(newStudent.note === 80 || newStudent.note <= 89){
                        newStudent.calificate = 'DA (Desempeño Alto';
                        newStudent.definitive = true;
                    }
                        else{
                            if(newStudent.note === 90 || newStudent.note <= 100){
                            newStudent.calificate = 'DS (Desempeño Superior)';
                            newStudent.definitive = true;
                        }
                    }
                }
            }
            if(newStudent.note < 10 || newStudent.note > 100){
                newStudent.note = 'ERROR';
            }

            await newStudent.save();
            res.status(201).json({message: `El estudiante ha sido creado.`})
            
        } catch (error) {
            res.status(400).json({message:'Error al crear el estudiante, verificar de nuevo los datos ingresados.', error})
        }
    },
    
    readAll: async (req,res)=>{
        try{

            const allStudent = await studentModel.find();
            res.status(201).json({data: allStudent});

        }catch(error){
            res.status(500).json({error: 'Error al leer los datos de los estudiantes.'});
        }
    },

    read: async(req,res)=>{
        try{
            const {code} = req.params
            const studentFound = await studentModel.findOne({code});
            if (!studentFound) {
                res.status(404).json({message: 'Estudiante no encontrado'})
            } else {
                res.status(201).json({ data: studentFound });
            }

        }catch(error){
            res.status(500).json({error: 'Error al leer los datos del estudiante.'});
        }
    },

    update: async(req,res)=>{
        try{
            const {code} = req.params
            const {name, age, course, note} = req.body
            const studentUpdate = await studentModel.findOneAndUpdate({code},{
                name,
                age,
                course,
                note,
            });
            if (!studentUpdate) {
                res.status(404).json({message: 'Estudiante no encontrado'})
            } else {
                res.status(201).json({ data: studentUpdate, message: 'Estudiante actualizado' });
            }

        }catch(error){
            res.status(500).json({error: 'Error al actualizar los datos del estudiante.'});
        }
    },

    delete: async(req,res)=>{
        try{
            const {code} = req.params
            const studentDelete = await studentModel.findOneAndDelete({code});
            if (!studentDelete) {
                res.status(404).json({message: 'Estudiante no encontrado'})
            } else {
                res.status(201).json({ data: studentDelete, message: 'Estudiante eliminado' });
            }

        }catch(error){
            res.status(500).json({error: 'Error al eliminar los datos del estudiante.'});
        }
    },
}

export default studentsController;