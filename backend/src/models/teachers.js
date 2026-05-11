import { Schema, model } from 'mongoose';

const teacherModel = new Schema({
    code: {
        type: Number,
        require: true,
        unique: true,
    },

    name: {
        type: String,
        trim: true,
        require: true,
    },

    lastname:{
        type: String,
        trim: true,
    },

    worksday:{
        type: String,
        trim: true,
        require: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"]
    },

    password: {
        type: String,
        require: true,
        minlength: 6,
        select: false,
    },
},
    { versionKey: false, timestamps: true },
);

export default model('Teacher', teacherModel);