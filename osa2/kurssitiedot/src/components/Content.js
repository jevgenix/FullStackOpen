import Part from "./Part";

const Content = ({ courses }) => {
  return (
    <div>
      {courses.map((course, i) => (
        <Part key={i} part={course.name} exercises={course.exercises} />
      ))}
    </div>
  );
};

export default Content;
