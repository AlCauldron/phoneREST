const { request, response } = require("express")
const express = require("express")
const morgan = require("morgan")
const cors = require('cors')
const App = express()

App.use(cors())
App.use(express.json())
App.use(morgan(function(tokens,req,res) {
    const body = req.body
    const person ={
        name:body.name,
        number:body.number
    }
    return[
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(person)
    ].join(' ')
}))


const url = "/api/persons"
let persons = [
    {
        id:1,
        name:"ram",
        number:"000001"
    },
    {
        id:2,
        name:"ari",
        number:"000011"
    },
    {
        id:3,
        name:"Karam",
        number:"000101"
    },
    {
        id:4,
        name:"Sharam",
        number:"010001"
    }
]

App.get('/',(request,response)=>{
    response.send('<h2>Hello Api</h2>')
})

App.get(url,(request,response)=>{
    response.send(persons)
})

App.get(`${url}/:id`,(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find(pers=>pers.id === id)
    response.send(person)
})

App.get('/info',(request,response)=>{
    const date = new Date()
    response.send(`Phonebook has info of ${persons.length} persons<br/>${date}`)
})

App.delete(`${url}/:id`,(request,response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(person=> person.id !== id)

    response.status(204).end
})

const generateId =()=>{
    const max = persons.length > 0 ? Math.max(...persons.map(n=>n.id)):0
    return max + 1
}

App.post(url,(request,response)=>{
    const body = request.body
    if (!body.name || persons.find(person=>person.name === body.name || !body.number)){
        return response.status(404).json({
            error:"same (name) or number missing"
        })
    }

    const person={
        id : generateId(),
        name:body.name,
        number:body.number,
        date: new Date() 
    }
    persons= persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
App.listen(PORT)