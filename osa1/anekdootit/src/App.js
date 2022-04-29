import { useState } from "react";

const Button = ({ handleClick, name }) => (
  <button onClick={handleClick}>{name}</button>
);

const BestAnecdote = ({ anecdotes, points }) => {
  let index_of_anecdote;
  let index = 0;
  Object.keys(points).forEach((key) => {
    if (points[key] > index) {
      index_of_anecdote = key;
      index = points[key];
    }
  });

  if (index < 1) {
    return <p>No votes yet</p>;
  }
  return (
    <>
      <p>{anecdotes[index_of_anecdote]}</p>
      <p>has {index} votes</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  // use state
  const [selected, setSelected] = useState(0);

  // create array of points with starting value of 0 and last value of anecdotes.length
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  // set random value to useState
  const randomSelect = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  // add vote to selected anecdote
  const vote = () => {
    const votes = { ...points };
    votes[selected] += 1;
    setPoints(votes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={randomSelect} name="next anecdote" />
      <Button handleClick={vote} name="vote" />
      <h1>Anecdote with most votes</h1>
      <BestAnecdote anecdotes={anecdotes} points={points} />
    </div>
  );
};

export default App;
