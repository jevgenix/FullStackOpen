const Person = ({ persons, toggleToDelete }) => {
  return (
    <li>
      {persons.name}: {persons.number}
      <button onClick={toggleToDelete}>delete</button>
    </li>
  );
};

export default Person;
