const { response, request } = require('express');

const usuariosGet = (req = request, res = response ) => {

    // const query = req.query;
    const { q, nombre = 'No name', apikey='defecto', page=1, limit=10 } = req.query;
    res.json({
        msg: 'get API - controlador',
        q, 
        nombre, 
        apikey,
        page,
        limit
    });
}
const usuariosPost = (req, res = response ) => {

    // const body = req.body;
    const {nombre,edad} = req.body;

    res.json({
        msg: 'Post API - controlador',
        nombre,
        edad
    });
}
const usuariosPut = (req, res = response ) => {

    // const id = req.params.id;
    const {id} = req.params;
    res.json({
        msg: 'Put API - controlador',
        id
    });
}
const usuariosPatch = (req, res = response ) => {
    res.json({
        msg: 'Patch API - controlador'
    });
}
const usuariosDelete = (req, res = response ) => {
    res.json({
        msg: 'Delete API - controlador'
    });
}


module.exports = {
    usuariosGet
    ,usuariosPost
    ,usuariosPut
    ,usuariosPatch
    ,usuariosDelete
}