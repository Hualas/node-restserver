const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response ) => {

    // const { q, nombre = 'No name', apikey='defecto', page=1, limit=10 } = req.query;
    const { limite=5, desde = 0 } = req.query;
    const query = { estado: true };

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));
    // const total = await Usuario.countDocuments(query);

    const [ total, usuarios ] = await Promise.all([ // Ejecuta las anteriores funciones en paralelo
        Usuario.count(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}
const usuariosPost = async(req, res = response ) => { 
    // const body = req.body;
    const { nombre, correo, password, rol } = req.body;
    // const usuario = new Usuario(body);
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si existe correo

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); //Numero de vueltas de la encriptacion, por defecto 10
    usuario.password = bcryptjs.hashSync( password,salt );

    //Gravar en db
    await usuario.save();
    res.json({
        usuario
    });
}

const usuariosPut = async(req, res = response ) => {
    // const id = req.params.id;
    const {id} = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos
    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password,salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json( usuario );
}

const usuariosPatch = (req, res = response ) => {
    res.json({
        msg: 'Patch API - controlador'
    });
}

const usuariosDelete = async(req, res = response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    //const usuario autenticado
    // const usuarioAutenticado = req.usuario;//user login
    // res.json({ usuario, usuarioAutenticado });

    res.json(usuario);//Usuario modificado/Eliminado
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}