export const handleErrors = (err, req, res, next) => {
    if(err.status === 400 && err.errors){
        return res.status(400).json({
            errors: err.errors
        })
    }
    return res.status(500).json({
        sucess: false,
    msg: "Error interno del servidor",
    error: err.message
    })
}