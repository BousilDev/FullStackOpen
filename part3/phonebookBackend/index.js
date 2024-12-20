const express = require('express')
const app = express()

let notes = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(notes)
})

app.get('/info', (request, response) => {
    const date = (new Date()).toString()
    const message = 
    `<div>
        <p>Phonebook has info for ${notes.length} people</p>
        <p>${date}</p>
    </div>`
    response.send(message)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })

app.use(express.json())

const generateId = () => String(Math.floor(Math.random() * 10000))
  
app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }

    if (notes.find(note => note.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const note = {
    id: generateId(),
    name: body.name,
    number: body.number
    }

    notes = notes.concat(note)

    response.json(note)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})