const { Router } = require('express')
const controller = require('../controllers/proveedor.controller')

const router = Router()

router.get('/', controller.listarProveedores)
router.get('/:id', controller.obtenerProveedor)
router.post('/', controller.crearProveedor)
router.put('/:id', controller.actualizarProveedor)
router.delete('/:id', controller.eliminarProveedor)

module.exports = router