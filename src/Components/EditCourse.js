import axios from 'axios';
import React, { useState } from 'react'
import Apiservice from '../Apiservice';
import { useAuthContext } from '../hooks/useAuthContext';

export default function EditCourse(props) {
    const data = props.data;
    const [courseName, setCourseName] = useState(data.courseName);
    const [courseCode, setCourseCode] = useState(data.courseCode);
    const [semester, setSemester] = useState(data.semester);
    const [credits, setCredits] = useState(data.credits);
    const [professor1, setProfessor1] = useState(data.professor1);
    const [professor2, setProfessor2] = useState(data.professor2);
    const {user} = useAuthContext();

    const resetData =()=>{
        setCourseCode(data.courseCode);
        setCourseName(data.courseName);
        setCredits(data.credits);
        setProfessor1(data.professor1);
        setProfessor2(data.professor2);
        setSemester(data.semester);
        props.refresh();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(user){
            try {
                const response = await axios.patch(Apiservice + "/courses/" + data._id, {
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
            <h4 style={{ "textAlign": "center", "color": "#ff8d1e" }}>Edit Course</h4> <br />
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
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Semester</label>
                        <select className="form-control" id="exampleFormControlSelect1" value={semester} onChange={e => setSemester(e.target.value)} required>
                            <option value="">-SELECT-</option>
                            <option value="FIRST">FIRST</option><option value="SECOND">SECOND</option>
                            <option value="THIRD">THIRD</option><option value="FOURTH">FOURTH</option>
                            <option value="FIFTH">FIFTH</option><option value="SIXTH">SIXTH</option>
                            <option value="SEVENTH">SEVENTH</option><option value="EIGHTH">EIGHTH</option>
                            <option value="NINTH">NINTH</option><option value="TENTH">TENTH</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Credits</label>
                        <select className="form-control" id="exampleFormControlSelect1" value={credits} onChange={e => setCredits(e.target.value)} required>
                            <option value="">-SELECT-</option>
                            <option value="1">1</option><option value="2">2</option>
                            <option value="3">3</option><option value="4">4</option>
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
                    <button type="submit" className="btn btn-primary" >Edit</button>
                </form>
            </div>
        </>
    )
}
