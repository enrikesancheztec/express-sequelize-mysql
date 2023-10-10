import http from 'k6/http';
import { check, sleep } from 'k6';

const API_URL = "http://localhost:8080";

export const options = {
  scenarios: {
    getPersonas: {  //Test Case 1
      executor: 'constant-vus',
      exec: 'getPersonas',
      vus: 30,
      duration: '30s',
    },
    crearPersona: {   //Test Case 2
      executor: 'constant-vus',
      exec: 'crearPersona',
      vus: 10,
      duration: '30s',
    }
  }
}

export function getPersonas() {
  const response = http.get(`${API_URL}/personas/`);
  check(
    response, {"GET personas status code is 200": (r) => r.status == 200}
  );
  sleep(0.5);
}

export function crearPersona() {
  const primerNombre = "Test";
  const apellido = new Date().getTime().toString();

  const data = { nombre: primerNombre, apellido: apellido };

  const response = http.post(`${API_URL}/personas/`, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(
    response, {"POST personas status code is 201": (r) => r.status == 201}
  );

  sleep(0.5);
}

