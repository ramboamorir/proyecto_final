import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({

    name: {
        type: String,
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
        // select: false,
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }

},

{ versionKey: false, timeseries: true },
);

// userSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

export default model('User', userSchema);