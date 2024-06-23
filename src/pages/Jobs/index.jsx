import React, { useEffect, useState } from "react";
import JobCard from "../../components/JobCard";
import "./style.css"; 
import api from "../../api/axiosConfig";
import jwtToken from "../../api/jwtToken";
import { ClipLoader } from "react-spinners";

const Jobs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await api.get("/jobs", {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + jwtToken(),
        },
      });
      console.log(response.data);
      const sortedData = response.data;
      setData(sortedData);
      
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="jobs-container">
    {loading ? (
        <div className="loading-container">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <>
      <div className="jobs-content">
        <h1 className="jobs-heading">Apply for Jobs</h1>
        <hr className="divider" />
        {data && data.length === 0 ? (
          <p className="no-jobs-text">No jobs available</p>
        ) : (
          <div className="jobs-list">
            {data.map((job) => (
              <JobCard key={job.jobUrl} jobDetails={job} />
            ))}
          </div>
        )}
      </div>
      </>
      )}
    </div>
  );
};

export default Jobs;
