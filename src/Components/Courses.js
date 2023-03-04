import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Apiservice from '../Apiservice';
import Cards from './Cards'
import EditCourse from './EditCourse';
import Loader from './Loader';

export default function Courses(props) {
    const [data, setData] = useState(null);
    const [editmode, setEditmode] = useState(false);
    const [editdata, setEditdata] = useState(null);

    useEffect(()=>{
        try{
            axios.get(Apiservice + "/courses/")
            .then((response)=>{
                console.log(response.data);
                setData(response.data);
            })
            .then((responsedata)=>{

            })
        } catch(err){
            console.log(err);
        }
    }, [])

    return (
        <>
            <div style={{ "textAlign": "right" }}>
                <button className='btn btn-outline-success' style={{"margin": "1rem"}} onClick={props.title}>
                <i className="fa fa-solid fa-plus" /> ADD COURSE
                </button> 
            </div>
            {data!==null && editmode===false && data.map((value, index)=>{
                return <Cards data = {value} index = {index} refresh = {()=>{props.refresh()}} edit={()=>{setEditmode(true);setEditdata(value)}}/>
            })}
            {data!==null && editmode===true && <EditCourse data = {editdata} refresh = {()=>{props.refresh(); setEditmode(false)}}/>}
            {data===null && <div style={{'display': "flex", "justifyContent": "center"}}><Loader /></div>}
        </>
    )
}
