
// test/index.test.js
import { jest } from '@jest/globals';
;

jest.mock('../../db.js', () => ({
  db: jest.fn(),
}));

jest.mock('../../app.js', () => ({
  __esModule: true,
  default: {
    listen: jest.fn().mockImplementation((port, callback) => {
      // Simula la creación del servidor de express
      const server = {
        port: port,
        callback: callback,
        listen: jest.fn().mockReturnValueOnce(undefined),
      };
      return server;
    }),
  },
}));

describe('Index script', () => {
  it('should call db and start the server', () => {
    const { db } = require('../../db.js');
    const app = require('../../app.js').default;

    require('../../index.js'); // Importa el archivo de índice para ejecutarlo

    expect(db).toHaveBeenCalled();
    expect(app.listen).toHaveBeenCalledWith(3000, expect.any(Function));
  });
});
