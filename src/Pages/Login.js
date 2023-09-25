import { useState } from "react"
import { useSignup } from "../hooks/useSignup";

export default function Login() {

    const [type, setType] = useState("password");
    const [classname, setClassname] = useState("fa-solid fa-eye-slash");
    const [rollNo, setRollNo] = useState("");
    const [password, setPassword] = useState("");
    const {signup, error} = useSignup();
    
    const loginUser = async (e) => {
        e.preventDefault();
        // console.log(rollNo,password);
        await signup(rollNo, password);
    }

    return (
        <>
            <section style={{"marginTop": "2rem", "position": "relative", "zIndex": "0"}}>
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="err_loading_image" />
                        </div>
                        <div className="col-md-8 col-sm-6 col-xl-3 offset-l-1">
                            <form onSubmit={loginUser}>

                                <h3 className="divider d-flex align-items-center my-4" style={{"color": "cornflowerblue", "font-family":"'Laila', sans-serif"}}>Login</h3>
                                {/* Email input */}
                                <div className="form-outline mb-3">
                                    <input type="text" value={rollNo} onChange={(e)=>setRollNo(e.target.value)} id="form3Example3" className="form-control form-control" placeholder="Enter your roll number" required/>
                                </div>
                                {/* Password input */}
                                <div className="form-outline mb-3" style={{"display": "flex", "backgroundColor": "white", "borderRadius": "0.25rem"}}>
                                    <input type={type}  value={password} onChange={(e)=>setPassword(e.target.value)} id="form3Example4" className="form-control form-control" placeholder="Enter password" style={{"border":"none", "borderRadius": "0.25rem 0 0 0.25rem"}} required/>
                                    <label htmlFor="form3Example4" 
                                    style={{"width": "10%", "display": "flex", "justifyContent": "center", "alignItems": "center", "fontSize": "1rem", "border":"none", "padding": "0.5rem 1rem", "marginBottom": "0", "borderRadius": "0", "cursor":"pointer"}}
                                    onClick={()=>{
                                        if(type==="password"){
                                            setType("text");
                                            setClassname("fa-solid fa-eye");
                                        }
                                        else{
                                            setType("password");
                                            setClassname("fa-solid fa-eye-slash");
                                        }
                                    }}
                                    ><i className={classname}></i></label>
                                </div>
                                {error && <div className="login-err" style={{"color": "red"}}>{error}</div>}
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn " style={{ padding: '0.5rem 1.2rem', "color": "black" ,"backgroundColor" : "cornflowerblue", "font-family":"'Laila', sans-serif"}}>Login</button>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div> <br /> 
            </section>

        </>
    )
}
