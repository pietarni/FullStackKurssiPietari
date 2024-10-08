import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import dataService from './services/DataHandler';

const App = () => {
  const [infoMessage, setInfoMessage] = useState(null);

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', 
    number: '040400'
    }
  ]) 

  useEffect(() => {
    dataService.getAll()
      .then(initialPersons => {
        console.log('success!');
        setPersons(initialPersons);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {

      if (infoMessage !== null) {
        const timer = setTimeout(() => {
          setInfoMessage(null);
        }, 1000);
    
        return () => clearTimeout(timer);
      } 
  }, [infoMessage]);

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
      event.preventDefault();
      if (persons.some(person => person.name === newName)) {
      
        alert(`${newName} is already added to phonebook`);
      
      } else {

      const newPerson = { name: newName , number: newNumber};

      dataService.create(newPerson)
      .then(response => {
        setInfoMessage(`Added ${response.name} `);
        setPersons(persons.concat(response));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      }
  };

  const handleDelete = (event,person) => {
    event.preventDefault();
    if (window.confirm(`Delete ${person.name}?`)) {
      dataService.remove(person.id)
          .then(() => {
              setPersons(persons.filter(p => p.id !== person.id));
          })
          .catch(error => {
              console.error('Error deleting person:', error);
              alert(`Failed to delete ${person.name}. It might have already been removed from the server.`);
          });
    }
  };

  const handleNameChange = (event) => {
      setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value);
  };

  return (
    <div>

      <h2>Phonebook</h2>
      <Notification message={infoMessage} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
    
      <Persons persons = {persons} handleDelete = {handleDelete}/>

    </div>
  )

}

export default App