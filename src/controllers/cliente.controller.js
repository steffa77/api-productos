const { act } = require('react')
const { pool } = require('../config/database')

const validarCampos = ({ apellidos, nombres, telefono, direccion, email} = {}) => {
    const errores = []
    if (!apellidos || apellidos.trim() === '') errores.push('Los apellidos son obligatorios')
    if (!nombres || nombres.trim() === '') errores.push('Los nombres son obligatorios')
    if (!telefono || telefono.trim() === '') errores.push('El telefono es obligatorio')
    if (!direccion || direccion.trim() === '') errores.push('La dirección es obligatorio')
    if (!email || email.trim() === '') errores.push('El email es obligatorio')

    return errores
}

const listarClientes = async (req, res) => {
    try {
        const [clientes] = await pool.query('SELECT * FROM clientes ORDER BY id')
        res.status(200).json({
            ok: true,
            total: clientes.length,
            data: clientes
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            ok: false,
            message: 'Error interno en el servidor'
        })
    }
}

const obtenerCliente = async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                message: 'El ID no puede ser negativo o cero'
            })
        }

        const [registro] = await pool.execute('SELECT * FROM clientes WHERE id = ?', [id])

        if(registro.length === 0) {
            return res.status(400).json({
                ok: false,
                message: 'No existe el cliente'
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

const crearCliente = async (req, res) => {
    try{
        const errores = validarCampos(req.body)
        if (errores.length > 0) {
            return res.status(400).json({
                ok: false,
                message: 'Verifique los datos solicitados',
                errores
            })
        }

        const { apellidos, nombres, telefono, direccion, email } = req.body
        const consulta = 'INSERT INTO clientes (apellidos, nombres, telefono, dirrecion, email) VALUES (?,?,?,?,?)'
        const [registro] = await pool.execute(consulta, [apellidos, nombres, telefono, direccion, email])

        res.status(201).json({
            ok: true,
            id: registro.insertId
        })
    } catch (e){
        console.error(e)
        res.status(500).json({
            ok: false,
            message: 'Error interno en el servidor'
        })
    }
}

const actualizarCliente = async (req, res) => {
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
                message: 'verifique los datos solicitados',
                errores
            })
        }

        const [existe] = await pool.execute('SELECT id FROM clientes WHERE id = ?', [id])
        if (existe.length === 0) {
            return res.status(404).json({
                ok: false,
                message: 'El ID no existe'
            })
        }

        const consulta = 'UPDATE clientes SET apellidos=?, nombres=?, telefono=?, direccion=?, email=?, update_at=NOW() WHERE id=?'
        const { apellidos, nombres, telefono, direccion, email } = req.body
        const [resultado] = await pool.execute(consulta, [apellidos, nombres, telefono, direccion, email, id])

        res.status(200).json({
            ok: true,
            filasAfectadas: resultado.affectedRows
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            ok: false,
            message: 'Eror interno en el servidor'
        })
    }
}

const eliminarCliente = async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                message: 'El ID no puede ser negativo o cero'
            })
        }

        const [resultado] = await pool.execute('DELETE FROM clientes WHERE id = ?', [id])

        if(resultado.affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                message: 'El ID no existe'
            })
        }

        res.status(200).json({
            ok: true,
            message: 'Cliente eliminado'
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
    listarClientes,
    obtenerCliente,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
}