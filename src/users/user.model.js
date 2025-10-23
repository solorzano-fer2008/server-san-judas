import { Schema, model } from "mongoose";

const userSchema = new Schema ({
    name: {
        type: String,
        required:[true, 'El nombre es obligatorio'],
        mazLengh: [25, "El nombre no puede tener más de 25 caracteres"],
        trim: true
    },
    surname: {
        type: String,
        required:[true, 'El apellido es obligatorio'],
        mazLengh: [25, "El apellido no puede tener más de 25 caracteres"],
        trim: true
    },
    username: {
        type: String,
        required:[true, 'El username es obligatorio'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [25, "El email es obligatorio"],
        unique: true,
        trim: true,
        lovercase: true,
        match: [/^\S+@\S+\.\S+$/, 'El email no es válido'],
    },
    password: {
        type: String,
        required:[true, "La contraseña es obligatoria"],
        minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
    },
    profilepicture: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        minlength: [8,'El teléfono tiene que tener al menos 8 caracteres'],
        maxLength: [8,'El teléfono no debe tener más de 8 caracteres'],
        trim: true
    },
    role: {
        type: String,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'USER_ROLE'
    },
    status: {
        type: Boolean,
        default: true
    },
    post: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
},{
    timestamps: true,
    versionKey: false
})

userSchema.methods.toJSON = function () {
    const { password, _id, ...user} = this.toObject();
    return {uid: _id, ...user}
}

export default model('User' , userSchema)
