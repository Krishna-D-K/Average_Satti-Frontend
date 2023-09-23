import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Apiservice from '../Apiservice';
import Loader from '../Components/Loader';
import "../Styles/ContributorStyle.css";

export default function Contributors() {

  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      await axios.get(Apiservice + "/contributors").then((Res) => {
        setData(Res.data);
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="contributor-container">
        <div className="contributorHeading">
          <h1>Contributors</h1>
          <hr/>
        </div>
        <div className="contributor-message">
          A special thanks to all the contributors who had contributed content to this site. <br />
          Without y'all, it wouldn't have been as good as it is now. <span style={{ "color": "red" }}>&#10084;</span>
        </div>
        <div style={{ "display": "flex", "justifyContent": "center","margin":"0 auto", "fontSize": "1.2rem", "width": "80%" }}>
          {data !== null && <table className="rwd-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Contributions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((val, index) => {
                return (
                  <tr key={index}>
                    <td data-th="S.No" style={{ "color": "wheat", "textAlign": "center" }}>{index + 1}</td>
                    <td data-th="Name">{val.name}</td>
                    <td data-th="Roll No">{val.rollNo}</td>
                    <td data-th="Contribution">{val.contributions}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>}
          {data === null && <Loader />}
        </div>
      </div>
    </>
  )
}
