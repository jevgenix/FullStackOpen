const FilterForm = ({ onChange }) => {
  return (
    <form>
      <div>
        filter shown with <input onChange={onChange} />
      </div>
    </form>
  );
};

export default FilterForm;
