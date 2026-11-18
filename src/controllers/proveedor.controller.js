const { pool } = require('../config/database')

const validarCampos = ({ razonsocial, contacto, ruc, direccion } = {}) => {
    const errore = []
    if (!razonsocial || razonsocial.trim() === '') errores.push('La razón social es obligatoria')
    if (!contacto || contacto.trim() === '') errore.push('El contacto es obligatorio')
    if (!ruc || ruc.trim() === '' || ruc.trim().length !== 11) errore.push('El RUC debe tener 11 dígitos')
    if (!direccion || direccion.trim() === '') errore.push('La dirección es obligatoria')

    return errore
}

const listarProveedores = async (req, res) => {
    
}