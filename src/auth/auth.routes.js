import {Router} from "express"
import { register, login } from './auth.controller.js'
import { uploadProfilePicturre } from "../../middlewares/file-uploader.js"

const router = Router()

router.post ('/register',
    uploadProfilePicturre.single('profilePicture'),
    register
)

router.post('/login', login)

export default router
