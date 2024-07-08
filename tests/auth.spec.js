const request = require('supertest');
const app = require('../src/index');
const { sequelize, User } = require('../src/models');
const bcrypt = require('bcryptjs');


jest.setTimeout(30000);

beforeAll(async () => {
  try {
    console.log('Syncing database...');
    await sequelize.sync({ force: true });
    console.log('Database synced.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
});

afterAll(async () => {
  try {
    console.log('Closing database connection...');
    await sequelize.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
});

afterEach(async () => {
    await sequelize.truncate({ cascade: true });
});

describe('Auth Endpoints', () => {
  it('should register a user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data.accessToken');
  });

  it('should login a user successfully', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: hashedPassword
    });
    console.log('Created user:', user);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: user.email,
        password: user.password
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data.accessToken');
  });

  it('should fail if required fields are missing', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'John',
        // Missing lastName, email, and password
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body.errors).toContainEqual(expect.objectContaining({ field: 'lastName' }));
  });

  it('should fail if there is a duplicate email', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'john.doe@example.com',
        password: 'password456'
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body.errors).toContainEqual(expect.objectContaining({ field: 'email' }));
  });
});
