const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto,
        obtenerProductos, 
        obtenerProducto, 
        actualizarProducto, 
        borrarProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { validarJWT, esAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// {{url}}/api/productos

//Obtener todas las productos - publico
router.get('/', obtenerProductos );

//Obtener una productos por id- publico
router.get('/:id', [
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],obtenerProducto);

//Crear productos - privado - cualquire usuario con token valido
router.post('/', [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('categoria','No es un id de Mongo').isMongoId(),
        check('categoria').custom( existeCategoriaPorId ),
        validarCampos
    ], crearProducto);

//Actualizar - privado - cualquire usuario con token valido
router.put('/:id', [
    validarJWT,
    // check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],actualizarProducto);

//Borrar una productos - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto );



module.exports = router;

