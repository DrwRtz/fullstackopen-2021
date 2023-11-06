const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let token = ''

beforeAll(async () => {
  await User.deleteMany({})

  const initialUser = {
    username: 'Test01',
    name: 'TestSubject',
    password: '54321'
  }

  await api.post('/api/users').send(initialUser)

  const loginUser = {
    username: 'Test01',
    password: '54321'
  }

  const loginResponse = await api.post('/api/login').send(loginUser)
  token = loginResponse.body.token
})

const initialBlogs = [
  {
    title: 'Advantages and disadvantages of stuff',
    author: 'It is I',
    url: 'https://onlyadvantagesmatter.net',
    likes: 14
  },
  {
    title: 'Dread came out',
    author: 'Me times three',
    url: 'mdread.com.uk.net',
    likes: 999
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  
  await Promise.all(promiseArray)

})

test('returns the right number of blog posts', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
})

test('identifier property is "id" and not "_id"', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('it can create a new blog post', async () => {
  const newBlog = {
    title: 'Placeholder for a title',
    author: 'Me',
    url: 'https://idk.net',
    likes: 0
  }

  await api.post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)

  const actualBlogs = await api.get('/api/blogs')
  expect(actualBlogs.body).toHaveLength(initialBlogs.length + 1)

  const onlyTitles = actualBlogs.body.map(blog => blog.title)
  expect(onlyTitles).toContain('Placeholder for a title')
})

test('default amount of likes', async () => {
  const newBlog = {
    title: 'Original Title',
    author: 'Jhon',
    url: 'https://jhonwebsite.com'
  }

  await api.post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
  
  const actualBlogs = await api.get('/api/blogs')

  expect(actualBlogs.body[2].likes).toBe(0)
})

test('when title and url are missing', async () => {
  const newBlog = {
    author: 'new author',
    likes: 1
  }

  await api.post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('fails when token is not provided', async () => {
  const newBlog = {
    title: 'Original Title',
    author: 'Jhon',
    url: 'https://jhonwebsite.com'
  }

  await api.post('/api/blogs')
    .set('Authorization', `bearer `)
    .send(newBlog)
    .expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})
