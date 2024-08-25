const app = require('../app')
const request = require('supertest')

async function loginAdmin () {
  const loginResponse = await request(app)
    .post('/login')
    .send({ email: 'user_test_1@gmail.com', password: '123456' })
  expect(loginResponse.statusCode).toBe(200)
  expect(loginResponse.body.message).toBe('Login/Password ok')
  expect(loginResponse.body).toHaveProperty('token')
  return loginResponse
}

test('Test invalid token', async () => {
  const loginResponse = await loginAdmin()
  const response = await request(app)
    .get('/api/members')
    .set('x-access-token', loginResponse.body.token + 'test')
  expect(response.statusCode).toBe(403)
  expect(response.body.status).toBe(false)
  expect(response.body.message).toBe('Token invalid')
})

test('Test list members', async () => {
  const loginResponse = await loginAdmin()
  const response = await request(app)
    .get('/api/members')
    .set('x-access-token', loginResponse.body.token)
  expect(response.statusCode).toBe(200)
  expect(response.body.message).toBe('Returning members')
  expect(response.body.data.length).toBeGreaterThan(0)
})

test('Test new member with weak password', async () => {
  const loginResponse = await loginAdmin()
  const response = await request(app)
    .post('/api/members')
    .set('x-access-token', loginResponse.body.token)
    .send({
      name: 'New Member',
      email: 'newmember@example.com',
      password: '123',
      isAdmin: false
    })

  expect(response.body.message).toBe('Weak password!')
  expect(response.statusCode).toBe(400)
  expect(response.body.status).toBe(false)
})

test('Test new member with strong password', async () => {
  const loginResponse = await loginAdmin()
  const response = await request(app)
    .post('/api/members')
    .set('x-access-token', loginResponse.body.token)
    .send({
      name: 'New Member',
      email: 'newmember@example.com',
      password: '1m02P@SsF0rt!',
      isAdmin: false
    })

  expect(response.body.message).toBe('Member Added')
  expect(response.statusCode).toBe(200)
  expect(response.body.status).toBe(true)
})

test('Test verifying added member', async () => {
  const loginResponse = await loginAdmin()

  const memberListResponse = await request(app)
    .get('/api/members')
    .set('x-access-token', loginResponse.body.token)

  expect(memberListResponse.statusCode).toBe(200)
  expect(memberListResponse.body.status).toBe(true)
  expect(memberListResponse.body.message).toBe('Returning members')
  expect(memberListResponse.body.data.length).toBeGreaterThan(0)

  const newMember = memberListResponse.body.data.find(user => user.name === 'New Member')
  expect(newMember).toBeDefined()
  expect(newMember.email).toBe('newmember@example.com')
})

test('Test forbidden - not admin', async () => {
  const loginResponse = await request(app)
    .post('/login')
    .send({ email: 'newmember@example.com', password: '1m02P@SsF0rt!' })

  const updateMember = await request(app)
    .put('/api/members/1')
    .set('x-access-token', loginResponse.body.token)

  expect(updateMember.body.message).toBe('Forbidden - not admin')
  expect(updateMember.statusCode).toBe(403)
  expect(updateMember.body.status).toBe(false)
})

test('Test member updated', async () => {
  const loginResponse = await loginAdmin()

  const updateMember = await request(app)
    .put('/api/members/5')
    .set('x-access-token', loginResponse.body.token)
    .send({
      name: 'New User edited',
      email: 'newuser@example.com',
      isAdmin: false
    })
  expect(updateMember.body.message).toBe('Member updated')
  expect(updateMember.statusCode).toBe(200)
  expect(updateMember.body.status).toBe(true)
})

test('Test member updated password not admin', async () => {
  const loginResponse = await request(app)
    .post('/login')
    .send({ email: 'newmember@example.com', password: '1m02P@SsF0rt!' })

  const updateMember = await request(app)
    .put('/api/members/2')
    .set('x-access-token', loginResponse.body.token)
    .send({ password: '1m02P@SsF0rt!' })

  expect(updateMember.body.message).toBe('Forbidden - not admin')
  expect(updateMember.statusCode).toBe(403)
  expect(updateMember.body.status).toBe(false)
})

test('Test wrong password', async () => {
  const loginResponse = await request(app)
    .post('/login')
    .send({ email: 'newmember@example.com', password: '1m02P@SsF0rt!Changed' })

  expect(loginResponse.body.message).toBe('Wrong email/password')
  expect(loginResponse.statusCode).toBe(403)
  expect(loginResponse.body.status).toBe(false)
})

test('Test wrong email', async () => {
  const loginResponse = await request(app)
    .post('/login')
    .send({ email: 'newmember@example', password: '1m02P@SsF0rt!' })

  expect(loginResponse.body.message).toBe('Wrong email/password')
  expect(loginResponse.statusCode).toBe(403)
  expect(loginResponse.body.status).toBe(false)
})

test('Test login not specify email or/and password', async () => {
  const loginResponse = await request(app)
    .post('/login')

  expect(loginResponse.body.message).toBe('You must specify the email and password')
  expect(loginResponse.statusCode).toBe(400)
  expect(loginResponse.body.status).toBe(false)
})

test('Test add member not specify main or/and password', async () => {
  const loginResponse = await loginAdmin()
  const response = await request(app)
    .post('/api/members')
    .set('x-access-token', loginResponse.body.token)
    .send({
      name: 'New Member',
      password: '1m02P@SsF0rt!',
      isAdmin: false
    })

  expect(response.body.message).toBe('You must specify the name and email')
  expect(response.statusCode).toBe(400)
  expect(response.body.status).toBe(false)
})

test('Test member updated not specify', async () => {
  const loginResponse = await loginAdmin()

  const updateMember = await request(app)
    .put('/api/members/2')
    .set('x-access-token', loginResponse.body.token)

  expect(updateMember.body.message).toBe('You must specify the name, email or password')
  expect(updateMember.statusCode).toBe(400)
  expect(updateMember.body.status).toBe(false)
})

test('Test member delete without endpoint', async () => {
  const loginResponse = await loginAdmin()

  const groupId = ''
  const deleteMember = await request(app)
    .delete(`/api/members/${groupId}`)
    .set('x-access-token', loginResponse.body.token)

  expect(deleteMember.body.message).toBe('Endpoint Not Found')
  expect(deleteMember.statusCode).toBe(404)
  expect(deleteMember.body.status).toBe(false)
})
