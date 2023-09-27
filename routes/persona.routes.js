const router = require("express").Router();
const { check, param } = require('express-validator');

let personaController = require("../controllers/persona.controller");

router.get("/personas", personaController.getBuscarTodas);

router.get("/personas/:id", [
        param("id").isNumeric().withMessage("Id debe ser numerico")
    ], personaController.getBuscarPorId);

router.post("/personas", [
        check("nombre").not().isEmpty().withMessage("Nombre es obligatorio"),
        check("apellido").notEmpty().withMessage("Apellido es obligatorio")
    ], personaController.postCrear);

router.post("/personas-multiples", [
        check("*.nombre").not().isEmpty().withMessage("Nombre es obligatorio"),
        check("*.apellido").notEmpty().withMessage("Apellido es obligatorio")
    ], personaController.postCrearMultiple);

router.put("/personas/:id", [
        check("nombre").notEmpty().withMessage("Nombre es obligatorio"),
        check("apellido").notEmpty().withMessage("Apellido es obligatorio"),
        param("id").isNumeric().withMessage("Id debe ser numerico")
    ], personaController.putActualizar);    

module.exports = router;