import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Apiservice from '../Apiservice';
import "../Styles/ContentStyle.css";

export default function Content() {
    const { code } = useParams();
    const [details, setDetails] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        try {
            axios.get(Apiservice + `/courses/${code}`).then(async (response) => {
                await setDetails(response.data[0]);
            }).then((res) => {

            })
        } catch (err) {
            console.log(err);
        }
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

                </div>
                <div className="content-contribute">
                    Didn't find what you are looking ? {details !== null && <Link to={`/contribute/${details.courseCode}`}>Contribute</Link>}
                </div>
            </div>
        </>
    )
}
