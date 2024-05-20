import request from 'supertest';
import app from '../../app'; 

// Supongamos que tienes una función para obtener un token de autenticación
// Podrías reemplazar esto con tu propia lógica para obtener el token
const getToken = async () => {
    try {
      console.log('Iniciando solicitud para obtener token...');
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'andrea@example.com',
          password: 'Andrea@12'
        });
      console.log('Respuesta de solicitud:', response.body);
      return response.body.token;
    } catch (error) {
      console.error('Error al obtener el token:', error);
      throw error; // Asegúrate de relanzar el error para que sea capturado por las pruebas
    }
};
  

describe('API Endpoints', () => {
    let token;

    beforeAll(async () => {
      const startTime = Date.now();
      try {
        console.log('Obteniendo token de autenticación...');
        token = await getToken();
        const endTime = Date.now();
        console.log('Token obtenido en', endTime - startTime, 'milisegundos');
      } catch (error) {
        console.error('Error al obtener el token:', error);
      }
    }, 30000);
    
  
    it('debe retornar status 200 (OK for /api/products)', async () => {
      console.log('Haciendo solicitud para /api/products...');
      // Hacemos la solicitud con el token en el encabezado
      const res = await request(app)
        .get('/api/products')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
    }, 30000);

  // it('debe retornar status 200 (OK for /api/players)', async () => {
  //   const res = await request(app)
  //     .get('/api/players')
  //     .set('Authorization', `Bearer ${token}`);
  //   expect(res.statusCode).toEqual(200);
  // }, 30000);

  
});
