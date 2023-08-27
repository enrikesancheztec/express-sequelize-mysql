const db = require('../models');

/**
 * Regresa una lista completa de personas
 * @returns {Array<Persona>} - Personas
 */
exports.buscarTodas = async function() {
    personas = await db.Persona.findAll();
    return personas;
}

/**
 * Regresa una persona para el id proporcionado
 * @param {Number} id - Id de la persona a buscar
 * @returns {Persona} - Persona que se encontro
 */
exports.buscarPorId = async function(idPersona) {
    let persona = undefined;

    personas = await db.Persona.findAll({
        where: {
            id: idPersona
        }
    });

    if (personas.length > 0) {
        persona = personas[0];
    }

    return persona;
}

/**
 * Crea una persona nueva y la persiste
 * @param {Persona} persona - Persona que se quiere crear
 * @returns {Persona} - Persona creada
 */
exports.crear = async function(persona) {
    nuevaPersona = await db.Persona.create(persona);
    console.log("Nueva persona agregada " + nuevaPersona.id);
    return nuevaPersona;
}

/**
 * Actualizar la persona para el id proporcionado
 * @param {Number} id - Id de la persona a actualizar
 * @param {Persona} persona - Persona que se quiere actualizar
 * @returns {Persona} - Persona que se actualizo
 */
exports.actualizar = async function(idPersona, persona) {
    let personaActualizada = false;

    personas = await db.Persona.findAll({
        where: {
            id: idPersona
        }
    });

    if (personas.length > 0) {
        result = await db.Persona.update(
            {
                nombre: persona.nombre,
                apellido: persona.apellido
            },
            {
                where: {
                    id: idPersona
                }
            }
        );

        personaActualizada = true;
    }

    return personaActualizada;
}