import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8800",
});//http://localhost:8800
// https://scoretracking-vishnu.onrender.com

//when using https://scoretracking-vishnu.onrender.com ........
// for leaderboard(course and regular) use response.data , for localhost(lms) use response.data.result