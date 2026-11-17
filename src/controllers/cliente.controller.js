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

