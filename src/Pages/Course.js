import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Apiservice from '../Apiservice';
import Cards from '../Components/Cards';
import "../Styles/CourseStyle.css";

export default function Course() {
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");
  const [data, setData] = useState(null);

  useEffect(()=>{
    try{
      axios.get(Apiservice + "/courses/").then((response)=>{
        setData(response.data);
      }).then((res)=>{

      })
    }catch(err){
      console.log(err);
    }
  }, [])

  return (
    <div className='course-container'>
      <h1 style={{ "textAlign": "center" }}>COURSES</h1>
      <hr style={{ "height": "0.2rem", "width": "90%", "backgroundColor": "#ffffff42", "borderRadius": "0.1rem" }} />
      <div className="courses-filter">
        <div><h5 style={{"display": "inline", "color": "#ff8d1e"}}>&emsp;&emsp;FIND BY : </h5>
          <select name="" id="" style={{"margin": "0.5rem", "padding": "0.3rem", "borderRadius": "0.35rem"}}>
            <option value="">-YEAR-</option>
            <option value="FIRST">FIRST</option>
            <option value="SECOND">SECOND</option>
            <option value="THIRD">THIRD</option>
            <option value="FOURTH">FOURTH</option>
            <option value="FIFTH">FIFTH</option>
          </select>
          <select id="exampleFormControlSelect1" value={semester} onChange={e => setSemester(e.target.value)} style={{"margin": "0.5rem", "padding": "0.3rem", "borderRadius": "0.35rem"}} required>
            <option value="">-SEMESTER-</option>
            <option value="FIRST">FIRST</option><option value="SECOND">SECOND</option>
            <option value="THIRD">THIRD</option><option value="FOURTH">FOURTH</option>
            <option value="FIFTH">FIFTH</option><option value="SIXTH">SIXTH</option>
            <option value="SEVENTH">SEVENTH</option><option value="EIGHTH">EIGHTH</option>
            <option value="NINTH">NINTH</option><option value="TENTH">TENTH</option>
          </select>
          <input type="text" placeholder='Course Name' value={course} onChange={e=> setCourse(e.target.value)} style={{"margin": "0.5rem", "padding": "0.3rem", "borderRadius": "0.35rem"}}/>
        </div>
      </div>
      <hr style={{ "height": "0.2rem", "width": "90%", "backgroundColor": "#ffffff42", "borderRadius": "0.1rem" }} />
      <div className='course-grid'>
        {data!==null && data.map((value, index)=>{
          return <><Cards data={value} index={index} user="default" /></>
        })}
      </div>
    </div>
  )
}