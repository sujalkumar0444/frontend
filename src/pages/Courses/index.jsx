import { ClipLoader } from "react-spinners";
import api from "../../api/axiosConfig";
import jwtToken from "../../api/jwtToken";
import CourseCard from '../../components/CourseCard';
import './style.css'
import { useEffect,useState } from "react";




const Courses = () => {

  
  const [loading, setLoading] = useState(true);
  const [courses, setData] = useState([]);
  // useEffect(() => { 
  //   getData();
  // }, []);

  // const getData = async () => {
  //   try {
  //     const response = await api.get("/user/courses", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization:
  //           "Bearer " + jwtToken,
  //       },
  //     });
  //     console.log(response.data);
  //     const sortedData = response.data;
  //     setData(sortedData);
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLoading(false);
  // };..........................//fetch data from the api

  const temp = [
    {
      courseid: "CS101",
      title: 'React for Beginners',
      description: 'Learn the basics of React, including components, state, and props.',
      coursetags: [
            "Programming",
            "Computer Science"
        ],
      totalLessons: 10,
      completedLessons: 3,//should fetch from the progress api, this is temporary
      modules_count: 5
    },
    {
      courseid: "cs444",
      title: 'Advanced React',
      description: 'Dive deeper into React with hooks, context, and advanced patterns.',
      coursetags: [],
      totalLessons: 15,
      completedLessons: 10,
      modules_count: 1
    },
  ];//temporary data


  useEffect(() => { 
      getTemp();
    }, []);//temporary function to fetch data

    const getTemp = async () => {
      setData(temp);
      setLoading(false);
    }//temporary function to fetch data
  

  return (

    <>{loading ? (
      <div className="loading-container">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    ) : (
      
    <div className="coursesContainer">
      {courses.map((course,index) => (
        <CourseCard className="Coursecard"
          key={index}
          courseid={course.courseid}
          title={course.title}
          description={course.description}
          totalLessons={course.totalLessons}
          completedLessons={course.completedLessons}
          coursetags={course.coursetags}
        />
      ))}
    </div>
    )}
    </>
  );
};

export default Courses;
