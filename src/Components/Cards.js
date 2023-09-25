import React, { useState } from 'react'
import Apiservice from "../Apiservice";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import "../Styles/CardsStyle.css";

export default function Cards(props) {
    const [confirmbox, setConfirmbox] = useState(false);
    const { user } = useAuthContext();
    let adminDisplay = "inline";
    const deleteCourse = async (id) => {
        if (user) {
            // console.log(id);
            try {
                const response = await axios.delete(Apiservice + "/courses/" + id, {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });
                setConfirmbox(false);
                props.refresh();
                // console.log(response);
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
                <div className="card card1">
                    <div className="card-header">{data.semester} SEMESTER</div>
                    <div className="card-body card-body1">
                        <h5 className="card-title">{data.courseCode} : {data.courseName}</h5>
                        {confirmbox === false && <div>
                            <p className="card-text">Credits : {data.credits} &emsp; <span>{data.professor1} &emsp; {data.professor2}</span></p>
                            <button className="btn btn-primary" style={{ "margin": "0 0.4rem" }} onClick={()=>props.details(data.courseCode)}>Details <i className="fa-solid fa-angles-right" /> </button>
                            <button className="btn btn-warning" style={{ "margin": "0 0.4rem", "display": `${adminDisplay}` }} onClick={props.edit}>Edit <i className="fa-solid fa-pen-to-square" /> </button>
                            <button className="btn btn-danger" style={{ "margin": "0 0.4rem", "display": `${adminDisplay}` }} onClick={() => setConfirmbox(true)}>Delete <i className="fa-solid fa-trash-can" /> </button>
                        </div>}
                        {confirmbox === true && <>
                            <h4 style={{ "display": "inline" }}><strong>Are you sure??</strong></h4> &emsp;
                            <button className="btn btn-success" style={{ "margin": "0 0.4rem" }} onClick={() => {deleteCourse(data._id)}}>Yes <i className="fa-solid fa-square-check fa-lg" /> </button> &emsp;
                            <button className="btn btn-danger" style={{ "margin": "0 0.4rem" }} onClick={() => setConfirmbox(false)}>No <i className="fa-solid fa-square-xmark fa-lg" /> </button>
                        </>}
                    </div>
                </div> <br />
            </>
        )
    }
    else {
        return (
            <>
                <div className="card cards">
                    <div className="card-header">
                        <span className='card-semester'>{data.semester} SEMESTER</span>
                        <Link to={link}><button className="btn btn-primary" style={{ "margin": "0 0.4rem" }}>Details <i className="fa-solid fa-angles-right" /> </button></Link></div>
                    <div className="card-body cards-body">
                        <h5 className="card-titles">{data.courseCode} : {data.courseName}</h5>
                        <p className="card-texts">Credits : {data.credits}</p>
                        <p className="card-texts">{data.professor1}</p>
                        <p className="card-texts">{data.professor2}</p>
                    </div>
                </div> <br />
            </>
        )
    }
}
