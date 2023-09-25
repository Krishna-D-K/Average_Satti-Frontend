import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Apiservice from '../Apiservice';
import Loader from '../Components/Loader';
import Accordion from 'react-bootstrap/Accordion';
import "../Styles/ContentStyle.css";

export default function Content() {
    const { code } = useParams();
    const [details, setDetails] = useState(null);
    const [data, setData] = useState(null);

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
                <div className="content-heading">
                    <h2>Course Content</h2>
                    <hr />
                </div>
                <div className="content-details">
                    {details !== null && (<>
                        <p><span style={{ "color": "cornflowerblue", "font-style": "italic" }}>Course Code : </span><span style={{ "color": "aliceblue" }}>{details.courseCode} &emsp;</span></p>
                        <p><span style={{ "color": "cornflowerblue", "font-style": "italic" }}>Course Name : </span><span style={{ "color": "aliceblue" }}>{details.courseName} &emsp;</span></p>
                        <p><span style={{ "color": "cornflowerblue", "font-style": "italic" }}>Semester : </span><span style={{ "color": "aliceblue" }}>{details.semester} &emsp;</span></p>
                        <p><span style={{ "color": "cornflowerblue", "font-style": "italic" }}>Credits : </span><span style={{ "color": "aliceblue" }}>{details.credits} &emsp;</span></p>
                    </>
                    )}
                    <hr />
                </div>
                {data !== null &&
                    <>
                        <div className="content-data">
                            <Accordion flush id="accordion">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><span className='accordion-heading'>Assignments</span></Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="list-group list-group-flush" style={{ "backgroundColor": "#8080805e" }}>
                                            {data !== null && data.filter(element => element.type === "Assignment").map((element, index) => {
                                                return (
                                                    <li className="list-group-item" key={index}>
                                                        <p>
                                                            {element.description}
                                                        </p>
                                                        <div className="accordion-icons" style={{ "float": "right" }}>
                                                            <a href={element.publicUrl} target="_blank" rel='noreferrer'><i className="fa-solid fa-arrow-up-right-from-square" data-toggle="tooltip" title="Open"></i></a>
                                                            <a href={element.downloadUrl} rel='noreferrer'><i className="fa-solid fa-cloud-arrow-down" data-toggle="tooltip" title="Download"></i></a>
                                                            <i className="fa-solid fa-info" data-toggle="tooltip" title="Details"></i>
                                                            <a href={`mailto:iwannabeflash@gmail.com?subject=Unsatisfied over the course content&body=Course Code : ${details.courseCode}%0D%0ADescription : ${element.description}%0D%0AYour grievance:%20`} target="_blank" rel="noreferrer">
                                                                <i className="fa-solid fa-face-frown" data-toggle="tooltip" title="Unhappy ??" />
                                                            </a>

                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        {details !== null && <div className='indi-contri' style={{ "padding": "0rem 1rem" }}><span style={{ "color": "aliceblue" }}>Not what you're looking for?</span>&emsp;<Link to={`/contribute/${details.courseCode}`}>Contribute</Link></div>}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header><span className='accordion-heading'>Tests</span></Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="list-group list-group-flush" style={{ "backgroundColor": "#8080805e" }}>
                                            {data !== null && data.filter(element => element.type === "Test").map((element, index) => {
                                                return (
                                                    <li className="list-group-item" key={index}>
                                                        <p>
                                                            {element.description}
                                                        </p>
                                                        <div className="accordion-icons" style={{ "float": "right" }}>
                                                            <a href={element.publicUrl} target="_blank" rel='noreferrer'><i className="fa-solid fa-arrow-up-right-from-square" data-toggle="tooltip" title="Open"></i></a>
                                                            <a href={element.downloadUrl} rel='noreferrer'><i className="fa-solid fa-cloud-arrow-down" data-toggle="tooltip" title="Download"></i></a>
                                                            <i className="fa-solid fa-info" data-toggle="tooltip" title="Details"></i>
                                                            <a href={`mailto:iwannabeflash@gmail.com?subject=Unsatisfied over the course content&body=Course Code : ${details.courseCode}%0D%0ADescription : ${element.description}%0D%0AYour grievance:%20`} target="_blank" rel="noreferrer">
                                                                <i className="fa-solid fa-face-frown" data-toggle="tooltip" title="Unhappy ??" />
                                                            </a>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        {details !== null && <div className='indi-contri' style={{ "padding": "0rem 1rem" }}><span style={{ "color": "aliceblue" }}>Not what you're looking for?</span>&emsp;<Link to={`/contribute/${details.courseCode}`}>Contribute</Link></div>}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header><span className='accordion-heading'>Reference Material</span></Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="list-group list-group-flush" style={{ "backgroundColor": "#8080805e" }}>
                                            {data !== null && data.filter(element => element.type === "Reference Material").map((element, index) => {
                                                return (
                                                    <li className="list-group-item" key={index}>
                                                        <p>
                                                            {element.description}
                                                        </p>
                                                        <div className="accordion-icons" style={{ "float": "right" }}>
                                                            <a href={element.publicUrl} target="_blank" rel='noreferrer'><i className="fa-solid fa-arrow-up-right-from-square" data-toggle="tooltip" title="Open"></i></a>
                                                            <a href={element.downloadUrl} rel='noreferrer'><i className="fa-solid fa-cloud-arrow-down" data-toggle="tooltip" title="Download"></i></a>
                                                            <i className="fa-solid fa-info" data-toggle="tooltip" title="Details"></i>
                                                            <a href={`mailto:iwannabeflash@gmail.com?subject=Unsatisfied over the course content&body=Course Code : ${details.courseCode}%0D%0ADescription : ${element.description}%0D%0AYour grievance:%20`} target="_blank" rel="noreferrer">
                                                                <i className="fa-solid fa-face-frown" data-toggle="tooltip" title="Unhappy ??" />
                                                            </a>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        {details !== null && <div className='indi-contri' style={{ "padding": "0rem 1rem" }}><span style={{ "color": "aliceblue" }}>Not what you're looking for?</span>&emsp;<Link to={`/contribute/${details.courseCode}`}>Contribute</Link></div>}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header><span className='accordion-heading'>Question Papers</span></Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="list-group list-group-flush" style={{ "backgroundColor": "#8080805e" }}>
                                            {data !== null && data.filter(element => element.type === "Question Paper").map((element, index) => {
                                                return (
                                                    <li className="list-group-item" key={index}>
                                                        <p>
                                                            {element.description}
                                                        </p>
                                                        <div className="accordion-icons" style={{ "float": "right" }}>
                                                            <a href={element.publicUrl} target="_blank" rel='noreferrer'><i className="fa-solid fa-arrow-up-right-from-square" data-toggle="tooltip" title="Open"></i></a>
                                                            <a href={element.downloadUrl} rel='noreferrer'><i className="fa-solid fa-cloud-arrow-down" data-toggle="tooltip" title="Download"></i></a>
                                                            <i className="fa-solid fa-info" data-toggle="tooltip" title="Details"></i>
                                                            <a href={`mailto:iwannabeflash@gmail.com?subject=Unsatisfied over the course content&body=Course Code : ${details.courseCode}%0D%0ADescription : ${element.description}%0D%0AYour grievance:%20`} target="_blank" rel="noreferrer">
                                                                <i className="fa-solid fa-face-frown" data-toggle="tooltip" title="Unhappy ??" />
                                                            </a>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        {details !== null && <div className='indi-contri' style={{ "padding": "0rem 1rem" }}><span style={{ "color": "aliceblue" }}>Not what you're looking for?</span>&emsp;<Link to={`/contribute/${details.courseCode}`}>Contribute</Link></div>}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header><span className='accordion-heading'>Notes</span></Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="list-group list-group-flush" style={{ "backgroundColor": "#8080805e" }}>
                                            {data !== null && data.filter(element => element.type === "Notes").map((element, index) => {
                                                return (
                                                    <li className="list-group-item" key={index}>
                                                        <p>
                                                            {element.description}
                                                        </p>
                                                        <div className="accordion-icons" style={{ "float": "right" }}>
                                                            <a href={element.publicUrl} target="_blank" rel='noreferrer'><i className="fa-solid fa-arrow-up-right-from-square" data-toggle="tooltip" title="Open"></i></a>
                                                            <a href={element.downloadUrl} rel='noreferrer'><i className="fa-solid fa-cloud-arrow-down" data-toggle="tooltip" title="Download"></i></a>
                                                            <i className="fa-solid fa-info" data-toggle="tooltip" title="Details"></i>
                                                            <a href={`mailto:iwannabeflash@gmail.com?subject=Unsatisfied over the course content&body=Course Code : ${details.courseCode}%0D%0ADescription : ${element.description}%0D%0AYour grievance:%20`} target="_blank" rel="noreferrer">
                                                                <i className="fa-solid fa-face-frown" data-toggle="tooltip" title="Unhappy ??" />
                                                            </a>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        {details !== null && <div className='indi-contri' style={{ "padding": "0rem 1rem" }}><span style={{ "color": "aliceblue" }}>Not what you're looking for?</span>&emsp;<Link to={`/contribute/${details.courseCode}`}>Contribute</Link></div>}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="5">
                                    <Accordion.Header><span className='accordion-heading'>Playlist</span></Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="list-group list-group-flush" style={{ "backgroundColor": "#8080805e" }}>
                                            {data !== null && data.filter(element => element.type === "Playlist").map((element, index) => {
                                                return (
                                                    <li className="list-group-item" key={index}>
                                                        <p>
                                                            {element.description}
                                                        </p>
                                                        <div className="accordion-icons" style={{ "float": "right" }}>
                                                            <a href={element.publicUrl} target="_blank" rel='noreferrer'><i className="fa-solid fa-arrow-up-right-from-square" data-toggle="tooltip" title="Open"></i></a>
                                                            <i className="fa-solid fa-info" data-toggle="tooltip" title="Details"></i>
                                                            <a href={`mailto:iwannabeflash@gmail.com?subject=Unsatisfied over the course content&body=Course Code : ${details.courseCode}%0D%0ADescription : ${element.description}%0D%0AYour grievance:%20`} target="_blank" rel="noreferrer">
                                                                <i className="fa-solid fa-face-frown" data-toggle="tooltip" title="Unhappy ??" />
                                                            </a>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        {details !== null && <div className='indi-contri' style={{ "padding": "0rem 1rem" }}><span style={{ "color": "aliceblue" }}>Not what you're looking for?</span>&emsp;<Link to={`/contribute/${details.courseCode}`}>Contribute</Link></div>}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className="content-contribute">
                            Didn't find what you are looking ? {details !== null && <Link to={`/contribute/${details.courseCode}`}>Contribute</Link>}
                        </div>
                    </>}
                {data === null && <div style={{ "display": "flex", "justifyContent": "center" }}><Loader /></div>}
            </div>
        </>
    )
}
