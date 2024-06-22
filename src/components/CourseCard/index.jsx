import PropTypes from 'prop-types';
import './style.css';
import CircularProgressWithLabel from '../CircularProgressWithLabel';
import { Link } from 'react-router-dom';

const CourseCard = ({ courseid , title, description, totalLessons, completedLessons, coursetags }) => {
  const progress = (completedLessons / totalLessons) * 100;
  console.log(progress);

  return (
    <div className="coursecard">
      <h2 className="title">{title}</h2>
      <p className="description">{description}</p>
      <div className="lessonsInfo">
        <span className="totalLessons">Total Lessons: {totalLessons}</span>
        <span className="completedLessons">Completed Lessons: {completedLessons}</span>
      </div>
      {/* <div className="tags">
        {coursetags && coursetags.length > 0 ? (
          coursetags.map((tag, index) => (
            <span key={index} className="tag">{tag}, </span>
          ))
        ) : (
          <span className="noTags">No Tags Available</span>
        )}
      {/* </div> */}{/*commented out the tags section */}
      <div className="progressContainer">
      <Link to={`/course/${courseid}`} className="courseButton">Go to Course</Link>
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
  coursetags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CourseCard;
