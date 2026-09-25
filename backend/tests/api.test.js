const request = require('supertest');
const app = require('../src/app');

describe('CommitGuard Backend API Suite', () => {
  let authToken = '';
  let commitmentId = '';

  test('GET /health returns 200 OK', async () => {
    const res = await request(app).get('/health');
    assertStatus(res, 200);
    expect(res.body.status).toBe('ok');
  });

  test('POST /api/auth/register creates a user and returns token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test Engineer',
        email: `test-${Date.now()}@commitguard.com`,
        password: 'TestPassword123!',
        timezone: 'Asia/Kolkata'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    authToken = res.body.token;
  });

  test('POST /api/auth/login logs in user and returns JWT', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'demo@commitguard.com',
        password: 'Password123!'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    if (!authToken) authToken = res.body.token;
  });

  test('GET /api/auth/me returns current user profile', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user).toBeDefined();
  });

  test('POST /api/commitments creates a commitment', async () => {
    const res = await request(app)
      .post('/api/commitments')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Daily Evening Workout',
        description: '30 mins HIIT session',
        category: 'Fitness',
        date: '2026-09-26',
        time: '19:00',
        repeatSchedule: 'Daily',
        proofRequired: true,
        proofType: 'image',
        penaltyAmount: 100,
        penaltyDestination: 'Accountability Partner'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id || res.body.data.id).toBeDefined();
    commitmentId = res.body.data._id || res.body.data.id;
  });

  test('GET /api/commitments lists commitments', async () => {
    const res = await request(app)
      .get('/api/commitments')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('POST /api/commitments/:id/proof submits proof and invokes AI verification', async () => {
    if (!commitmentId) commitmentId = 'comm-1';
    const res = await request(app)
      .post(`/api/commitments/${commitmentId}/proof`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        proofType: 'text',
        textContent: 'Finished 30 minute intense workout session with total calories burned.'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.verification).toBeDefined();
    expect(res.body.verification.verified).toBe(true);
  });

  test('GET /api/streaks retrieves streak information', async () => {
    const res = await request(app)
      .get('/api/streaks')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.currentStreak).toBeDefined();
  });

  test('GET /api/analytics retrieves analytics summary', async () => {
    const res = await request(app)
      .get('/api/analytics')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.weeklyCompletionRate).toBeDefined();
  });

  test('GET /api/notifications retrieves notification center items', async () => {
    const res = await request(app)
      .get('/api/notifications')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });
});

function assertStatus(res, expected) {
  if (res.statusCode !== expected) {
    throw new Error(`Expected status ${expected} but got ${res.statusCode}: ${JSON.stringify(res.body)}`);
  }
}
