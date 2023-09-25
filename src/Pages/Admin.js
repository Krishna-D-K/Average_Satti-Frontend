import React, { useState } from 'react'
import Profile from '../Components/Profile';
import "../Styles/AdminStyle.css";
import address from "../images/avatar.png";
import Courses from '../Components/Courses';
import AddCourse from '../Components/AddCourse';
import { useLogout } from '../hooks/useLogout';
import Accounts from '../Components/Accounts';
import CurrentData from '../Components/CurrentData';
import AddUser from '../Components/AddUser';
import jwt_decode from "jwt-decode";

export default function Admin() {
    const user = JSON.parse(localStorage.getItem("user"));
    const { logout } = useLogout();
    const [title, setTitle] = useState(" ");
    const [courseCode, setCourseCode] = useState(null);
    const [one, setOne] = useState("");
    const [two, setTwo] = useState("");
    const [three, setThree] = useState("");
    const [four, setFour] = useState("");
    const [five, setFive] = useState("");


    if (user) {
        const decoded = jwt_decode(user.token);
        var interval = setInterval(() => {
            if (user && ((decoded.exp * 1000) <= Date.now())) {
                console.log("Times up, over! Blow!");
                logout();
                clearInterval(interval);
            }
        }, 1000);
    }

    const setDetails = (courseCode) => {
        setTitle("Current Data");
        setCourseCode(courseCode);
    }

    const resetAll = () =>{
        setOne("");
        setTwo("");
        setThree("");
        setFour("");
        setFive("");
    }

    if (user) {
        return (
            <>
                <div className="admin-container">
                    <div id="mySidenav" className="sidenav">
                        <ul className="admin-list">
                            <li id="profile-card" className="gradient-custom text-center text-white" style={{ borderRadius: '.5rem', "boxSizing": "border-box" }}>
                                <img src={address} alt="Avatar" className="img-fluid " style={{ width: '15vh' }} />
                                <h4>{user.name}</h4>
                                <h5>{user.role}</h5>
                                <button className=' btn btn-danger btn-sm' onClick={() => {
                                    logout();
                                }}>
                                    Logout <i className="fa-solid fa-right-to-bracket" />
                                </button>
                            </li>
                            <li id="profile" onClick={() => setTitle("Profile")}>Profile&emsp;&emsp;<i className="fa-solid fa-user fa-lg correct-display" style={{ "color": "wheat" }}></i></li>
                            <li id="courses" onClick={() => setTitle("Courses")}>Courses&emsp;&emsp;<i className="fa-solid fa-list-ul fa-lg correct-display" style={{ "color": "wheat" }}></i></li>
                            <li id="current-data" onClick={() => { setTitle("Current Data"); setCourseCode(null) }}>Current Data&emsp;&emsp;<i className="fa-solid fa-database fa-lg correct-display" style={{ "color": "wheat" }}></i></li>
                            <li id="accounts" onClick={() => setTitle("Accounts")}>Accounts&emsp;&emsp;<i className="fa-regular fa-address-card fa-lg correct-display" style={{ "color": "wheat" }}></i></li>
                            <li id="add-user" onClick={() => setTitle("Add User")}>Add User&emsp;&emsp;<i className="fa-regular fa-square-plus fa-lg correct-display" style={{ "color": "wheat" }}></i></li>
                        </ul>
                    </div>

                    <div className="admin-dashboard"> <br />
                        <h1 style={{ "textAlign": "center", "color": "#ff8d1e" }}>Admin Dashboard</h1><hr style={{ "height": "0.2rem", "width": "90%", "backgroundColor": "#ffffff42", "borderRadius": "0.1rem" }} />
                        <div id="mySubnav">
                            <nav className="nav nav-pills flex-row flex-sm-row" style={{display: "flex", justifyContent: "space-evenly"}}>
                                <li className={"flex-sm-fill text-sm-center nav-link " + one} onClick={() => {setTitle("Profile"); resetAll(); setOne("active")}} style={{display: "flex"}}><i className="fa-solid fa-user fa correct-display" style={{ "color": "wheat"}}></i></li>
                                <li className={"flex-sm-fill text-sm-center nav-link " + two} onClick={() => {setTitle("Courses"); resetAll(); setTwo("active")}} style={{ "color": "wheat" }}>Courses</li>
                                <li className={"flex-sm-fill text-sm-center nav-link " + three} onClick={() => {setTitle("Current Data"); resetAll(); setThree("active")}} style={{ "color": "wheat" }}>Data</li>
                                <li className={"flex-sm-fill text-sm-center nav-link " + four} onClick={() => {setTitle("Accounts"); resetAll(); setFour("active")}} style={{ "color": "wheat" }}>Accounts</li>
                                <li className={"flex-sm-fill text-sm-center nav-link " + five} onClick={() => {setTitle("Add User"); resetAll(); setFive("active")}} style={{display: "flex"}}><i className="fa-regular fa-square-plus correct-display" style={{ "color": "wheat"}}></i></li>
                                <li className={"flex-sm-fill text-sm-center nav-link btn-danger"} onClick={() => logout()}><i className="fa-solid fa-right-to-bracket" style={{color: "wheat"}}/></li>
                            </nav>
                            <hr style={{ "height": "0.2rem", "width": "90%", "backgroundColor": "#ffffff42", "borderRadius": "0.1rem" }} />
                        </div>
                        <div className="admin-dashboard-content">
                            <h2 style={{ "textAlign": "center", "color": "#ff8d1e", fontFamily: 'Laila, sans-serif'}}>{title}</h2> <br />
                            {title === "Profile" && <Profile />}
                            {title === "Courses" && <Courses details={setDetails} title={() => setTitle("Add Course")} refresh={() => { setTitle(" "); setTimeout(() => setTitle("Courses"), 100) }} />}
                            {title === "Add Course" && <AddCourse exit={() => setTitle("Courses")} />}
                            {title === "Current Data" && <CurrentData courseCode={courseCode} refresh={() => { setTitle(" "); setTimeout(() => setTitle("Current Data"), 100) }} />}
                            {title === "Accounts" && <Accounts />}
                            {title === "Add User" && <AddUser user={user} />}
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return null
    }
}
