import User from '../users/user.model.js'
import { hash, verify } from 'argon2'
import {generarJWT} from "../../helpers/JWT-generate.js"

export const register = async (req, res) => {
    try{
        const data = req.body

        let profilepicture = req.fileRelativePath || 'profiles/default-avatar.png'
        const encryptedPassword = await hash(data.password)

        const newuser = await User.create({
            name: data.name,
            surname: data.surname,
            username: data.username,
            email: data.email,
            password: encryptedPassword,
            profilepicture
        })
        return res.status(200).json({
            message: "Usuario registrado correctamente",
            userDetails: {
                user: newuser.username,
                email: newuser.email, 
            },
        });
    }catch (error){
        return res.status(500).json({
            message: 'Error al registrar el usuario',
            err: error.message 
        })
    }
}
export const login = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const lowerEmail = email ? email.toLowerCase() : null;
        const lowerUsername = username ? username.toLowerCase() : null;

        const user = await User.findOne({
            $or: [{ email: lowerEmail }, { username: lowerUsername }],
        });

        if (!user) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        const validPassword = await verify(user.password, password);

        if (!validPassword) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        const token = await generarJWT(user.id, user.email);

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            userDetails: {
                username: user.username,
                token: token,
                profilePicture: user.profilepicture,
                uid: user.id,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error del servidor",
            error: error.message,
        });
    }
};
