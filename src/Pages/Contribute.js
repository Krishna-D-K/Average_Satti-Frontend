import React, { useEffect, useState } from 'react'
import "../Styles/ContributeStyle.css";
import { useParams } from 'react-router-dom'
import Apiservice from '../Apiservice';
import axios from 'axios';
import Loader from '../Components/Loader';

export default function Contribute() {
  const { code } = useParams();
  const [details, setDetails] = useState(null);
  const [file, setFile] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [success, setSuccess] = useState("none");
  const [alert, setAlert] = useState("none");
  const [isLoading, setIsLoading] = useState(false);

  const resetData = () => {
    setDesc("");
    setFile("null");
    setType("");
    setName("");
    setRollNo("");
    setUrl("");
    setAnonymous(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData();
    // console.log(file);
    formdata.append("file", file);
    formdata.append("type", type);
    formdata.append("name", name);
    formdata.append("semester", details.semester);
    formdata.append("courseCode", code);
    formdata.append("rollNo", rollNo);
    formdata.append("url", url);
    formdata.append("desc", desc);
    formdata.append("anonymous", anonymous);

    try {
      await axios.post(Apiservice + "/content/upload", formdata, {
        headers: {
          "Content-Type": "multipart/form-data" // formdata can only be passed to backend if we have multer installed as package.
        }
      }).then((res) => {
        // console.log(res);
        setIsLoading(false);
        if (res.status === 200) {
          resetData();
          setSuccess("block");
        }
        else {
          setAlert("block");
        }
      })
    }
    catch (err) {
      console.log(err);
      setIsLoading(false);
      setAlert("block");
    }
  }

  useEffect(() => {
    try {
      axios.get(Apiservice + `/courses/${code}`).then(async (response) => {
        await setDetails(response.data[0]);
      }).then((res) => {
      })
    } catch (err) {
      console.log(err);
    }
  }, [])

  return (
    <>
      <div className="contribute-container">
        <div className="contributeHeading">
          <h1>Contribute</h1>
          <hr/>
        </div>
        <div className='contribute-container-form'>
          {details !== null && <form onSubmit={handleSubmit}>
            <div style={{ "display": "flex", "alignItems": "center" }}>
              <div className="contribute-form-group">
                <label htmlFor="exampleInputEmail1">Course Name &emsp;</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={details.courseName} disabled />
              </div>
              <div className="contribute-form-group">
                <label htmlFor="exampleInputEmail1">Course Code &emsp;</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={details.courseCode} disabled />
              </div>
            </div>
            <div style={{ "display": "flex", "alignItems": "center" }}>
              <div className="contribute-form-group">
                <label htmlFor="exampleFormControlSelect1">Semester &emsp;</label>
                <select className="form-control" id="exampleFormControlSelect1" value={details.semester} disabled>
                  <option value="">-SELECT-</option>
                  <option value="FIRST">FIRST</option><option value="SECOND">SECOND</option>
                  <option value="THIRD">THIRD</option><option value="FOURTH">FOURTH</option>
                  <option value="FIFTH">FIFTH</option><option value="SIXTH">SIXTH</option>
                  <option value="SEVENTH">SEVENTH</option><option value="EIGHTH">EIGHTH</option>
                  <option value='NINTH'>NINTH</option><option value="TENTH">TENTH</option>
                </select>
              </div>
              <div className="contribute-form-group">
                <label htmlFor="exampleFormControlSelect1">Credits &emsp;</label>
                <select className="form-control" id="exampleFormControlSelect1" value={details.credits} disabled>
                  <option value="">-SELECT-</option>
                  <option value="1">1</option><option value="2">2</option>
                  <option value="3">3</option><option value="4">4</option>
                </select>
              </div>
            </div>
            <div style={{ "display": "flex", "alignItems": "center" }}>
              <div className="contribute-form-group">
                <label htmlFor="exampleInputEmail1">Your Name &emsp;</label>
                <input type="text" className="form-control" placeholder='Enter you name' value={name} onChange={(e) => setName(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"required />
              </div>
              <div className="contribute-form-group">
                <label htmlFor="exampleInputEmail1">Roll Number &emsp;</label>
                <input type="text" className="form-control" placeholder='Enter your Roll Number' value={rollNo} onChange={(e) => setRollNo(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"required />
              </div>
            </div>
            <div style={{ "display": "flex", "alignItems": "center" }}>
              <div className="contribute-form-group">
                <label htmlFor="exampleFormControlSelect1">Type &emsp;</label>
                <select className="form-control" id="exampleFormControlSelect1" onChange={(e => setType(e.target.value))} required>
                  <option value="">-SELECT-</option>
                  <option value="Assignment">Assignment</option><option value="Test">Test</option>
                  <option value="Reference Material">Reference Material</option><option value="Question Paper">Question Paper</option>
                  <option value="Notes">Notes</option><option value="Playlist">Playlist</option>
                </select>
              </div>
              {type !== null &&
                <div className="contribute-form-group">
                  <label htmlFor="exampleInputEmail1">Description &emsp;</label>
                  <input type="text" className="form-control" value={desc} onChange={(e) => setDesc(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" required />
                </div>
              }
            </div>
            {type !== null && type !== "Playlist" && <>
              <div style={{ "display": "flex", "alignItems": "center" }}>
                <div className="contribute-form-group" style={{ "width": "100%", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                  <label htmlFor="exampleInputEmail1">Upload File &emsp;</label>
                  <input type="file" className="form-control" placeholder='Name' onChange={(e) => setFile(e.target.files[0])} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
              </div>

              <input type="checkbox" name="anonymous" onChange={(e) => setAnonymous(e.target.checked)} id="anonymous" /><label htmlFor='anonymous'>&ensp; Post as anonymous <i>(The name and roll number will be stored in the database but not displayed over the website.)</i></label>
              <span style={{ "display": "flex", "justifyContent": "center" }}><button type="submit" className="btn btn-primary" style={{ "textAlign": "center", "width": "20%" }}>Submit</button></span>
            </>
            }
            {type !== null && type === "Playlist" && <>
              <div style={{ "display": "flex", "alignItems": "center" }}>
                <div className="contribute-form-group" style={{ "width": "100%", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                  <label htmlFor="exampleInputEmail1">Insert playlist link &emsp;</label>
                  <input type="text" className="form-control" value={url} placeholder='Link' onChange={(e) => setUrl(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
              </div>

              <input type="checkbox" name="anonymous" onChange={(e) => setAnonymous(e.target.checked)} id="anonymous" /><label htmlFor='anonymous'>&ensp; Post as anonymous <i>(The name and roll number will be stored in the database but not displayed over the website.)</i></label>
              <span style={{ "display": "flex", "justifyContent": "center" }}><button type="submit" className="btn btn-primary" style={{ "textAlign": "center", "width": "20%" }}>Submit</button></span>
            </>
            }
          </form>}
          {isLoading && <div style={{"display": "flex", "justifyContent": "center"}}><Loader /></div>}
          <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ "display": `${success}`, "width": "60%", "margin": "0 auto", "color": "red" }}>
            <strong>Done!!</strong> Thanks for your contribution. <span style={{ "color": "red" }}>&#10084;</span>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setSuccess("none")}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ "display": `${alert}`, "width": "60%", "margin": "0 auto" }}>
            <strong>Oops!!</strong> Unable to edit. Try again later.
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setAlert("none")}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
