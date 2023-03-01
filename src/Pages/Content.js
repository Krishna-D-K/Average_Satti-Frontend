import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Apiservice from '../Apiservice';
import "../Styles/ContentStyle.css";

export default function Content() {
    const { code } = useParams();
    const [details, setDetails] = useState(null);
    const [data, setData] = useState(null);

    function accordian(name) {
        var acc = document.getElementById(name);
        acc.classList.toggle("accordion-active");
        var panel = acc.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }

    const getData = async () => {
        try {
            await axios.get(Apiservice + `/courses/${code}`).then((response) => {
                setDetails(response.data[0]);
            })
            await axios.get(Apiservice + `/content/${code}`).then((res) => {
                setData(res.data)
            })
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <div className="content-container">
                <h2 style={{ "textAlign": "center" }}>COURSE CONTENT</h2>
                <hr style={{ "height": "0.2rem", "width": "90%", "backgroundColor": "#ffffff42", "borderRadius": "0.1rem" }} />
                <div className="content-details">
                    {details !== null && (<>
                        <span style={{ "color": "#ff8d1e", "fontWeight": "" }}>Course Code : </span><span style={{ "color": "wheat" }}>{details.courseCode} &emsp;</span>
                        <span style={{ "color": "#ff8d1e", "fontWeight": "" }}>Course Name : </span><span style={{ "color": "wheat" }}>{details.courseName} &emsp;</span>
                        <span style={{ "color": "#ff8d1e", "fontWeight": "" }}>Semester : </span><span style={{ "color": "wheat" }}>{details.semester} &emsp;</span>
                        <span style={{ "color": "#ff8d1e", "fontWeight": "" }}>Credits : </span><span style={{ "color": "wheat" }}>{details.credits} &emsp;</span>
                    </>
                    )}
                </div>
                <hr style={{ "height": "0.2rem", "width": "90%", "backgroundColor": "#ffffff42", "borderRadius": "0.1rem" }} />
                <div className="content-data">
                    <button class="accordion" id="Assingment" onClick={() => accordian("Assingment")}>Assignments</button>
                    <div class="panel">
                        <ul class="list-group list-group-flush" style={{ "backgroundColor": "#8080805e" }}>
                            {data !== null && data.filter(element => element.type === "Assingment").map((element, index) => {
                                return (
                                    <li className="list-group-item" style={{ "padding": "0.5rem 1rem 0 1rem", "fontSize": "1.3rem", "backgroundColor": "#454545" }}>
                                        <p style={{ "float": "left", "color": "#6fb7ff" }}>
                                            {element.description}
                                        </p>
                                        <div className="accordion-icons" style={{ "float": "right" }}>
                                            <a href={element.publicUrl} target="_blank" rel='noreferrer'><i className="fa-solid fa-arrow-up-right-from-square" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Open"></i></a>
                                            <a href={element.downloadUrl} rel='noreferrer'><i class="fa-solid fa-cloud-arrow-down" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Download"></i></a>
                                            <i className="fa-solid fa-info" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Details"></i>
                                            <i className="fa-solid fa-face-frown" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Unhappy ??"></i>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        {details !== null && <div style={{ "padding": "0.9rem 1rem" }}> <br /><br /><span style={{ "color": "wheat" }}>That's All!!</span>&emsp;<Link to={`/contribute/${details.courseCode}`}>Contribute</Link></div>}
                    </div>
                    <button class="accordion" id="Test" onClick={() => accordian("Test")}>Tests</button>
                    <div class="panel">
                        <ul class="list-group list-group-flush" style={{ "backgroundColor": "#8080805e" }}>
                            {data !== null && data.filter(element => element.type === "Test").map((element, index) => {
                                return (
                                    <li className="list-group-item" style={{ "padding": "0.5rem 1rem 0 1rem", "fontSize": "1.3rem", "backgroundColor": "#454545" }}>
                                        <p style={{ "float": "left", "color": "#6fb7ff" }}>
                                            {element.description}
                                        </p>
                                        <div className="accordion-icons" style={{ "float": "right" }}>
                                            <a href={element.publicUrl} target="_blank" rel='noreferrer'><i className="fa-solid fa-arrow-up-right-from-square" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Open"></i></a>
                                            <a href={element.downloadUrl} rel='noreferrer'><i class="fa-solid fa-cloud-arrow-down" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Download"></i></a>
                                            <i className="fa-solid fa-info" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Details"></i>
                                            <i className="fa-solid fa-face-frown" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Unhappy ??"></i>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        {details !== null && <div style={{ "padding": "0.9rem 1rem" }}> <br /><br /><span style={{ "color": "wheat" }}>That's All!!</span>&emsp;<Link to={`/contribute/${details.courseCode}`}>Contribute</Link></div>}
                    </div>
                    <button class="accordion" id="Reference Material" onClick={() => accordian("Reference Material")}>Reference Material</button>
                    <div class="panel">
                        <ul class="list-group list-group-flush" style={{ "backgroundColor": "#8080805e" }}>
                            {data !== null && data.filter(element => element.type === "Reference Material").map((element, index) => {
                                return (
                                    <li className="list-group-item" style={{ "padding": "0.5rem 1rem 0 1rem", "fontSize": "1.3rem", "backgroundColor": "#454545" }}>
                                        <p style={{ "float": "left", "color": "#6fb7ff" }}>
                                            {element.description}
                                        </p>
                                        <div className="accordion-icons" style={{ "float": "right" }}>
                                            <a href={element.publicUrl} target="_blank" rel='noreferrer'><i className="fa-solid fa-arrow-up-right-from-square" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Open"></i></a>
                                            <a href={element.downloadUrl} rel='noreferrer'><i class="fa-solid fa-cloud-arrow-down" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Download"></i></a>
                                            <i className="fa-solid fa-info" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Details"></i>
                                            <i className="fa-solid fa-face-frown" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Unhappy ??"></i>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        {details !== null && <div style={{ "padding": "0.9rem 1rem" }}> <br /><br /><span style={{ "color": "wheat" }}>That's All!!</span>&emsp;<Link to={`/contribute/${details.courseCode}`}>Contribute</Link></div>}
                    </div>
                    <button class="accordion" id="Question Paper" onClick={() => accordian("Question Paper")}>Question Papers</button>
                    <div class="panel">
                        <ul class="list-group list-group-flush" style={{ "backgroundColor": "#8080805e" }}>
                            {data !== null && data.filter(element => element.type === "Question Paper").map((element, index) => {
                                return (
                                    <li className="list-group-item" style={{ "padding": "0.5rem 1rem 0 1rem", "fontSize": "1.3rem", "backgroundColor": "#454545" }}>
                                        <p style={{ "float": "left", "color": "#6fb7ff" }}>
                                            {element.description}
                                        </p>
                                        <div className="accordion-icons" style={{ "float": "right" }}>
                                            <a href={element.publicUrl} target="_blank" rel='noreferrer'><i className="fa-solid fa-arrow-up-right-from-square" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Open"></i></a>
                                            <a href={element.downloadUrl} rel='noreferrer'><i class="fa-solid fa-cloud-arrow-down" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Download"></i></a>
                                            <i className="fa-solid fa-info" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Details"></i>
                                            <i className="fa-solid fa-face-frown" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Unhappy ??"></i>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        {details !== null && <div style={{ "padding": "0.9rem 1rem" }}> <br /><br /><span style={{ "color": "wheat" }}>That's All!!</span>&emsp;<Link to={`/contribute/${details.courseCode}`}>Contribute</Link></div>}
                    </div>
                    <button class="accordion" id="Notes" onClick={() => accordian("Notes")}>Notes</button>
                    <div class="panel">
                        <ul class="list-group list-group-flush" style={{ "backgroundColor": "#8080805e" }}>
                            {data !== null && data.filter(element => element.type === "Notes").map((element, index) => {
                                return (
                                    <li className="list-group-item" style={{ "padding": "0.5rem 1rem 0 1rem", "fontSize": "1.3rem", "backgroundColor": "#454545" }}>
                                        <p style={{ "float": "left", "color": "#6fb7ff" }}>
                                            {element.description}
                                        </p>
                                        <div className="accordion-icons" style={{ "float": "right" }}>
                                            <a href={element.publicUrl} target="_blank" rel='noreferrer'><i className="fa-solid fa-arrow-up-right-from-square" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Open"></i></a>
                                            <a href={element.downloadUrl} rel='noreferrer'><i class="fa-solid fa-cloud-arrow-down" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Download"></i></a>
                                            <i className="fa-solid fa-info" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Details"></i>
                                            <i className="fa-solid fa-face-frown" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Unhappy ??"></i>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        {details !== null && <div style={{ "padding": "0.9rem 1rem" }}> <br /><br /><span style={{ "color": "wheat" }}>That's All!!</span>&emsp;<Link to={`/contribute/${details.courseCode}`}>Contribute</Link></div>}
                    </div>
                    <button class="accordion" id="Playlist" onClick={() => accordian("Playlist")}>Playlist</button>
                    <div class="panel">
                        <ul class="list-group list-group-flush" style={{ "backgroundColor": "#8080805e" }}>
                            {data !== null && data.filter(element => element.type === "Playlist").map((element, index) => {
                                return (
                                    <li className="list-group-item" style={{ "padding": "0.5rem 1rem 0 1rem", "fontSize": "1.3rem", "backgroundColor": "#454545" }}>
                                        <p style={{ "float": "left", "color": "#6fb7ff" }}>
                                            {element.description}
                                        </p>
                                        <div className="accordion-icons" style={{ "float": "right" }}>
                                            <a href={element.publicUrl} target="_blank" rel='noreferrer'><i className="fa-solid fa-arrow-up-right-from-square" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Open"></i></a>
                                            <i className="fa-solid fa-info" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Details"></i>
                                            <i className="fa-solid fa-face-frown" style={{ "marginRight": "1.5rem" }} data-toggle="tooltip" title="Unhappy ??"></i>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        {details !== null && <div style={{ "padding": "0.9rem 1rem" }}> <br /><br /><span style={{ "color": "wheat" }}>That's All!!</span>&emsp;<Link to={`/contribute/${details.courseCode}`}>Contribute</Link></div>}
                    </div>
                </div>
                <div className="content-contribute">
                    Didn't find what you are looking ? {details !== null && <Link to={`/contribute/${details.courseCode}`}>Contribute</Link>}
                </div>
            </div>
        </>
    )
}
