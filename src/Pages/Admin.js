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
import AddUser from '../Components/AddUser';

export default function Admin() {
    const { user } = useAuthContext();
    const [title, setTitle] = useState(" ");
    const { logout } = useLogout();
    const name = user.name, role = user.role;
    console.log(name, role);
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
                                <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => setTitle("Profile")}><span><i class="fa-solid fa-user" style={{"color":"wheat"}}></i>&emsp;Profile</span><span class="badge badge-info badge-pill">14</span></li>
                                <li onClick={() => setTitle("Courses")}><i class="fa-solid fa-list-ul" style={{"color":"wheat"}}></i>&emsp;Courses</li>
                                <li onClick={() => setTitle("Current Data")}><i class="fa-solid fa-database" style={{"color":"wheat"}}></i>&emsp;Current Data</li>
                                <li onClick={() => setTitle("Accounts")}><i class="fa-regular fa-address-card" style={{"color":"wheat"}}></i>&emsp;Accounts</li>
                                <li onClick={() => setTitle("Add User")}><i class="fa-regular fa-square-plus" style={{"color":"wheat"}}></i>&emsp;Add User</li>
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
                            {title === "Add User" && <AddUser user = {user}/>}
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
