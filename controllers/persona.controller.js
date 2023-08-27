const personaService = require('../services/persona.service');
const { validationResult } = require('express-validator');

/**
 * Procesa el request GET para obtener todas las personas
 * @param {Request} req - Request
 * @param {Response} res - Response que contiene una lista de todas las personas y status 200
 */
exports.getBuscarTodas = async function (req, res) {
    let personas = await personaService.buscarTodas();
    res.json(personas).status(200);
};

/**
 * Procesa el request GET para obtener una persona por medio de su id
 * @param {Request} req - Request 
 * @param {Response} res - Response Persona que pertenece al id proporcionado
 */
exports.getBuscarPorId = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let idPersona = req.params.id;
        let persona = await personaService.buscarPorId(idPersona);

        if (persona !== undefined) {
            res.json(persona).status(200);
        } else {
            res.status(204).json({ success: false });
        }        
    }
};

/**
 * Procesa el request POST para guardar una persona
 * @param {Request} req - Request que contiene la informacion de una nueva persona
 * @param {Response} res - Response que en caso exitoso retornara la persona creada y status 201, o regresara un error 400 en caso de que una de las entradas sea invalida
 */
exports.postCrear = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let persona = req.body;
        let personaCreada = await personaService.crear(persona);
        res.json(personaCreada).status(201);
    }    
};

/**
 * Procesa el request POST para guardar una persona
 * @param {Request} req - Request que contiene la informacion de una nueva persona
 * @param {Response} res - Response que en caso exitoso retornara la persona creada y status 201, o regresara un error 400 en caso de que una de las entradas sea invalida
 */
exports.putActualizar = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let persona = req.body;
        let idPersona = req.params.id;
        let personaActualizada = await personaService.actualizar(idPersona, persona);

        if (personaActualizada == true) {
            res.status(200).json({ success: true });
        } else {
            res.status(204).json({ success: false });
        }        

    }    
};