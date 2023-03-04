import axios from "axios";
import { useState } from "react"
import Apiservice from "../Apiservice";
import { useAuthContext } from "./useAuthContext";

export const useSignup =()=>{
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async(rollNo, password) =>{
        setError(null);

        await axios.post(Apiservice + "/login", {
            password: password,
            rollNo: rollNo
        }).then((res)=>{
            if(res.status===201){
                setError(`** ${res.data}`);
            }
            else{
                console.log(res.data);
                localStorage.setItem("user", JSON.stringify(res.data));
                dispatch({type: "LOGIN", payload: JSON.stringify(res.data)})

            }
        })
    }

    return {signup, error};
}