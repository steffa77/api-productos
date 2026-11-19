const { pool } = require('../config/database')

const validarCampos = ({ razonsocial, contacto, ruc, direccion } = {}) => {
    const errores = []
    if (!razonsocial || razonsocial.trim() === '') errores.push('La razón social es obligatoria')
    if (!contacto || contacto.trim() === '') errores.push('El contacto es obligatorio')
    if (!ruc || ruc.trim() === '' || ruc.trim().length !== 11) errores.push('El RUC debe tener 11 dígitos')
    if (!direccion || direccion.trim() === '') errores.push('La dirección es obligatoria')

    return errores
}

const listarProveedores = async (req, res) => {
    try {
        const [proveedores] = await pool.query('SELECT * FROM proveedores ORDER BY id')
        res.status(200).json({
            ok: true,
            total: proveedores.length,
            data: proveedores
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            ok: false,
            message: 'Error interno en el servidor'
        })
    }
}

const obtenerProveedor = async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                message: 'El ID no puede ser negativo o cero'
            })
        }

        const [registro] = await pool.execute('SELECT * FROM proveedores WHERE id = ?', [id])

        if (registro.length === 0) {
            return res.status(404).json({
                ok: false,
                message: 'No existe el proveedor'
            })
        }

        res.status(200).json({
            ok: true,
            data: registro[0]
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            ok: false,
            message: 'Error interno en el servidor'
        })
    }
}

const crearProveedor = async (req, res) => {
    try {
        const errores = validarCampos(req.body)
        if (errores.length > 0) {
            return res.status(400).json({
                ok: false,
                message: 'Verifique los datos solicitados',
                errores
            })
        }

        const { razonsocial, contacto, ruc, direccion } = req.body
        const consulta = 'INSERT INTO proveedores (razonsocial, contacto, ruc, direccion) VALUES (?,?,?,?)'
        const [registro] = await pool.execute(consulta, [razonsocial, contacto, ruc, direccion])

        res.status(201).json({
            ok: true,
            id: registro.insertId
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            ok: false,
            message: 'Error interno en el servidor'
        })
    }
}

const actualizarProveedor = async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                message: 'El ID no puede ser negativo o cero'
            })
        }

        const errores = validarCampos(req.body)
        if (errores.length > 0) {
            return res.status(400).json({
                ok: false,
                message: 'Verifique los datos solicitados',
                errores
            })
        }

        const [existe] = await pool.execute('SELECT id FROM proveedores WHERE id = ?', [id])
        if (existe.length === 0) {
            return res.status(404).json({
                ok: false,
                message: 'El ID no existe'
            })
        }

        const consulta = 'UPDATE proveedores SET razonsocial=?, contacto=?, ruc=?, direccion=?, updated_at=NOW() WHERE id=?'
        const { razonsocial, contacto, ruc, direccion } = req.body
        const [resultado] = await pool.execute(consulta, [razonsocial, contacto, ruc, direccion, id])

        res.status(200).json({
            ok: true,
            filasAfectadas: resultado.affectedRows
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            ok: false,
            message: 'Error interno en el servidor'
        })
    }
}

const eliminarProveedor = async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                message: 'El ID no puede ser negativo o cero'
            })
        }

        const [resultado] = await pool.execute('DELETE FROM proveedores WHERE id = ?', [id])

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                message: 'El ID no existe'
            })
        }

        res.status(200).json({
            ok: true,
            message: 'Proveedor eliminado'
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            ok: false,
            message: 'Error interno en el servidor'
        })
    }
}

module.exports = {
    listarProveedores,
    obtenerProveedor,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor,
}