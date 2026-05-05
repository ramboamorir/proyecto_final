import { Schema, model } from 'mongoose';

const studentSchema = new Schema(
    {
        code:{
            type: Number,
            require: true,
            unique: true
        },

        name:{
            type: String,
            trim: true,
        },

        lastname:{
            type: String,
            trim: true,
        },

        age:{
            type: Number,
            require: true,
        },

        course:{
            type: String,
            trim: true,
        },

        note:{
            type: Number,
            require: true,
        },

        calificate:{
            type: String
        },

        definitive:{
            type: Boolean
        },

        code_teacher:{
            type: Number,
            require: true,
        },
    },
        {versionKey: false, timeseries: true},
);

export default model('Student' , studentSchema);