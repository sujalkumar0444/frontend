
import CourseCard from '../../components/CourseCard';
import './style.css'
const Courses = () => {
  const courses = [
    {
      title: 'React for Beginners',
      description: 'Learn the basics of React, including components, state, and props.',
      totalLessons: 10,
      completedLessons: 3,
    },
    {
      title: 'Advanced React',
      description: 'Dive deeper into React with hooks, context, and advanced patterns.',
      totalLessons: 15,
      completedLessons: 10,
    },
  ];

  return (
    <div className="coursesContainer">
      {courses.map((course, index) => (
        <CourseCard className="card"
          key={index}
          title={course.title}
          description={course.description}
          totalLessons={course.totalLessons}
          completedLessons={course.completedLessons}
        />
      ))}
    </div>
  );
};

export default Courses;
