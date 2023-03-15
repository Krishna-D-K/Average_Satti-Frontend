import axios from "axios";
import { useEffect, useState } from "react";
import Apiservice from "../Apiservice";
import Book from "../Components/Book";
import PageTitle from "../Components/PageTitle";
import "../Styles/HomeStyle.css";
import imageUrl from "../images/blue-tick.png";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import imageTemplate from "../images/avatar.png";

function Home() {
  const [coursesCount, setCoursesCount] = useState("");
  const [content, setContent] = useState("")
  const [contributors, setContributors] = useState("")
  const [courses, setCourses] = useState([]);
  const [loading, isLoading] = useState(false);
  const [admins, setAdmins] = useState([]);

  const getData = async () => {
    const urls = ["/courses/count", "/content", "/courses", "/admins"];
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
            case "/courses": {
              setCourses(res.data);
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

  useEffect(() => {
    getData();
  }, []);

  if (!loading) {
    return (
      <>
        <div className="book-container">
          <Book />
        </div>
        <div id="fly-in">
          <div><span>Electrical</span>Machines</div>
          <div>Analog<span>Electronics</span></div>
          <div>Signals Systems<span></span></div>
          <div>Power <span>Electronics</span></div>
          <div><span>Digital</span>Signal Processing</div>
          <div>Power Systems</div>
          <div>Embedded<span> Systems</span></div>
          <div><span>	POWER SYSTEMS</span></div>
        </div>
        <PageTitle />
        <div id="flicker-lights">
          AVERAGE_SATTI
        </div>
        <div id="slider-container">
          <div className="slider">
            <div className="slide-track">
              {courses.length !== 0 && courses.map((value, index) => {
                return (
                  <div className="slide" key={index}>
                    <Link to={`/content/${value.courseCode}`}><div className="box box2">
                      <div className="evenboxinner">{value.semester}</div>
                      <div className="profile-container">
                        <div className="our-team">
                          <div className="picture">
                            <img className="img-fluid" src={imageUrl} />
                          </div>
                          <div className="team-content">
                            <h3 className="name">{value.courseName}</h3>
                          </div>
                        </div>
                      </div>
                    </div></Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div> <br /><br />
        <div className="home-courses-title">
          Name any course, you'll find it. <br />
        </div>
        <div className="courses-intro">
          The courses of specific years are added and/or removed by the admins of that year. If any course has to be added or removed, or if you find any content uploaded on the website unsatisfactory, connect with the admins.
        </div> <br /><br />
        <article className="flow">
          <div id={"the-admins"} className="home-courses-title">
            The Admins <br />
          </div>
          <div className="team">
            <ul className="auto-grid" role="list">
              {admins && admins.map((admin, index) => {
                return (
                  <li className="profile" key={index}>
                    <h2 className="profile__name">{admin.name}</h2>
                    <div className="social-links">
                      <a href={admin.fblink} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-facebook-f fa-lg"></i>
                      </a>
                      <a href={admin.linkedinLink} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-linkedin-in fa-lg"></i>
                      </a>
                      <a href={`mailto:${admin.email}`} target="_blank" rel="noreferrer">
                        <i className="fa-solid fa-envelope fa-lg"></i>
                      </a>
                    </div>
                    {admin.image !== "" && <img alt={admin.name} src={`https://drive.google.com/uc?export=view&id=${admin.image.substring(32, 65)}`} />}
                    {admin.image === "" && <img alt={admin.name} src={imageTemplate} style={{ backgroundColor: "#ffffff66" }} />}
                  </li>
                )
              })}
            </ul>
          </div>
        </article>
        <div className="home-courses-title">
          Sharing is caring <br />
        </div>
        <div className="courses-intro">
          The content you share is up on the website instantly, making it extremely useful for others. You even get a download link for the file to view it offline!!
          {/* Contributors: {contributors} {content} {courses} */}
          <div className="homepage-nums">
            <div className="homenum">
              <div className="homenum_num">{contributors}</div><span>Contributors</span>
            </div>
            <div className="homenum">
              <div className="homenum_num">{content}</div><span>Total Content</span>
            </div>
            <div className="homenum">
              <div className="homenum_num">{coursesCount}</div><span>Total Courses</span>
            </div>
          </div>
        </div> <br /><br />
        <div className="home-courses-title">
          And finally ... <br />
        </div>
        <div className="courses-intro">
          The website can be improved a lot, be it UI/UX development, or the complete website entirely, and we would be more than happy to recieve input from y'all. <br />
          The source code is over Github and you are free to push relevant changes to it.
        </div> <br /><br />
      </>
    )
  }
  else {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "99vw", height: "99vh", margin: "auto auto" }}>
        <Loader />
      </div>
    )
  }
}

export default Home