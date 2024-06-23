import "./style.css";
import LeaderboardTable from "../../components/LeaderboardTable";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../api/axiosConfig";
import jwtToken from "../../api/jwtToken";
import { ClipLoader } from "react-spinners";


function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => { 
    getData();
  }, []);

const getData = async () => {
    try {
      const response = await api.get("/leaderboard", {
        headers: {
          "Content-Type": "application/json",
          authorization:
            "Bearer " + jwtToken(),
        },
      });
      console.log(response.data);
      const sortedData = response.data.result;
      console.log(sortedData);
      setData(sortedData);
      
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (<>
   {loading ? (
        <div className="loading-container">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <>
<LeaderboardTable  data={data} onLoad={getData}/>
</>)}
  </>);
}

export default Leaderboard;
