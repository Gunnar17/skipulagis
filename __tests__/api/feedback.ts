import handler from '../../pages/api/feedback';
import { createMocks } from 'node-mocks-http';

describe('/api/feedback API', () => {
  it('should return 405 on GET', async () => {
    const { req, res } = createMocks({ method: 'GET' });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(405);
  });

  it('should return 200 on valid POST', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { name: 'Test', email: 'a@b.com', area: 'Miðborg', comment: 'OK' },
    });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toContain('Feedback saved');
  });
});