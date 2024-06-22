import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';
import jwtToken from "../../api/jwtToken";
import './style.css';
import CourseSidebar from '../../components/CourseSidebar';
import { ClipLoader } from "react-spinners";

export default function Course() {
    const { courseid } = useParams(); // Destructure once at the top level
    console.log(courseid);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`fetch/course/${courseid}`, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "Bearer " + jwtToken,
                    },
                });
                console.log(response.data);
                const sortedData = response.data.modules;
                console.log(sortedData);//add a feature to fetch course name also ... /missing
                setData(sortedData);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };

        getData(); 
    }, [courseid]); 

    return (
        <>
            {loading ? (
                <div className="loading-container">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
            ) : (
                <div>
                    <CourseSidebar modules={data} courseid={courseid} />
                </div>
            )}
        </>
    );
}
