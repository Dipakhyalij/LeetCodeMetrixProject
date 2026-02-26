import React, { useState } from "react";
import { getData } from "../API/api";
import './Dashboard.css'

function Dashboard() {
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {

  if (!username.trim()) {
    setError("Please enter a username");
    setData(null);
    return;
  }

  setLoading(true);
  setError("");

  try {
    const result = await getData(username);
    console.log(result)

    if (!result || result.status === "error") {
      throw new Error();
    }

    setData(result);

  } catch {
    setError("User not found");
    setData(null);
  } finally {
    setLoading(false);
  }
};




  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await getData();
  //     setData(result);
  //   };

  //   fetchData();
  // }, []);

//   useEffect(() => {
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const result = await getData();
//       setData(result);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []);


if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading Data...</p>
      </div>
    );
  }

  let acceptanceRate = null;

if (data?.matchedUserStats) {
  const accepted = data.matchedUserStats.acSubmissionNum[0].count;
  const total = data.matchedUserStats.totalSubmissionNum[0].count;

  acceptanceRate = total
    ? ((accepted / total) * 100).toFixed(2)
    : 0;
}

  return (
    <>
    <div className="container">
      
        <h1>LeetMetric</h1>

        <div className="user-container">
            <p>Enter your username below:</p>
            <div className="user-input-container">
<input
  type="text"
  placeholder="Enter username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>
                <button onClick={handleSearch}>
  Search
</button>
            </div>
        </div>
        {data && (
  <div className="profile-header">

    <div className="profile-left">
      <div className="avatar">
        {username.charAt(0).toUpperCase()}
      </div>

      <div>
        <h2>{username}</h2>
        <p>LeetCode Profile</p>
      </div>
    </div>

    <div className="profile-stats">

      <div>
        <span>Ranking</span>
        <strong>{data.ranking}</strong>
      </div>

      <div>
        <span>Acceptance</span>
        <strong>{acceptanceRate ? acceptanceRate + "%" : "N/A"}</strong>
      </div>

      <div>
        <span>Solved</span>
        <strong>{data.totalSolved}</strong>
      </div>

    </div>

  </div>
)}


        <div className="stats-container">
          {error && (
  <p style={{ color: "red", marginTop: "10px" }}>
    {error}
  </p>
)}

            
            <div className="progress">

                <div className="progress-item">
                    <div className="easy-progress circle">
                      
                        <span id="easy-label"></span>
                        <p>Easy</p>
                        {data && (
  <p>{data.easySolved}/{data.totalEasy}</p>
)}
                    </div>
                </div>

                <div className="progress-item ">
                    <div className="medium-progress circle">
                        <span id="medium-label"></span>
                        <p>Medium</p>
                         {data && (
  <p>{data.mediumSolved}/{data.totalMedium}</p>
)}
                    </div>
                </div>

                <div className="progress-item ">
                    <div className="hard-progress circle">
                        <span id="hard-label"></span>
                        <p>Hard</p>
                         {data && (
  <p>{data.hardSolved}/{data.totalHard}</p>
)}
                    </div>
                </div>

            </div>

            <div className="stats-cards">
              {data && (
  <div className="stats-cards">

    <div className="card">
      <h3>Total Solved</h3>
      <p>{data.totalSolved}</p>
    </div>

    <div className="card">
      <h3>Acceptance Rate</h3>
      <p>{acceptanceRate ? acceptanceRate + "%" : "N/A"}</p>
    </div>

    <div className="card">
      <h3>Ranking</h3>
      <p>{data.ranking}</p>
    </div>

    <div className="card">
      <h3>Contribution</h3>
      <p>{data.contributionPoint
}</p>
    </div>

  </div>
)}

        
            </div>

        </div>
        <footer className="dashboard-footer">
  <p>
    Created By Dipak❤️• LeetMetric Dashboard
  </p>
</footer>
    </div>

      {/* <h1>Hello data are rendered</h1>

      {data && <p>Total solved: {data.totalSolved}</p>} */}
    </>
  );
}

export default Dashboard;
