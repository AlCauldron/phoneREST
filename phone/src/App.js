import axios from 'axios';
import React,{useState,useEffect} from 'react';
import Filterr from "./component/filter"
import phoneService from "./service/newService";

function App() {
  const [ persons, setPersons ] = useState([])
  const [filter,setFilter] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(()=>{
    phoneService
                .getAll()
                .then(phone=>setPersons(phone))
  },[])

  function delPerson(id,name){
    const confirm = window.confirm(`Delete ${name}?`)
    if (confirm) {
        const request = axios.delete(`http://localhost:3001/api/persons/${id}`)
        return request.then(response=>response.data)
    }
  }

  const handleSubmit=(event)=>{
    event.preventDefault()
    const some = persons.some(person => person.name === newName)
    if (!newName || !newName) {
      alert(`Name or number empty`)
    }
    if (some) {
        const confirm = window.confirm(`${newName} is already added to phonebook,replace the number with new one?`)
        if (confirm) {
          const temp = persons.find(person=>person.name === newName)
          const id = temp.id
          const changePerson ={...temp, number:newNumber}
          phoneService.update(id,changePerson)
                      .then(person=>{
                        setPersons(persons.concat(person))
                        setNewName('')
                        setNewNumber('')
                        })
        }
    }else{
      const personObj={
        name: newName,
        number: newNumber
      }
      phoneService
                  .create(personObj)
                  .then(person=>{
                    setPersons(persons.concat(person))
                    setNewName('')
                    setNewNumber('')
                  })
    }
  }

  const handleFilter=(event)=>{
    setFilter(event.target.value)
  }

  const handleChange=(event)=>{
    setNewName(event.target.value)
  }
  const handleNumberChange=(event)=>{
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      Filter shown with:<input value={filter} onChange={handleFilter}/>
      <h2>Add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/><br/>
          Number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Filterr search={filter} persons={persons} delPerson={delPerson}/>
    </div>
  );
}

export default App;
