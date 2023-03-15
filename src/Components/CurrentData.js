import axios from "axios";
import { useEffect, useState } from "react";
import Apiservice from "../Apiservice";
import '../Styles/AccountsStyle.css';
import Loader from "./Loader";

const CurrentData = (props) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [data, setData] = useState(null);
    const [fileID, setFileID] = useState(null);
    const [playlist, isPlaylist] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [key, setKey] = useState(null);
    const [edit, setEdit] = useState(false);
    const [desc, setDesc] = useState("");
    const [filter_desc, setFilter_desc] = useState("");
    const [semester, setSemester] = useState("");
    const [type, setType] = useState("");

    const getCurrentData = async () => {
        try {
            console.log(user.token);
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
        console.log(data._id);

        if (data.type === "Playlist") {
            isPlaylist("true");
            setFileID(data._id);
        }
        else {
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
            await axios.delete(Apiservice + "/content/upload/" + playlist + "/" + fileID).then((res) => {
                exitDelete();
                props.refresh();
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
                props.refresh();
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
            <div className="courses-filter">
                {!props.courseCode && <div><h5 style={{ "display": "inline", "color": "#ff8d1e" }}>&emsp;&emsp;FIND BY : </h5>
                    <select id="exampleFormControlSelect11" value={semester} onChange={e => setSemester(e.target.value)} style={{ "margin": "0.5rem", "padding": "0.3rem", "borderRadius": "0.35rem" }}>
                        <option value="">-SEMESTER-</option>
                        {(user.role === "Admin1" || user.role === "Owner") && <><option value="FIRST">FIRST</option><option value="SECOND">SECOND</option></>}
                        {(user.role === "Admin2" || user.role === "Owner") && <><option value="THIRD">THIRD</option><option value="FOURTH">FOURTH</option></>}
                        {(user.role === "Admin3" || user.role === "Owner") && <><option value="FIFTH">FIFTH</option><option value="SIXTH">SIXTH</option></>}
                        {(user.role === "Admin4" || user.role === "Owner") && <><option value="SEVENTH">SEVENTH</option><option value="EIGHTH">EIGHTH</option></>}
                        {(user.role === "Admin5" || user.role === "Owner") && <><option value="NINTH">NINTH</option><option value="TENTH">TENTH</option></>}
                    </select>
                    <input type="text" placeholder='Description' value={filter_desc} onChange={e => { setFilter_desc(e.target.value) }}/>
                    <select id="exampleFormControlSelect12" value={type} onChange={e => setType(e.target.value)} style={{ "margin": "0.5rem", "padding": "0.3rem", "borderRadius": "0.35rem" }}>
                        <option value="">-TYPE-</option>
                        <option value="Assignment">Assignment</option><option value="Test">Test</option>
                        <option value="Reference Material">Reference Material</option><option value="Question Paper">Question Paper</option>
                        <option value="Notes">Notes</option><option value="Playlist">Playlist</option>
                    </select>
                </div>}
            </div>
            <div style={{ "display": "flex", "justifyContent": "center" }}>
                {data !== null && <table className="rwd-table">
                    <thead>
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
                    </thead>
                    <tbody>
                        {data !== null && !props.courseCode && !type && !filter_desc && !semester && data.map((val, index) => {
                            return (
                                <tr key={index}>
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
                                        <i className="fa-solid fa-trash actions-icon fa-lg" style={{ "margin": "0 0.8rem 0 0", "color": "#ff2525" ,"display" : "flex"}}
                                            data-toggle="tooltip" title="Delete"
                                            onClick={() => {
                                                setFileID(val.fileID);
                                                (val.type === "Playlist") ? isPlaylist("true") : isPlaylist("false");
                                                actions("delete", val, index);
                                            }} />
                                        <i className="fa-regular fa-pen-to-square actions-icon fa-lg" style={{ "margin": "0 0.8rem 0 0", "color": "#48ff72", "display": "flex" }}
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
                        })
                        }
                        {data !== null && props.courseCode && !type && !filter_desc && !semester && data.filter(value => value.courseCode === props.courseCode).map((val, index) => {
                            return (
                                <tr key={index}>
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
                                        <i className="fa-solid fa-trash actions-icon fa-lg" style={{ "margin": "0 0.8rem 0 0", "color": "#ff2525" ,"display" : "flex"}}
                                            data-toggle="tooltip" title="Delete"
                                            onClick={() => {
                                                setFileID(val.fileID);
                                                (val.type === "Playlist") ? isPlaylist("true") : isPlaylist("false");
                                                actions("delete", val, index);
                                            }} />
                                        <i className="fa-regular fa-pen-to-square actions-icon fa-lg" style={{ "margin": "0 0.8rem 0 0", "color": "#48ff72", "display": "flex" }}
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
                        })
                        }
                        {data !== null && !props.courseCode && type && !filter_desc && !semester && data.map((val, index) => {
                            console.log(type);
                            if (val.type === type) {
                                return (
                                    <tr key={index}>
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
                                            <i className="fa-solid fa-trash actions-icon fa-lg" style={{ "margin": "0 0.8rem 0 0", "color": "#ff2525" ,"display" : "flex"}}
                                                data-toggle="tooltip" title="Delete"
                                                onClick={() => {
                                                    setFileID(val.fileID);
                                                    (val.type === "Playlist") ? isPlaylist("true") : isPlaylist("false");
                                                    actions("delete", val, index);
                                                }} />
                                            <i className="fa-regular fa-pen-to-square actions-icon fa-lg" style={{ "margin": "0 0.8rem 0 0", "color": "#48ff72", "display": "flex" }}
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
                            }
                            else {
                                return null;
                            }
                        })
                        }
                        {data !== null && !props.courseCode && !type && !filter_desc && semester && data.map((val, index) => {
                            if (val.semester === semester) {
                                return (
                                    <tr key={index}>
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
                                            <i className="fa-solid fa-trash actions-icon fa-lg" style={{ "margin": "0 0.8rem 0 0", "color": "#ff2525" ,"display" : "flex"}}
                                                data-toggle="tooltip" title="Delete"
                                                onClick={() => {
                                                    setFileID(val.fileID);
                                                    (val.type === "Playlist") ? isPlaylist("true") : isPlaylist("false");
                                                    actions("delete", val, index);
                                                }} />
                                            <i className="fa-regular fa-pen-to-square actions-icon fa-lg" style={{ "margin": "0 0.8rem 0 0", "color": "#48ff72", "display": "flex" }}
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
                            }
                            else {
                                return null;
                            }
                        })
                        }
                        {data !== null && !props.courseCode && !type && filter_desc && !semester && data.map((val, index) => {
                            if (val.description.includes(filter_desc)) {
                                return (
                                    <tr key={index}>
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
                                            <i className="fa-solid fa-trash actions-icon fa-lg" style={{ "margin": "0 0.8rem 0 0", "color": "#ff2525" ,"display" : "flex"}}
                                                data-toggle="tooltip" title="Delete"
                                                onClick={() => {
                                                    setFileID(val.fileID);
                                                    (val.type === "Playlist") ? isPlaylist("true") : isPlaylist("false");
                                                    actions("delete", val, index);
                                                }} />
                                            <i className="fa-regular fa-pen-to-square actions-icon fa-lg" style={{ "margin": "0 0.8rem 0 0", "color": "#48ff72", "display": "flex" }}
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
                            }
                            else {
                                return null;
                            }
                        })
                        }
                    </tbody>
                </table>}
                {data === null && <Loader />}
            </div>
        </>
    );
}

export default CurrentData;