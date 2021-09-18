require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('obj', (req) => JSON.stringify(req.body))

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.obj(req, res)
  ].join(' ')
}))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people =>
    response.json(people)
  )
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(result =>
    response.json(result)
  ).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number)
    return response.status(400).json({
      error: 'name or number missing'
    })

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson =>
    response.json(savedPerson)
  ).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person,
    { new: true, runValidators: true }).then(updatedPerson =>
  {
    if (updatedPerson)
      response.json(updatedPerson)
    else
      response.status(404).end()
  })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  Person.estimatedDocumentCount((err, count) => {
    const date = new Date()
    response.send(`<p>Phonebook has info for ${count} people</p>
      <p>${date}</p>`)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError')
    return response.status(400).send({ error: error })

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})