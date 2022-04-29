import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header kurssi={course.name} />
          <Content courses={course.parts} />
          <Total courses={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;
