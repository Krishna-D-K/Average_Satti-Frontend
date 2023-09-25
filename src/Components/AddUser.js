import axios from "axios";
import { useState } from "react";
import Apiservice from "../Apiservice";
import "../Styles/ContributeStyle.css";

export default function AddUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [name, setName] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [instiMail, setInstiMail] = useState("");
    const [role, setRole] = useState("");
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(null);
    const [display, setDisplay] = useState("none");
    const [alert, setAlert] = useState("none");

    const resetData = () =>{
        setName("");
        setRollNo("");
        setPassword("");
        setPhone("");
        setEmail("");
        setInstiMail("");
        setRole("");
        setChecked(false);
        setError(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (checked) {
            try {
                if (role === "") {
                    await axios.post(Apiservice + "/signin", {
                        name: name,
                        role: user.role,
                        rollNo: rollNo,
                        password: password,
                        phone: phone,
                        email: email,
                        instiMail: instiMail,
                        createdBy: user.rollNo // check this piece of code here
                    }).then((res) => {
                        // console.log(res);
                        setError(null);
                        setDisplay("block");
                        resetData();
                    })
                } else {
                    await axios.post(Apiservice + "/signin", {
                        name: name,
                        role: role,
                        rollNo: rollNo,
                        password: password,
                        phone: phone,
                        email: email,
                        instiMail: instiMail,
                        createdBy: user.rollNo // check this piece of code here
                    }).then((res) => {
                        // console.log(res);
                        setError(null);
                        setDisplay("block");
                        resetData();
                    })
                }
            } catch (error) {
                console.log(error);
                setError(error.response.data);
                setAlert("block");
            }
        }
    }

    return (
        <>
            <div className="adduser-container">
                <div className="adduser-container-div">
                    {user !== null && <form onSubmit={handleSubmit}>
                        <div style={{ "display": "flex", "alignItems": "center" }}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" style={{fontFamily:'Laila, sans-serif'}}>Role &emsp;</label>
                                {user.role === "Owner" && <select className="form-control" id="exampleFormControlSelect1" style={{ "width": "60%", "color": "#000000", fontFamily:'Laila, sans-serif' }} onChange={(e => setRole(e.target.value))} required>
                                    <option value="">-SELECT-</option>
                                    <option value="Admin1">Admin1</option><option value="Admin2">Admin2</option>
                                    <option value="Admin3">Admin3</option><option value="Admin4">Admin4</option>
                                    <option value="Admin5">Admin5</option>
                                </select>}
                                {user.role !== "Owner" && <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.role} style={{ "width": "60%" }} disabled />}
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail2" style={{fontFamily:'Laila, sans-serif'}}>Name &emsp;</label>
                                <input type="text" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" style={{ "width": "60%",fontFamily: 'Laila, sans-serif' }} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <div style={{ "display": "flex", "alignItems": "center" }}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail3" style={{fontFamily:'Laila, sans-serif'}}>Roll Number &emsp;</label>
                                <input type="text" className="form-control" placeholder='Roll Number' value={rollNo} onChange={(e) => setRollNo(e.target.value)} id="exampleInputEmail3" aria-describedby="emailHelp" style={{ "width": "60%", "color": "#000000",fontFamily: 'Laila, sans-serif'}} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail4" style={{fontFamily:'Laila, sans-serif'}}>Personal Mail &emsp;</label>
                                <input type="email" className="form-control" placeholder='Personal Mail' value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail4" aria-describedby="emailHelp" style={{ "width": "60%", "color": "#000000",fontFamily: 'Laila, sans-serif' }} required />
                            </div>
                        </div>
                        <div style={{ "display": "flex", "alignItems": "center" }}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail5" style={{fontFamily:'Laila, sans-serif'}}>Insti Mail &emsp;</label>
                                <input type="email" className="form-control" placeholder='Insti Mail' value={instiMail} onChange={(e) => setInstiMail(e.target.value)} id="exampleInputEmail5" aria-describedby="emailHelp" style={{ "width": "60%", "color": "#000000",fontFamily: 'Laila, sans-serif' }} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail6" style={{fontFamily:'Laila, sans-serif'}}>Phone &emsp;</label>
                                <input type="tel" className="form-control" placeholder='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} id="exampleInputEmail6" aria-describedby="emailHelp" style={{ "width": "60%", "color": "#000000",fontFamily: 'Laila, sans-serif' }} required />
                            </div>
                        </div>
                        <div style={{ "display": "flex", "alignItems": "center" }}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail7" style={{fontFamily:'Laila, sans-serif'}}>Password &emsp;</label>
                                <input type="password" className="form-control" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputEmail7" aria-describedby="emailHelp" style={{ "width": "60%", "color": "#000000",fontFamily: 'Laila, sans-serif' }} required />
                            </div>
                        </div>
                        <input type="checkbox" name="anonymous" onChange={(e) => setChecked(e.target.checked)} id="anonymous" required /><label htmlFor='anonymous'>&ensp;<i>(You must add an admin responsibly, and you'll be equally responsible if any mishap is caused by the admin created by you!!)</i></label>
                        {error && <><div style={{ "color": "red", "textAlign": "center" }}>** {error}</div><br /></>}
                        <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ "display": `${display}`, "margin": "0 auto" ,fontFamily:'Laila, sans-serif'}}>
                            <strong>Done!!</strong> New admin created successfully.
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setDisplay("none")}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ "display": `${alert}`, "margin": "0 auto",fontFamily: 'Laila, sans-serif' }}>
                            <strong>Oops!!</strong> Unable to create new user. Try again later.
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setAlert("none")}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <span style={{ "display": "flex", "justifyContent": "center",fontFamily: 'Laila, sans-serif' }}><button type="submit" className="btn btn-primary">Create</button></span>
                    </form>}
                </div>
            </div>
        </>
    )
}
