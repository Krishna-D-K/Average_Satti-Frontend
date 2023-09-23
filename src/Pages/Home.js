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
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum maiores laudantium perspiciatis unde error esse eos, quos, reprehenderit enim necessitatibus excepturi, illo sequi molestias accusamus molestiae odit animi earum eligendi?
                    Odit aliquam excepturi sunt incidunt corporis dignissimos nesciunt similique. Quam doloribus ex culpa voluptatum voluptate nulla, illum nesciunt quidem repellat eum expedita, nisi reprehenderit, eaque cupiditate nobis. Suscipit, magni maxime?
                    Obcaecati at alias quos cupiditate enim quas dolor est quis earum architecto. Recusandae quaerat vero sint exercitationem dignissimos soluta fuga sequi! Nobis ratione ullam perspiciatis nihil ducimus similique, eligendi soluta.
                    Fuga tenetur atque nulla sint earum et omnis hic at cupiditate eius debitis architecto praesentium blanditiis, odio exercitationem. Dolorem voluptatem repellat libero quisquam illo reiciendis expedita quae asperiores aliquam perspiciatis!
                    Voluptate pariatur a hic obcaecati repellendus. Itaque, deleniti tempore eius pariatur facere alias sapiente magnam, est, veritatis quidem eligendi sed sint nesciunt quas commodi? Vel voluptatibus ipsam facilis accusantium beatae.
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
                <div className="recentAct">
                  <div>RECENTLY UPLOADED </div>
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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "99vw", height: "99vh", margin: "auto auto" }}>
        <Loader />
      </div>
    )
  }
}

export default Home