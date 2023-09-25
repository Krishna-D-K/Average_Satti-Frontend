import axios from "axios";
import { useEffect, useState } from "react";
import Apiservice from "../Apiservice";
import "../Styles/HomeStyle.css";
import Loader from "../Components/Loader";
import imageTemplate from "../images/avatar.png";
import { Link } from "react-router-dom";

function Home() {
  const [coursesCount, setCoursesCount] = useState("");
  const [content, setContent] = useState("")
  const [contributors, setContributors] = useState("")
  const [loading, isLoading] = useState(false);
  const [admins, setAdmins] = useState([]);

  const getData = async () => {
    const urls = ["/courses/count", "/content", "/admins"];
    isLoading(true);
    await Promise.all(
      urls.map(async (url) => {
        await axios.get(Apiservice + url).then((res) => {
          switch (url) {
            case "/courses/count": {
              setCoursesCount(res.data);
              break;
            }
            case "/content": {
              setContent(res.data.content);
              setContributors(res.data.contributors);
              break;
            }
            case "/admins": {
              setAdmins(res.data);
              break;
            }
            default: {

            }
          }
        })
      })
    ).then(() => {
      isLoading(false);
    })
  }
  // console.log(admins);
  useEffect(() => {
    getData();
  }, []);

  if (!loading) {
    return (
      <>
        <div className="binder">
          <div className="divider">
            <div className="leftHalf">
              <div className="leftHalf-title">
                <div className="fromAdmins">From the Admins...</div>
                <hr />
              </div>
              <div className="leftHalf-content">
                <div className="blog">
                  <div className="blogTitle">
                    📌Welcome to y'all!
                  </div>
                  <div className="blogDetails">
                    Posted on: 12/06/2023
                  </div>
                  <div className="blogContent">
                    Glad to see you here. This site is intended to provide effective and up-to-date study materials related to Electrical Engineering courses. Try to explore the site in following ways:
                      <li>Try to find the courses in the <Link to='/courses'>Courses</Link> section of the navbar. Get all related materials by clicking on the specific course.</li>
                      <li>If you wish to contribute material to a specific course, go to the specific course, and click on Contribute to contribute. </li>
                      <li>Since the contributed material is up on the website instantly, try <span style={{color: "cornflowerblue"}}>NOT TO SPAM</span> with irrelevant materials.</li>
                      <li>The admins have the right to add or delete any course, any material on the site. Contact admins convey any thoughts about it.</li>
                      <li>The contributors' list is availabe on the <Link to='/contributors'>Contributors</Link> section of the navbar.</li>
                    Finally, we are open to any contribution to the codebase via the <a href="https://github.com/Krishna-D-K/Average_Satti-Frontend" target="_blank" rel="noreferrer">Github</a> link provided in navbar. <br />
                    That's it! You're now part of this awesome community. If you have any questions or feedback, feel free to contact us anytime. Thanks for joining!
                  </div>
                </div>
                <div className="blog">
                  <div className="blogTitle">
                    📌Welcome to y'all!
                  </div>
                  <div className="blogDetails">
                    Posted on: 12/06/2023
                  </div>
                  <div className="blogContent">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum maiores laudantium perspiciatis unde error esse eos, quos, reprehenderit enim necessitatibus excepturi, illo sequi molestias accusamus molestiae odit animi earum eligendi?
                    Odit aliquam excepturi sunt incidunt corporis dignissimos nesciunt similique. Quam doloribus ex culpa voluptatum voluptate nulla, illum nesciunt quidem repellat eum expedita, nisi reprehenderit, eaque cupiditate nobis. Suscipit, magni maxime?
                    Obcaecati at alias quos cupiditate enim quas dolor est quis earum architecto. Recusandae quaerat vero sint exercitationem dignissimos soluta fuga sequi! Nobis ratione ullam perspiciatis nihil ducimus similique, eligendi soluta.
                    Fuga tenetur atque nulla sint earum et omnis hic at cupiditate eius debitis architecto praesentium blanditiis, odio exercitationem. Dolorem voluptatem repellat libero quisquam illo reiciendis expedita quae asperiores aliquam perspiciatis!
                    Voluptate pariatur a hic obcaecati repellendus. Itaque, deleniti tempore eius pariatur facere alias sapiente magnam, est, veritatis quidem eligendi sed sint nesciunt quas commodi? Vel voluptatibus ipsam facilis accusantium beatae.
                  </div>
                </div>
              </div>
            </div>
            <div className="rightHalf">
              <div className="rightBox">
                <div className="statistics">
                  <div>PROUD TO HAVE </div>
                  Total Courses: {coursesCount && <span>{coursesCount}</span>} <br />
                  Total Content: {content && <span>{content}</span>} <br />
                  Total Contributors: {contributors && <span>{contributors}</span>} <br />
                </div>
              </div>
              <div className="rightBox">
                <div className="recentAdmin">
                  <div>CURRENT ADMINS </div>
                  <ul>
                    {admins && admins.map((val,index)=>{
                      return <li><a href={`mailto:${val.email}`}>{val.name}</a></li>
                    })}
                  </ul>
                </div>
              </div>
              <div className="rightBox">
                <div className="contributors">
                  <div>TOP CONTRIBUTORS </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  else {
    return (
      <div style={{position:"absolute", top:0, left:0, zIndex:1021, backgroundColor:"black", display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", margin: "auto auto" }}>
        <Loader />
      </div>
    )
  }
}

export default Home