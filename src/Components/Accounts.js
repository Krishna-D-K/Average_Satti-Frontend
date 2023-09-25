import axios from "axios";
import { useEffect, useState } from "react";
import Apiservice from "../Apiservice";
import '../Styles/AccountsStyle.css';
import Loader from "./Loader";

const Accounts = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const [data, setData] = useState(null);

    const getUsers = async () => {
        try {
            await axios.get(Apiservice + "/login/users", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            }).then((res) => {
                // console.log(res.data);
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
                {data !== null && <table className="rwd-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Roll No</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((val, index) => {
                            if (val.rollNo !== user.rollNo) {
                                return (
                                    <tr key={index}>
                                        <td data-th="S.No" style={{ "color": "wheat" }}>{index + 1}</td>
                                        <td data-th="Name">{val.name}</td>
                                        <td data-th="Role">{val.role}</td>
                                        <td data-th="Roll No">{val.rollNo}</td>
                                        <td data-th="Email">{val.email}</td>
                                        <td data-th="Phone">{val.phone}</td>
                                    </tr>
                                )
                            }
                            else {
                                return (
                                    <tr key={index}>
                                        <td data-th="S.No" style={{ "color": "wheat" }}>{index + 1}</td>
                                        <td data-th="Name"><span style={{ "color": "#48ff72" }}>YOU</span></td>
                                        <td data-th="Role">{val.role}</td>
                                        <td data-th="Roll No">{val.rollNo}</td>
                                        <td data-th="Email">krishnadk8203@gmail.com</td>
                                        <td data-th="Phone">8446508203</td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </table>}
                {data === null && <Loader />}
            </div>
        </>
    );
}

export default Accounts;