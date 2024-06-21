import React from "react";
import { Link } from "react-router-dom";
import { BsFillBriefcaseFill } from "react-icons/bs"; // Example icon, replace with appropriate one
import "./style.css";

const JobCard = (props) => {
  const { jobDetails } = props;
  const { position, company, location, agoTime, jobUrl, companyLogo } = jobDetails;

  return (
    <div className="job-card">
      <div className="job-image">
        <img src={companyLogo} alt={company} className="company-logo" />
      </div>
      <div className="job-details">
        <p className="job-position">
          Role: <b>{position}</b>
        </p>
        <p className="job-company">
          Company: <b>{company}</b>
        </p>
        <p className="job-location">
          Location: <b>{location}</b>
        </p>
        <p className="job-posted-time">Posted {agoTime}</p>
        <Link className="apply-button" to={jobUrl} target="_blank">
          Apply Now <BsFillBriefcaseFill className="icon" />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
