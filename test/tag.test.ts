import * as request from 'supertest';
import { server } from '../src/app';

describe('GET /api/tag', () => {
  it('should return 200', done => {
    request(server)
      .get('/api/tag')
      .expect(200, done);
  });
});
