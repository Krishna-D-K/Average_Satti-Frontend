import React, { useState } from 'react'
import "../Styles/ProfileStyle.css";
import address from "../images/avatar.png"
import axios from 'axios';
import Apiservice from '../Apiservice';

function Profile() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [mail, setMail] = useState(user.email);
    const [imail, setImail] = useState(user.instiMail)
    const [fb, setFb] = useState(user.fbLink);
    const [lid, setLid] = useState(user.linkedinLink);
    const [image, setImage] = useState(user.image);
    const [display, setDisplay] = useState("none");
    const [alert, setAlert] = useState("none");

    const exitEdit = () => {
        setEdit(false);
        setName(user.name);
        setPhone(user.phone);
        setMail(user.email);
        setImail(user.instiMail);
        setFb(user.fbLink);
        setLid(user.linkedinLink);
    }

    const confirmEdit = async () => {
        try {
            await axios.patch(Apiservice + "/signin", {
                name: name,
                phone: phone,
                email: mail,
                instiMail: imail,
                fbLink: fb,
                linkedinLink: lid,
                image: image
            }, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            }).then((res)=>{
                (res.status===200)?setDisplay("block"):setAlert("block");
                exitEdit();
            })
        } catch (error) {
            console.log(error);
        }
    }

    if (user) {
        // console.log(user);
        return (
            <>
                <section className="vh-100" style={{ backgroundColor: 'black' }}>
                    <div className="alert alert-success alert-dismissible fade show" role="alert" style={{"display": `${display}`, "width": "60%", "margin": "0 auto"}}>
                        <strong>Done!!</strong> Changes will be visible from your next login.
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={()=> setDisplay("none")}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{"display": `${alert}`, "width": "60%", "margin": "0 auto"}}>
                        <strong>Oops!!</strong> Unable to edit. Try again later.
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={()=>setAlert("none")}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-6 mb-4 mb-lg-0">
                                <div className="card mb-3" style={{ "borderRadius": '.5rem', "width": "auto", "backgroundColor": "whitesmoke" }}>
                                    <div className="row g-0">
                                        <div className="col-md-4 gradient-custom text-center text-white" style={{ borderRadius: '.5rem' }}>
                                            <img src={address} alt="Avatar" className="img-fluid-my-5"/>
                                            {user.name && <h5 style={{fontFamily:'Laila, sans-serif'}}>{user.name}</h5>}
                                            {user.rollNo && <p style={{fontFamily:'Laila, sans-serif'}}>{user.rollNo}</p>}
                                            <p style={{fontFamily:'Laila, sans-serif'}}>{user.role}</p> <br />
                                            {!edit && <p style={{ "color": "#28a745", fontFamily:'Laila, sans-serif'}} className="admin-profile-edit" onClick={() => setEdit(true)}>
                                                Edit&nbsp;
                                                <i className="fa-regular fa-pen-to-square fa-lg" style={{ "margin": "0 0.8rem 0 0", "color": "#28a745" }} />
                                            </p>}
                                            {edit && <p>
                                                <i className="fa-solid fa-square-check actions-icon fa-xl" style={{ "margin": "0 0.8rem 0 0", "color": "#28a745" }}
                                                    data-toggle="tooltip" title="Confirm" onClick={() => {
                                                        confirmEdit();
                                                    }}></i>
                                                <i className="fa-solid fa-circle-xmark actions-icon fa-xl" style={{ "margin": "0 0.8rem 0 0", "color": "#ff2525" }}
                                                    data-toggle="tooltip" title="Exit" onClick={() => {
                                                        exitEdit();
                                                    }}></i>
                                            </p>}
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-4">
                                                <h6 style={{fontFamily:'Laila, sans-serif'}}>Information</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="">
                                                    <div className="">
                                                        <p className="text-muted" style={{fontFamily:'Laila, sans-serif'}}><span style={{ "fontSize": "1rem", "color": "black", "fontFamily":'Laila, sans-serif' }}>Name : </span>
                                                            {!edit && user.name}
                                                            {edit && <input type="text" value={name} onChange={(e) => setName(e.target.value)} />}
                                                        </p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <p className="text-muted" style={{fontFamily:'Laila, sans-serif'}}><span style={{ "fontSize": "1.0rem", "color": "black", "fontFamily":'Laila, sans-serif' }}>Phone</span> :
                                                            {!edit && user.phone}
                                                            {edit && <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />}
                                                        </p>
                                                    </div>
                                                </div>
                                                <h6>Additional Details</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="">
                                                    <div className="">
                                                        <h6 style={{fontFamily:'Laila, sans-serif'}}>Institute Email</h6>
                                                        <p className="text-muted"  style={{fontFamily:'Laila, sans-serif'}}>
                                                            {!edit && user.instiMail}
                                                            {edit && <input type="text" value={imail} onChange={(e) => setImail(e.target.value)} />}
                                                        </p>
                                                    </div>
                                                    <div className="">
                                                        <h6 style={{fontFamily:'Laila, sans-serif'}}>Personal Email</h6>
                                                        <p className="text-muted" style={{fontFamily:'Laila, sans-serif'}}>
                                                            {!edit && user.email}
                                                            {edit && <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} />}
                                                        </p>
                                                    </div>
                                                    <div className="">
                                                        <h6 style={{fontFamily:'Laila, sans-serif'}}>Facebook</h6>
                                                        {!edit && user.fbLink && <p className="text-muted" style={{fontFamily:'Laila, sans-serif'}}>{user.fbLink}</p>}
                                                        {!edit && !user.fbLink && <p className="text-muted" style={{fontFamily:'Laila, sans-serif'}}>None</p>}
                                                        {edit && <input type="text" value={fb} onChange={(e) => setFb(e.target.value)} />}
                                                    </div>
                                                    <div className="">
                                                        <h6 style={{fontFamily:'Laila, sans-serif'}}>LinkedIn</h6>
                                                        {!edit && user.linkedinLink && <p className="text-muted" style={{fontFamily:'Laila, sans-serif'}}>{user.linkedinLink}</p>}
                                                        {!edit && !user.linkedinLink && <p className="text-muted" style={{fontFamily:'Laila, sans-serif'}}>None</p>}
                                                        {edit && <input type="text" value={lid} onChange={(e) => setLid(e.target.value)} />}
                                                    </div>
                                                    {edit && <div className="">
                                                        <h6>Image</h6>
                                                        <input type="text" value={image} placeholder="Insert drive link" onChange={(e) => setImage(e.target.value)} />
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </>
        )
    }
    else {
        return null;
    }
}

export default Profile