import { useState, useEffect } from "react";
import ContestItem from "../../components/ContestsCard";
import "./style.css";
import api from "../../api/axiosConfig";
import jwtToken from "../../api/jwtToken";
import { ClipLoader } from "react-spinners";

const Contests = () => {
    const [contestsList, setData] = useState(null); 
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     getData();
    // }, []);

    // This api endpoint is not hosted yet
    // const getData = async () => {
    //     try {
    //         const response = await api.get("/contests", {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 authorization: "Bearer " + jwtToken,
    //             },
    //         });
    //         console.log(response.data);
    //         const sortedData = response.data;
    //         console.log(sortedData);
    //         setData(sortedData);
    //     } catch (error) {
            
    //         console.log(error);
    //     }
    //     setLoading(false);
    // };

    const list = {
            "Ongoing Contests": [
              {
                contest: "Starters 131",
                host: "codechef.com",
                duration: "2 hours",
                start: "2024-04-24 20:00:00",
                end: "2024-04-24 22:00:00",
                href: "https://www.codechef.com/START131",
              },
              {
                contest: "Educational Codeforces Round 164 (Rated for Div. 2)",
                host: "codeforces.com",
                duration: "2 hours",
                start: "2024-04-12 20:05:00",
                end: "2024-04-12 22:05:00",
                href: "https://codeforces.com/contests/1954",
              },
            ],
            "upcoming Contests": [
              {
                contest: "Codeforces Global Round 25",
                host: "codeforces.com",
                duration: "3 hours",
                start: "2024-04-06 20:05:00",
                end: "2024-04-06 23:05:00",
                href: "https://codeforces.com/contests/1951",
              },
              {
                contest: "Weekly Contest 392",
                host: "leetcode.com",
                duration: "1 hours",
                start: "2024-04-07 08:00:00",
                end: "2024-04-07 09:30:00",
                href: "https://leetcode.com/contest/weekly-contest-392",
              },
              {
                contest: "Educational Codeforces Round 164 (Rated for Div. 2)",
                host: "codeforces.com",
                duration: "2 hours",
                start: "2024-04-12 20:05:00",
                end: "2024-04-12 22:05:00",
                href: "https://codeforces.com/contests/1954",
              },
              {
                contest: "Starters 131",
                host: "codechef.com",
                duration: "2 hours",
                start: "2024-04-24 20:00:00",
                end: "2024-04-24 22:00:00",
                href: "https://www.codechef.com/START131",
              },
              {
                contest:
                  "2023 Post World Finals Online ICPC Challenge powered by Huawei",
                host: "codeforces.com",
                duration: "14 days",
                start: "2024-05-06 20:30:00",
                end: "2024-05-20 20:30:00",
                href: "https://codeforces.com/contests/1953",
              },
              {
                contest: "Starters 138",
                host: "codechef.com",
                duration: "2 hours",
                start: "2024-06-12 20:00:00",
                end: "2024-06-12 22:00:00",
                href: "https://www.codechef.com/START138",
              },
            ],
          };//temporary data

          useEffect(() => {
          setData(list);
            setLoading(false);
            }, []);//temporary data

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
