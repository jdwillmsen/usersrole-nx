import axios from 'axios';

describe('usersrole-nx-functions', () => {
  describe('GET /', () => {
    it('should return a 200 status', async () => {
      const res = await axios.get(`/`);

      expect(res.status).toBe(200);
      expect(res.data).toBe('Server is up and running!');
    });
  });

  describe('users', () => {
    describe('GET /users/:uid', () => {
      it('should return a 401 with no auth', async () => {
        await axios.get('/users/testuid').catch((error) => {
          expect(error.response.status).toBe(401);
          expect(error.response.data).toStrictEqual({
            message: 'Unauthorized',
          });
        });
      });
    });

    describe('GET /users', () => {
      it('should return a 401 with no auth', async () => {
        await axios.get('/users').catch((error) => {
          expect(error.response.status).toBe(401);
          expect(error.response.data).toStrictEqual({
            message: 'Unauthorized',
          });
        });
      });
    });

    describe('PATCH /users/roles/:uid', () => {
      it('should return a 401 with no auth', async () => {
        await axios.patch('/users/roles/testuid').catch((error) => {
          expect(error.response.status).toBe(401);
          expect(error.response.data).toStrictEqual({
            message: 'Unauthorized',
          });
        });
      });
    });

    describe('PATCH /users/:uid', () => {
      it('should return a 401 with no auth', async () => {
        await axios.patch('/users/testuid').catch((error) => {
          expect(error.response.status).toBe(401);
          expect(error.response.data).toStrictEqual({
            message: 'Unauthorized',
          });
        });
      });
    });

    describe('DELETE /users/:uid', () => {
      it('should return a 401 with no auth', async () => {
        await axios.delete('/users/testuid').catch((error) => {
          expect(error.response.status).toBe(401);
          expect(error.response.data).toStrictEqual({
            message: 'Unauthorized',
          });
        });
      });
    });

    describe('POST /users', () => {
      it('should return a 400 with no body', async () => {
        await axios.post('/users').catch((error) => {
          expect(error.response.status).toBe(400);
          expect(error.response.data).toStrictEqual({
            message: 'Missing fields',
          });
        });
      });
    });
  });
});
