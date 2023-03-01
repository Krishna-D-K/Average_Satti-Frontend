import axios from "axios";
import { useState } from "react";
import Apiservice from "../Apiservice";
import "../Styles/ContributeStyle.css";

export default function AddUser(props) {
    const user = props.user;
    const [name, setName] = useState(null);
    const [rollNo, setRollNo] = useState(null);
    const [password, setPassword] = useState(null);
    const [role, setRole] = useState(null);
    const [checked, setChecked] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(role===null){
            setRole(user.role);
        }
        if(checked){
            try {
                await axios.post(Apiservice + "/signin", {
                    name: name,
                    role: role,
                    rollNo: rollNo,
                    password: password
                }).then((res)=>{
                    console.log(res.data)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <div className="adduser-container">
                <div style={{ "width": "60%", "margin": "0 auto", "color": "rgba(253, 160, 133, 1)" }}>
                    {user !== null && <form onSubmit={handleSubmit}>
                        <div style={{ "display": "flex", "alignItems": "center" }}>
                            <div className="form-group" style={{ "width": "60%", "display": "flex", "alignItems": "center", "justifyContent": "end" }}>
                                <label htmlFor="exampleInputEmail1">Role &emsp;</label>
                                {user.role === "Owner" && <select className="form-control" id="exampleFormControlSelect1" style={{ "width": "60%", "color": "#000000" }} onChange={(e => setRole(e.target.value))} required>
                                    <option value={null}>-SELECT-</option>
                                    <option value="Admin1">Admin1</option><option value="Admin2">Admin2</option>
                                    <option value="Admin3">Admin3</option><option value="Admin4">Admin4</option>
                                    <option value="Admin5">Admin5</option>
                                </select>}
                                {user.role !== "Owner" && <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.role} style={{ "width": "60%" }} disabled />}
                            </div>
                            <div className="form-group" style={{ "width": "60%", "display": "flex", "alignItems": "center", "justifyContent": "end" }}>
                                <label htmlFor="exampleInputEmail2">Name &emsp;</label>
                                <input type="text" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" style={{ "width": "60%" }} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <div style={{ "display": "flex", "alignItems": "center" }}>
                            <div className="form-group" style={{ "width": "60%", "display": "flex", "alignItems": "center", "justifyContent": "end" }}>
                                <label htmlFor="exampleInputEmail3">Roll Number &emsp;</label>
                                <input type="text" className="form-control" placeholder='Roll Number' value={rollNo} onChange={(e) => setRollNo(e.target.value)} id="exampleInputEmail3" aria-describedby="emailHelp" style={{ "width": "60%", "color": "#000000" }} required />
                            </div>
                            <div className="form-group" style={{ "width": "60%", "display": "flex", "alignItems": "center", "justifyContent": "end" }}>
                                <label htmlFor="exampleInputEmail4">Password &emsp;</label>
                                <input type="password" className="form-control" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputEmail4" aria-describedby="emailHelp" style={{ "width": "60%", "color": "#000000" }} required />
                            </div>
                        </div>
                        <input type="checkbox" name="anonymous" onChange={(e) => setChecked(e.target.checked)} id="anonymous" required/><label htmlFor='anonymous'>&ensp;<i>(You must add an admin responsibly!!)</i></label>
                        <span style={{ "display": "flex", "justifyContent": "center" }}><button type="submit" className="btn btn-primary" style={{ "textAlign": "center", "width": "20%" }}>Create</button></span>
                    </form>}
                </div>
            </div>
        </>
    )
}
