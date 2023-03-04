import axios from "axios";
import { useEffect, useState } from "react";
import Apiservice from "../Apiservice";
import { useAuthContext } from "../hooks/useAuthContext";
import '../Styles/AccountsStyle.css';
import Loader from "./Loader";

const Accounts = () => {

    const { user } = useAuthContext();
    const [data, setData] = useState(null);

    const getUsers = async () => {
        try {
            await axios.get(Apiservice + "/login/users", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            }).then((res) => {
                console.log(res.data);
                setData(res.data);
            })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUsers()
    }, []);

    return (
        <>
            <div style={{ "display": "flex", "justifyContent": "center" }}>
                {data !== null && <table class="rwd-table">
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Roll No</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                    {data.map((val, index) => {
                        if(val.rollNo!==user.rollNo){
                            return(
                                <tr>
                                    <td data-th="S.No" style={{"color": "wheat"}}>{index+1}</td>
                                    <td data-th="Name">{val.name}</td>
                                    <td data-th="Role">{val.role}</td>
                                    <td data-th="Roll No">{val.rollNo}</td>
                                    {/* <td data-th="Email">{val.email}</td>
                                    <td data-th="Phone">{val.phone}</td> */}
                                    <td data-th="Email">krishnadk8203@gmail.com</td>
                                    <td data-th="Phone">8446508203</td>
                                </tr>
                            )
                        }
                        else{
                            return (
                                <tr>
                                    <td data-th="S.No" style={{"color": "wheat"}}>{index+1}</td>
                                    <td data-th="Name"><span style={{"color": "#48ff72"}}>YOU</span></td>
                                    <td data-th="Role">{val.role}</td>
                                    <td data-th="Roll No">{val.rollNo}</td>
                                    {/* <td data-th="Email">{val.email}</td>
                                    <td data-th="Phone">{val.phone}</td> */}
                                    <td data-th="Email">krishnadk8203@gmail.com</td>
                                    <td data-th="Phone">8446508203</td>
                                </tr>
                            );
                        }
                    })}
                </table>}
                {data===null && <Loader />}
            </div>
        </>
    );
}

export default Accounts;