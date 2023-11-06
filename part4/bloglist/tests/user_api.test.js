const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
})

describe('related to User API', () => {
  test('valid user created', async () => {
    const newUser = {
      username: "Successful01",
      name: "firstSubject",
      password: "barelyenough"
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
  
    const userList = await api.get('/api/users')
    expect(userList.body).toHaveLength(1)
  })

  test('invalid user is not created', async () => {
    const newUser = {
      name: "boundToFailure",
      password: "notenough"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const userList = await api.get('/api/users')
    expect(userList.body).toHaveLength(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
