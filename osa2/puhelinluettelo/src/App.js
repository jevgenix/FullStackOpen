import { useState } from "react";
import PersonForm from "./components/Form";
import Numbers from "./components/Numbers";
import FilterForm from "./components/FilterForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    let bool = true;
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    persons.filter((person) => {
      if (person.name.toLowerCase() === personObject.name.toLowerCase()) {
        bool = false;
        return alert(`${personObject.name} is already added to phonebook`);
      }
    });

    if (bool) setPersons(persons.concat(personObject));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm onChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        handlePersonChange={handlePersonChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <ul>
        <Numbers newFilter={newFilter} persons={persons} />
      </ul>
    </div>
  );
};

export default App;
