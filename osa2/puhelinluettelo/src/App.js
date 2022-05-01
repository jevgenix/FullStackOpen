import { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("arto");
  const [newNumber, setNewNumber] = useState("5555");
  const [newFilter, setNewFilter] = useState("");

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    let bool = true;
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };
    persons.map((person) => {
      if (Object.values(person).indexOf(personObject.name) > -1) {
        bool = false;
        return alert(`${personObject.name} is already added to phonebook`);
      }
    });
    if (bool) setPersons(persons.concat(personObject));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with{" "}
          <input onChange={(event) => setNewFilter(event.target.value)} />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handlePersonChange} value={newName} />
          <br />
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter((person) => {
            if (newFilter == "") {
              return person;
            } else if (
              person.name.toLowerCase().includes(newFilter.toLowerCase())
            ) {
              return person;
            }
          })
          .map((person) => (
            <Person key={person.id} persons={person} />
          ))}
      </ul>
    </div>
  );
};

export default App;
