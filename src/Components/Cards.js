import React, { useState } from 'react'
import Apiservice from "../Apiservice";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Cards(props) {
    const [confirmbox, setConfirmbox] = useState(false);
    const { user } = useAuthContext();
    let adminDisplay = "inline";
    console.log(adminDisplay)
    const deleteCourse = async (id) => {
        if (user) {
            try {
                const response = await axios.delete(Apiservice + "/courses/" + id, {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });
                setConfirmbox(false);
                props.refresh();
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        }

    };
    const data = props.data;
    let link = `/content/${data.courseCode}`;

    if (props.user !== "default") {
        return (
            <>
                <div className="card w-75" style={{ "backgroundColor": "#b79f9f", "width": "90%", "margin": "0 auto", "borderRadius": "0.5rem", "display": "flex" }}>
                    <div className="card-header">{data.semester} SEMESTER</div>
                    <div className="card-body">
                        <h5 className="card-title">{data.courseCode} : {data.courseName}</h5>
                        {confirmbox === false && <>
                            <p className="card-text">Credits : {data.credits} &emsp; <span>{data.professor1} &emsp; {data.professor2}</span></p>
                            <button className="btn btn-primary" style={{ "margin": "0 0.4rem" }}>Details <i class="fa-solid fa-angles-right" /> </button>
                            <button className="btn btn-warning" style={{ "margin": "0 0.4rem", "display": `${adminDisplay}` }} onClick={props.edit}>Edit <i class="fa-solid fa-pen-to-square" /> </button>
                            <button className="btn btn-danger" style={{ "margin": "0 0.4rem", "display": `${adminDisplay}` }} onClick={() => setConfirmbox(true)}>Delete <i class="fa-solid fa-trash-can" /> </button>
                        </>}
                        {confirmbox === true && <>
                            <h4 style={{ "display": "inline" }}><strong>Are you sure??</strong></h4> &emsp;
                            <button className="btn btn-success" style={{ "margin": "0 0.4rem" }} onClick={() => deleteCourse(data.id)}>Yes <i class="fa-solid fa-square-check fa-lg" /> </button> &emsp;
                            <button className="btn btn-danger" style={{ "margin": "0 0.4rem" }} onClick={() => setConfirmbox(false)}>No <i class="fa-solid fa-square-xmark fa-lg" /> </button>
                        </>}
                    </div>
                </div> <br />
            </>
        )
    }
    else {
        return (
            <>
                <div className="card" style={{ "backgroundColor": "#b79f9f", "width": "47%", "margin": "0.2rem 0.2rem", "borderRadius": "0.5rem", "display": "flex"
                }}>
                    <div className="card-header">{data.semester} SEMESTER</div>
                    <div className="card-body">
                        <h5 className="card-title">{data.courseCode} : {data.courseName}</h5>
                        <p className="card-text">Credits : {data.credits} &emsp; <span>{data.professor1} &emsp; {data.professor2}</span></p>
                        <Link to={link}><button className="btn btn-primary" style={{ "margin": "0 0.4rem" }}>Details <i class="fa-solid fa-angles-right" /> </button></Link>
                    </div>
                </div> <br />
            </>
        )
    }
}
