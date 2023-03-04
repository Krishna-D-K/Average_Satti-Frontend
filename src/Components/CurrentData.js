import axios from "axios";
import { useEffect, useState } from "react";
import Apiservice from "../Apiservice";
import { useAuthContext } from "../hooks/useAuthContext";
import '../Styles/AccountsStyle.css';
import Loader from "./Loader";

const CurrentData = () => {
    const { user } = useAuthContext();
    const [data, setData] = useState(null);
    const [fileID, setFileID] = useState(null);
    const [playlist, isPlaylist] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [key, setKey] = useState(null);
    const [edit, setEdit] = useState(false);
    const [desc, setDesc] = useState(null);

    const getCurrentData = async () => {
        try {
            await axios.get(Apiservice + "/content/request", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            }).then((res) => {
                setData(res.data);
            })
        } catch (err) {
            console.log(err);
        }
    }

    const actions = (type, data, key) => {
        console.log(data);
        
        if(data.type === "Playlist"){
            isPlaylist("true");
            setFileID(data._id);
        }
        else{
            isPlaylist("false");
            setFileID(data.fileID);
        }
        setKey(key);
        if (type === "delete") {
            setConfirm(true);
        }
        else {
            setDesc(data.description);
            setEdit(true);
        }
    }

    const exitDelete = () => {
        setConfirm(!confirm);
        setKey(null);
        setFileID(null);
        isPlaylist(null);
    }

    const deleteData = async () => {
        console.log(fileID, playlist);
        try {
            console.log()
            await axios.delete(Apiservice + `/content/upload/${playlist}/${fileID}`).then((res) => {
                exitDelete();
            })
        } catch (error) {
            console.log(error)
        }
    }

    const exitUpdate = () => {
        setEdit(false);
        setDesc(null);
        setKey(null);
        setFileID(null);
    }

    const editData = async () => {
        try {
            await axios.patch(Apiservice + "/content/upload", {
                description: desc,
                fileID: fileID
            }).then((res) => {
                exitUpdate();
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCurrentData()
    }, []);

    return (
        <>
            <div style={{ "display": "flex", "justifyContent": "center" }}>
                {data!==null && <table className="rwd-table">
                    <tr>
                        <th>S.No</th>
                        <th>Semester</th>
                        <th>Course Code</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Url</th>
                        <th>Author</th>
                        <th>Actions</th>

                    </tr>
                    {data !== null && data.map((val, index) => {
                        return (
                            <tr>
                                <td data-th="S.No" style={{ "color": "wheat" }}>{index + 1}</td>
                                <td data-th="Semester">{val.semester}</td>
                                <td data-th="Course Code">{val.courseCode}</td>
                                <td data-th="Type">{val.type}</td>
                                {key === index && edit && <td data-th="Description">
                                    <input id='edit-data-input' type="text" value={desc} onChange={e => { setDesc(e.target.value) }} />
                                </td>}
                                {!edit && <td data-th="Description">{val.description}</td>}
                                <td data-th="Url"><a href={val.publicUrl} target="_blank" rel="noreferrer">{val.publicUrl.substring(0, 20)}...</a></td>
                                <td data-th="Author">{val.authorName}</td>
                                {((!confirm && key !== index) || (confirm && key !== index) || (!edit && key !== index) || (edit && key !== index)) && <td data-th="Actions" style={{ "display": "flex", "justifyContent": "space-evenly" }}>
                                    <i className="fa-solid fa-trash actions-icon fa-lg" style={{ "margin": "0 0.8rem 0 0", "color": "#ff2525" }}
                                        data-toggle="tooltip" title="Delete"
                                        onClick={() => {
                                            setFileID(val.fileID);
                                            (val.type === "Playlist") ? isPlaylist("true") : isPlaylist("false");
                                            actions("delete", val, index);
                                        }} />
                                    <i className="fa-regular fa-pen-to-square actions-icon fa-lg" style={{ "margin": "0 0.8rem 0 0", "color": "#48ff72" }}
                                        data-toggle="tooltip" title="Edit" onClick={() => {
                                            setFileID(val.fileID);
                                            actions("edit", val, index);
                                        }} />
                                </td>}
                                {confirm && key === index && <td data-th="Actions" style={{ "display": "flex", "justifyContent": "space-evenly" }}>
                                    <div>
                                        <i class="fa-solid fa-square-check actions-icon fa-lg" style={{ "margin": "0 0.8rem 0 0", "color": "#00ff00" }}
                                            data-toggle="tooltip" title="Confirm" onClick={() => {
                                                deleteData();
                                            }}></i>
                                        <i class="fa-solid fa-circle-xmark actions-icon fa-lg" style={{ "margin": "0 0.8rem 0 0", "color": "#ff2525" }}
                                            data-toggle="tooltip" title="Exit" onClick={() => {
                                                exitDelete();
                                            }}></i>
                                    </div>
                                </td>}
                                {edit && key === index && <td data-th="Actions" style={{ "display": "flex", "justifyContent": "space-evenly" }}>
                                    <div>
                                        <i class="fa-solid fa-square-check actions-icon fa-lg" style={{ "margin": "0 0.8rem 0 0", "color": "#00ff00" }}
                                            data-toggle="tooltip" title="Done" onClick={() => {
                                                editData();
                                            }}></i>
                                        <i class="fa-solid fa-circle-xmark actions-icon fa-lg" style={{ "margin": "0 0.8rem 0 0", "color": "#ff2525" }}
                                            data-toggle="tooltip" title="Exit" onClick={() => {
                                                exitUpdate();
                                            }}></i>
                                    </div>
                                </td>}
                            </tr>
                        )

                    })}
                </table>}
                {data===null && <Loader />}
            </div>
        </>
    );
}

export default CurrentData;