import { useState, useEffect } from "react";
import ContestItem from "../../components/ContestsCard";
import "./style.css";
import api from "../../api/axiosConfig";
import jwtToken from "../../api/jwtToken";
import { ClipLoader } from "react-spinners";

const Contests = () => {
    const [contestsList, setData] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    // This api endpoint is not hosted yet
    const getData = async () => {
        try {
            const response = await api.get("/contests", {
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + jwtToken(),
                },
            });
            console.log(response.data);
            const sortedData = response.data;
            console.log(sortedData);
            setData(sortedData);
        } catch (error) {
            
            console.log(error);
            
        }
        setLoading(false);
    };


    return (
        <div className="contests-div">
        {loading ? (
                        <div className="loading-container">
                            <ClipLoader size={50} color={"#123abc"} loading={loading} />
                        </div>
                    ) : (
                        <>
            <div className="contest-card">
                <div className="up-on-card">
                    
                            <h1 className="ongoingText">Ongoing Contests</h1>
                            <hr />
                            {contestsList && contestsList["Ongoing Contests"].length === 0 ? (
                                <p className="no-ongoing-text">No Ongoing Contests!</p>
                            ) : (
                                <ul className="ul-contest">
                                    {contestsList && contestsList["Ongoing Contests"].map((eachContest) => (
                                        <ContestItem
                                            key={eachContest.href}
                                            contestDetails={eachContest}
                                        />
                                    ))}
                                </ul>
                            )}
                       
                </div>

                <div className="up-on-card">
                    <h1 className="ongoingText">Upcoming Contests</h1>
                    <hr />
                    {contestsList && contestsList["upcoming Contests"].length === 0 ? (
                        <p className="no-ongoing-text">No Upcoming Contests!</p>
                    ) : (
                        <ul className="ul-contest">
                            {contestsList && contestsList["upcoming Contests"].map((eachContest) => (
                                <ContestItem
                                    key={eachContest.href}
                                    contestDetails={eachContest}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            </>
        )}
        </div>
    );
};

export default Contests;
