import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Apiservice from '../Apiservice';
import Loader from '../Components/Loader';
import "../Styles/CourseStyle.css";
import { Link } from 'react-router-dom';

export default function Course() {
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      axios.get(Apiservice + "/courses/").then((response) => {
        console.log(response.data);
        setData(response.data);
      }).then((res) => {

      })
    } catch (err) {
      console.log(err);
    }
  }, [])

  return (
    <div className='course-container'>
      <div className="courseHeading">
        <h1>Courses</h1>
        <hr/>
      </div>
      <div className="courses-filter">
        <div><h5>&emsp;&emsp;FILTER : </h5>
          <select id="exampleFormControlSelect1" value={semester} onChange={e => setSemester(e.target.value)} required>
            <option value="">-semester-</option>
            <option value="FIRST">First</option><option value="SECOND">Second</option>
            <option value="THIRD">Third</option><option value="FOURTH">Fourth</option>
            <option value="FIFTH">Fifth</option><option value="SIXTH">Sixth</option>
            <option value="SEVENTH">Seventh</option><option value="EIGHTH">Eighth</option>
            <option value="NINTH">Ninth</option><option value="TENTH">Tenth</option>
          </select>
          <input type="text" placeholder='Course Name' id="courses-filter-input" value={course} onChange={e => { setCourse(e.target.value) }} />
        </div>
      </div>
      <div className='course-grid'>
        <table className="rwd-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Semester</th>
              <th>Code</th>
              <th>Title</th>
              <th>Credits</th>
              <th>Professors</th>
            </tr>
          </thead>
          <tbody>
            {data !== null && !course && !semester && data.map((val, index) => {
              return <tr key={index}>
                <td data-th="S.No" style={{ "color": "wheat" }}>{index + 1}</td>
                <td data-th="Semester">{val.semester}</td>
                <td data-th="Code" className='course-link'><Link to={`/content/${val.courseCode}`}>{val.courseCode}</Link></td>
                <td data-th="Title">{val.courseName}</td>
                <td data-th="Credits">{val.credits}</td>
                <td data-th="Professors">{val.professor1}{val.professor2 && `, ${val.professor2}`}</td>
              </tr>
            })}
            {data !== null && !course && semester && data.filter((value) => value.semester === semester).map((val, index) => {
              return <tr key={index}>
                <td data-th="S.No" style={{ "color": "wheat" }}>{index + 1}</td>
                <td data-th="Semester">{val.semester}</td>
                <td data-th="Code" className='course-link'><Link to={`/content/${val.courseCode}`}>{val.courseCode}</Link></td>
                <td data-th="Title">{val.courseName}</td>
                <td data-th="Credits">{val.credits}</td>
                <td data-th="Professors">{val.professor1}{val.professor2 && `, ${val.professor2}`}</td>
              </tr>
            })}
            {data !== null && course && !semester && data.filter((value) => {
              if (value.courseName.toLowerCase().includes(course.toLowerCase())) {
                return value;
              }
            }).map((val, index) => {
              return <tr key={index}>
                <td data-th="S.No" style={{ "color": "wheat" }}>{index + 1}</td>
                <td data-th="Semester">{val.semester}</td>
                <td data-th="Code"><Link to={`/content/${val.courseCode}`}>{val.courseCode}</Link></td>
                <td data-th="Title">{val.courseName}</td>
                <td data-th="Credits">{val.credits}</td>
                <td data-th="Professors">{val.professor1}{val.professor2 && `, ${val.professor2}`}</td>
              </tr>
            })}
            {data !== null && course && semester && data.filter((value) => {
              if (value.courseName.toLowerCase().includes(course.toLowerCase()) && value.semester === semester) {
                return value;
              }
            }).map((val, index) => {
              return <tr key={index}>
                <td data-th="S.No" style={{ "color": "wheat" }}>{index + 1}</td>
                <td data-th="Semester">{val.semester}</td>
                <td data-th="Code"><Link to={`/content/${val.courseCode}`}>{val.courseCode}</Link></td>
                <td data-th="Title">{val.courseName}</td>
                <td data-th="Credits">{val.credits}</td>
                <td data-th="Professors">{val.professor1}{val.professor2 && `, ${val.professor2}`}</td>
              </tr>
            })}
            {data === null && <Loader />}
          </tbody>
        </table>
      </div>
    </div>
  )
}
