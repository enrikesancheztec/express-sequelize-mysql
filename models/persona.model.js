/**
 * Representa una Persona.
 * @constructor
 * @param {number} id - Id de persona
 * @param {string} nombre - Nombre de pila
 * @param {string} apellido - Primer apellido
 */
/*
exports.Persona = function (id, nombre, apellido) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
};*/

module.exports = (sequelize, Sequelize) => {
    const Persona = sequelize.define("personas", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apellido: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
  
    return Persona;
};