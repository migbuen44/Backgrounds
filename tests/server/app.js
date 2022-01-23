import supertest from 'supertest';
import app from '../../server/app';

describe('POST /signup', () => {
  describe('given a name, email, and password', () => {
    test('should respond with 200 status code on success', () => {
      const response = request(app).post('/signup').send({
        name: 'test',
        email: 'test@gmail.com',
        password: 'password',
      });
    });
    // should respond with a json object containing user id
    // should save name, email, password in database
    // should specify json in the content header
  });
});
