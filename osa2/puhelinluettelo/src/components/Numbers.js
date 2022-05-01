import Person from "./Person";

const Numbers = ({ persons, newFilter }) => {
  const filter = persons
    .filter((person) => {
      if (newFilter === "") {
        return person;
      } else if (person.name.toLowerCase().includes(newFilter.toLowerCase())) {
        return person;
      }
    })
    .map((person) => <Person key={person.id} persons={person} />);
  return filter;
};
export default Numbers;
