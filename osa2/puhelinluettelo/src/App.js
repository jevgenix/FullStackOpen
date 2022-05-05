import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";
import FilterForm from "./components/FilterForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const [detele, setDelete] = useState(false);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    let bool = true;
    persons.filter((person) => {
      if (person.name.toLowerCase() === personObject.name.toLowerCase()) {
        if (
          window.confirm(
            `${person.name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          // test
          console.log(
            `${person.name}'s ${person.number} is replaced with new ${personObject.number} number`
          );
          const personData = persons.find((n) => n.name === newName);
          const changedPerson = { ...personData, number: newNumber };

          personService
            .update(person.id, changedPerson)
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.name === newName ? returnedPerson : person
                )
              );
            })
            .catch((error) => {
              console.log(error);
            });
          bool = false;
          setNewName("");
          setNewNumber("");
        }
      } else {
        bool = true;
      }
    });

    persons.map((person) => {
      if (person.name.toLowerCase() === personObject.name.toLowerCase()) {
        bool = false;
      }
    });
    if (bool) {
      personService
        .create(personObject)
        .then((returnedObject) => {
          setPersons(persons.concat(returnedObject));
          console.log(`Person ${personObject.name} added`);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const toggleToDelete = (id, name) => {
    return () => {
      if (window.confirm(`Delete ${name}?`)) {
        console.log(`poistettiin ${name}`);
        personService
          .remove(id)
          .then(() => {
            setPersons(persons.filter((n) => n.id !== id));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
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
        <Numbers
          newFilter={newFilter}
          persons={persons}
          toggleToDelete={toggleToDelete}
        />
      </ul>
    </div>
  );
};

export default App;
