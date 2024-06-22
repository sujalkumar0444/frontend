import PropTypes from 'prop-types';
import './style.css';
import CircularProgressWithLabel from '../CircularProgressWithLabel';

const CourseCard = ({ title, description, totalLessons, completedLessons }) => {
  const progress = (completedLessons / totalLessons) * 100;
  console.log(progress);

  const handleButtonClick = () => {
    // Handle the button click, for example, navigate to the course page
    console.log('Go to course clicked');
  };

  return (
    <div className="card">
      <h2 className="title">{title}</h2>
      <p className="description">{description}</p>
      <div className="lessonsInfo">
        <span className="totalLessons">Total Lessons: {totalLessons}</span>
        <span className="completedLessons">Completed Lessons: {completedLessons}</span>
      </div>
      <div className="progressContainer">
        <button className="courseButton" onClick={handleButtonClick}>Go to Course</button>
        <CircularProgressWithLabel value={parseInt(progress)} />
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  totalLessons: PropTypes.number.isRequired,
  completedLessons: PropTypes.number.isRequired,
};

export default CourseCard;
