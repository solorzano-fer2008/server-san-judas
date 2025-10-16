import jwt from 'jsonwebtoken'

export const validateJWT = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['authorization']
    
    if (!token ){
        return req.status(401).json({message: 'Es necesario el token de authorización'})
    }
    try{
        token = token.replace(/^Bearer\s+/, "")
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        req.uid = decoded.uid
    }catch(error){
        return res.status(401).json({
            message: 'Token no válido, rechazado ya que fue modificado'
        })
    }
    return next ()
}