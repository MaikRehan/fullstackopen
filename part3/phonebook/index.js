require('dotenv').config()
const express = require('express')
const morgan = require("morgan");
const Person = require('./models/people')
const app = express()


morgan.token('body', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(express.json())
app.use(express.static('dist'))

app.use(morgan((tokens, request, response) => {
    if (request.method === 'POST') {
        return [
            tokens.method(request, response),
            tokens.url(request, response),
            tokens.status(request, response),
            tokens.res(request, response, 'content-length'),
            tokens['response-time'](request, response), 'ms',
            tokens.body(request, response)
        ].join(' ')
    }
}))

let persons = [
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

app.get('/info', (request, response, next) => {
    Person.countDocuments({})
        .then(numberOfPersons => {
            response.send(`
                <div>
                    <p>Phonebook has info for ${numberOfPersons} people.</p>
                    <p>${new Date()}</p>       
                </div>
            `)
        })
        .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    Person.findOne({name: body.name})
        .then(existingPerson => {
            if (existingPerson) {
                return Person.findByIdAndUpdate(
                    existingPerson.id,
                    {number: body.number},
                    {new: true, runValidators: true}
                )
                    .then(updatedPerson => {
                        response.json(updatedPerson)
                    })
            } else {
                const person = new Person({
                    name: body.name,
                    number: body.number,
                })

                return person.save().then(savedPerson => {
                    response.json(savedPerson)
                })
            }
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body

    Person.findByIdAndUpdate(
        request.params.id,
        { name, number },
        { new: true, runValidators: true }
    )
        .then(updatedPerson => {
            if (updatedPerson) {
                response.json(updatedPerson)
            } else {
                response.status(404).json({ error: 'Person not found' })
            }
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)