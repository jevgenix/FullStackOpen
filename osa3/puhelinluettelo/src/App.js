import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";
import FilterForm from "./components/FilterForm";
import Notification from "./components/Notification";
import NotificationError from "./components/NotificationError";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((err) => {
        setErrorMessage("error", err);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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
            }, setMessage(`${person.name}'s ${person.number} replaced with new ${personObject.number} number`))
            .catch((error) => {
              setMessage(null);
              setErrorMessage(
                "Error accured on trying update person information",
                error
              );
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            });
          bool = false;

          setNewName("");
          setNewNumber("");
          setTimeout(() => {
            setMessage(null);
          }, 5000);
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
          setMessage(
            `${personObject.name} ${personObject.number} added to list`
          );
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setErrorMessage("Error occured while you tried to add new person!");
          setPersons(persons.filter((n) => n.id !== personObject.id));
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
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
            setMessage(`Person ${name} removed from list`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((err) => {
            setErrorMessage(
              `Information of ${name} has already been removed from server`
            );
            setPersons(persons.filter((n) => n.id !== id));
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    };
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <NotificationError errorMessage={errorMessage} />
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
