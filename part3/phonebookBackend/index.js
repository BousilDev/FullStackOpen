require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
morgan.token('type', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))

const Person = require('./models/person')

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

app.get('/info', (request, response) => {
    const date = (new Date()).toString()
    Person.find({}).then(result => {
      const message = 
      `<div>
          <p>Phonebook has info for ${result.length} people</p>
          <p>${date}</p>
      </div>`
      response.send(message)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  })

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })
  
app.post('/api/persons', (request, response, next) => {
    const body = request.body
    
    if (!body.name || !body.number) {
      return next({ 
        name: 'NameOrNumberUndefined',
        message: 'name or number missing' 
      })
    }
    
    Person.find({"name": body.name}).then(result => {
      if (result.length !== 0) {
        return next({
          name: 'NotUnique',
          message: 'name must be unique'
        })
      }
      else {
        const person = new Person({
          name: body.name,
          number: body.number
        })
        
        person.save().then(savedPerson => {
          return response.json(savedPerson)
        })
        .catch(error => next(error))
      }
    })
  })

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(id, person, {new: true, runValidators: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
  })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'NotUnique' || error.name === 'NameOrNumberUndefined') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})