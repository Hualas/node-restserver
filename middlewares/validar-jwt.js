const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req,res = response, next )=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peitición'
        });
    }

    try {
        // const payload = jwt.verify(token,process.env.SECRETORPRIVATEKEY)
        // console.log(payload);
        const { uid } = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        
        //Leer el usuario q coresponde al uid
        const usuario = await Usuario.findById(uid);//user login
        if( !usuario ){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe BD'
            });
        }
        // Verificar si el uid estado true (usuario login)
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}


module.exports={
    validarJWT 
}