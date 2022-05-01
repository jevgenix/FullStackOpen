const Form = ({
  addPerson,
  handlePersonChange,
  newName,
  handleNumberChange,
  newNumber,
}) => {
  return (
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
  );
};

export default Form;
