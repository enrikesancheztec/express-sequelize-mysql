const request = require('supertest');
const server = require('../../app');

describe("Persona Controller Tests", () => {
    test("Obtener todas las personas", async () => {
        return request(server)
            .get('/personas')
            .send().expect(200);
    });

    test("Crear Persona", async () => {
        const primerNombre = "Test";
        const apellido = new Date().getTime().toString();

        return request(server)
            .post('/personas')
            .send({ nombre: primerNombre, apellido: apellido })
            .expect(201)
            .then((res) => {
                expect(res.body.id).toEqual(expect.any(Number));
                expect(res.body.nombre).toEqual(primerNombre);
                expect(res.body.apellido).toEqual(apellido);
            });
    });

    test("Crear Persona con Datos Invalidos", async () => {
        const primerNombre = "Test";

        return request(server)
            .post('/personas')
            .send({ nombre: primerNombre, apellido: "" })
            .expect(400);
    });

    test("Buscar Persona por Id Exitosamente", async () => {
        const primerNombre = "Test";
        const apellido = new Date().getTime().toString();

        return request(server)
            .post('/personas')
            .send({ nombre: primerNombre, apellido: apellido })
            .expect(201)
            .then((res) => {
                const newId = res.body.id;
                return request(server)
                    .get('/personas/' + newId)
                    .send()
                    .expect(200);
            });
    });

    test("Buscar Persona que no existe", async () => {
        return request(server)
            .get('/personas/' + 999999999999)
            .send()
           .expect(204);
    });
})