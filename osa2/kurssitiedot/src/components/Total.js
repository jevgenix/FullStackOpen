const Total = ({ courses }) => {
  const total = courses.reduce((acc, current) => {
    return acc + current.exercises;
  }, 0);

  return (
    <strong>
      <p>Number of exercises {total} </p>
    </strong>
  );
};

export default Total;
