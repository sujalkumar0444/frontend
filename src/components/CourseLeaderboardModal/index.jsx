import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './style.css';
import CourseLeaderboardTable from '../CourseLeaderboardTable';
import api from '../../api/axiosConfig';
import jwtToken from "../../api/jwtToken";

function CourseLeaderboardModal(props) {
  const [lgShow, setLgShow] = useState(false);
  const [data, setData] = useState([]);

        useEffect(() => {
            const CourseLeaderboardData = async () => {
              try {
                const response = await api.get(`/course/leaderboard/${props.courseid}`, {
                  headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + jwtToken(),
                  },
                });
        
                if (response.status === 200) {
                  setData(response.data.result);
                  console.log(response.data);
                } else {
                  console.error("Failed to fetch course leaderboard details");
                }
              } catch (error) {
                console.error("Error fetching course leaderboard details:", error);
              }
            };
        
            CourseLeaderboardData();
          }, []);

  return (
    <>
      <Button className='leaderbutton' onClick={() => setLgShow(true)}>Leaderboard</Button>

      <Modal
        size="xl"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        style = {{marginTop: "5%"}}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            LeaderBoard
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <CourseLeaderboardTable data={data}/>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CourseLeaderboardModal;