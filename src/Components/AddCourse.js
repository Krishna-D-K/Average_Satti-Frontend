import axios from 'axios';
import React, { useState } from 'react'
import Apiservice from "../Apiservice";

export default function AddCourse(props) {

    const user = JSON.parse(localStorage.getItem("user"));
    const [courseName, setCourseName] = useState(null);
    const [courseCode, setCourseCode] = useState(null);
    const [semester, setSemester] = useState(null);
    const [credits, setCredits] = useState(null);
    const [professor1, setProfessor1] = useState(null);
    const [professor2, setProfessor2] = useState(null);

    const resetData =()=>{
        setCourseCode(null);
        setCourseName(null);
        setCredits(null);
        setProfessor1(null);
        setProfessor2(null);
        setSemester(null);
        props.exit();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(user){
            try {
                const response = await axios.post(Apiservice + "/courses/", {
                    semester: semester,
                    courseName: courseName,
                    courseCode: courseCode,
                    credits: credits,
                    professor1: professor1,
                    professor2: professor2
                }, {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                })
                // console.log(response);
            } catch (err) {
                console.log(err);
            }
            resetData();
        }
    }

    return (
        <>
            <div style={{ "width": "60%", "margin": "0 auto", "color": "rgba(253, 160, 133, 1)" }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Course Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ex. Analog Electronics" value={courseName} onChange={e => setCourseName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Course Code</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ex. EE21201" value={courseCode} onChange={e => setCourseCode(e.target.value)} required />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Semester</label>
                        <select class="form-control" id="exampleFormControlSelect1" onChange={e => setSemester(e.target.value)} required>
                            <option value="">-SELECT-</option>
                            <option>FIRST</option><option>SECOND</option>
                            <option>THIRD</option><option>FOURTH</option>
                            <option>FIFTH</option><option>SIXTH</option>
                            <option>SEVENTH</option><option>EIGHTH</option>
                            <option>NINTH</option><option>TENTH</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Credits</label>
                        <select class="form-control" id="exampleFormControlSelect1" onChange={e => setCredits(e.target.value)} required>
                            <option value="">-SELECT-</option>
                            <option>1</option><option>2</option>
                            <option>3</option><option>4</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Professor 1</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ex. Prof. Amit Patra" value={professor1} onChange={e => setProfessor1(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Professor 2</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ex. Prof. Amit Patra" value={professor2} onChange={e => setProfessor2(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        </>
    )
}
