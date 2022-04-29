import Course from "./components/Course";

const App = ({ courses }) => {
  return (
    <div>
      <Course courses={courses} />
    </div>
  );
};

export default App;
