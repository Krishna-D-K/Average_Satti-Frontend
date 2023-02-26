import React from 'react'
import "../Styles/ProfileStyle.css";
import address from"../images/avatar.png"
import { useAuthContext } from '../hooks/useAuthContext';

function Profile() {
    const { user } = useAuthContext();
    if(user){
        return (
            <>
                <section className="vh-100" style={{ backgroundColor: 'black' }}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-6 mb-4 mb-lg-0">
                                <div className="card mb-3" style={{ "borderRadius": '.5rem'}}>
                                    <div className="row g-0">
                                        <div className="col-md-4 gradient-custom text-center text-white" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                            <img src={address} alt="Avatar" className="img-fluid my-5" style={{ width: '22vh' }} />
                                            <h5>{user.name}</h5>
                                            <p>{user.rollNo}</p>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-4">
                                                <h6>Information</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <p className="text-muted"><span style={{"fontSize": "1.0rem"}}>Email : </span>{user.name}</p>
                                                    </div> <br />
                                                    <div className="col-6 mb-3">
                                                        <p className="text-muted"><span style={{"fontSize": "1.0rem"}}>Phone</span> : {user.name}</p>
                                                    </div>
                                                </div>
                                                <h6>Additional Details</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>Institute Email</h6>
                                                        <p className="text-muted">{user.instiMail}</p>
                                                    </div>
                                                    {/* <div className="col-6 mb-3">
                                                        <h6>Most Viewed</h6>
                                                        <p className="text-muted">Dolor sit amet</p>
                                                    </div> */}
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
    else{
        return null;
    }
}

export default Profile