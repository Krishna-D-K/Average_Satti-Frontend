import React, { useState } from 'react'
import Profile from '../Components/Profile';
import "../Styles/AdminStyle.css";
import address from "../images/avatar.png";
import Courses from '../Components/Courses';
import AddCourse from '../Components/AddCourse';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import Accounts from '../Components/Accounts';
import CurrentData from '../Components/CurrentData';

export default function Admin() {
    const { user } = useAuthContext();
    const [title, setTitle] = useState(" ");
    const { logout } = useLogout();
    const name = user.name, role = user.role;
    if(user!==null){
        return (
            <>
                <div className="admin-container">
                    <div className="admin-sidebar">
                        <div className="admin-image">
                            <div className="gradient-custom text-center text-white" style={{ borderRadius: '.5rem', "height": "100%", "boxSizing": "border-box"}}>
                                <img src={address} alt="Avatar" className="img-fluid " style={{ width: '20vh' }} />
                                <h4>{name}</h4>
                                <h5>{role}</h5>
                                <button className=' btn btn-danger btn-sm' onClick={()=>{
                                    logout(); 
                                }}>
                                    Logout <i className="fa-solid fa-right-to-bracket" />
                                </button>
                            </div>
                        </div> <br />
                        <div className="admin-list">
                            <ul>
                                <li onClick={() => setTitle("Profile")}>Profile</li>
                                <li onClick={() => setTitle("Courses")}>Courses</li>
                                <li onClick={() => setTitle("Current Data")}>Current Data</li>
                                <li onClick={() => setTitle("Accounts")}>Accounts</li>
                                <li onClick={() => setTitle("profile")}>Profile</li>
                                <li onClick={() => setTitle("profile")}>Profile</li>
                            </ul>
                        </div>
                    </div>
                    <div className="admin-dashboard"> <br />
                        <h1 style={{ "textAlign": "center", "color": "#ff8d1e" }}>Admin Dashboard</h1><hr style={{ "height": "0.2rem", "width": "90%", "backgroundColor": "#ffffff42", "borderRadius": "0.1rem" }} />
                        <div className="admin-dashboard-content">
                            <h2 style={{ "textAlign": "center", "color": "#ff8d1e" }}>{title}</h2> <br />
                            {title === "Profile" && <Profile />}
                            {title === "Courses" && <Courses title={()=>setTitle("Add Course")} refresh={()=>{setTitle(" ");setTitle("Courses")}}/>} 
                            {title === "Add Course" && <AddCourse exit={()=>setTitle("Courses")}/>}
                            {title === "Current Data" && <CurrentData />}
                            {title === "Accounts" && <Accounts />}
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else{
        return null
    }
}
