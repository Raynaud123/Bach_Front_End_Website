import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Unauthorized from "../../Login/Unauthorized"
import Select from 'react-select'
import makeAnimated from 'react-select/animated'


export default function Assign_Masterproef(props){
    const id = props.persoonid;
    const topic_id = useParams().topicid;


    const [Topic,setTopic] = useState([]);
    const [Studenten,setStudenten] = useState([]);
    const [Value,setValue] = useState([]);
    const [Vol,setVol] = useState(false);
    const [Twee,setTwee] = useState(false);
    const [Display,setDisplay] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();

    const navigate = useNavigate();

    useEffect( () => {

        let isMounted = true;
        const controller = new AbortController();

        const getTopic = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/topic/" + topic_id,
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setTopic(response.data);
                console.log(Topic)
                if(response.data.aantal_studenten === 2){
                    setTwee(true);
                }else {
                    setTwee(false);
                }
            }catch (err){
                if(err.response.status == 401){
                    navigate("/unauthorized");
                    console.error(err);
                }
                else{
                    console.error(err);
                    navigate('/login', { state: { from: location }, replace: true });
                    console.log(errMsg);
                }
            }
        }

        const getStudenten = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/student/hided/" + id,
                    signal: controller.signal
                });
                console.log(response.data);
                setStudenten(response.data);
                console.log(Studenten);
            }catch (err){
                console.error(err);
                if(err.response.status === 500){
          //          TO-DO: Server Failed pagina?
                }
                else {
                    navigate('/login', { state: { from: location }, replace: true });
                    console.log(errMsg);
                }

            }
        }

        getStudenten()
        getTopic()
        },[])



    const handleChange = (e) =>{
        if (e.length === 2 && Twee){
            setVol(true);
        }else if (e.length == 1 && !Twee){
            setVol(true);
        }
        else {
            setVol(false);
        }
        setValue(e);
        // e.map(value => {
        //     console.log(value);
        //     setValue({id:value.value,name:value.label});
        // })
    }

    const handleOnclick = async (e) => {
        const ids = [];
        Object.entries(Value).map(([key,test]) =>{
            console.log(key);
            const jep = JSON.stringify(test);
            console.log(jep);
            const {label,value} = JSON.parse(jep);
            console.log(value);
            ids.push(value);
        })
        if(Vol){
            setDisplay(false);
            try {
                const response = await axiosPrivate({
                    method: "put",
                    url: "/topic/" + topic_id,
                    data: {
                        "student_id": ids,
                        "aantalStudenten" : Topic.aantal_studenten
                    }
 //                   signal: controller.signal
                });
                navigate("/assign" ,{replace:true});
            }catch (err){
                console.error(err);
                if(err.response.status === 500){
                    //          TO-DO: Server Failed pagina?
                }
                else if(err.response.status == 400){
                    console.log("id niet gevonden")
                }
                else if(err.response.status == 409){
                    console.log("Staat niet in de top 3 van de persoon")
                }
                else {
                    navigate('/login', { state: { from: location }, replace: true });
                    console.log(errMsg);
                }

            }
        }
        else{
            setDisplay(true);
        }
    }



    if(props.roles !== "MASTER"){
        return <Unauthorized/>
    }
    else{
        if(Topic.aantal_studenten === 2){
            return (
                <div>
                    <div>
                        <h1>Topic name: {Topic.topicName}</h1>
                        <p>Description: {Topic.description_topic}</p>
                    </div>
                    <div>
                        <div>
                            <h2>Students without Topic</h2>
                            {Display && <p>This is a  Topic for {Topic.aantal_studenten} Students</p>}
                            <Select
                                name="secondSelectt"
                                options={Studenten.map(e=>({label: e.username, value: e.id}))}
                                placeholder="Select studenten"
                                isSearchable
                                isMulti
                                isClearable
                                isOptionDisabled={(option) => Value.length >= 2}
                                onChange={handleChange}
                            />
                            <div> You have chosen for
                            {

                                Object.entries(Value).map(([key,test]) =>{
                                    console.log(key);
                                    if(key == "0"){
                                        const jep = JSON.stringify(test);
                                        console.log(jep);
                                        const {label,value} = JSON.parse(jep);
                                        console.log(label);
                                        return (` ${label} `)
                                    }else{
                                        const jep = JSON.stringify(test);
                                        console.log(jep);
                                        const {label,value} = JSON.parse(jep);
                                        return(`and ${label}`);
                                    }
                                })
                            }
                            </div>
                            <button onClick={handleOnclick}>Submit here</button>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return(
                <div>
                    <div>
                        <h1>Topic name: {Topic.topicName}</h1>
                        <p>Description: {Topic.description_topic}</p>
                    </div>
                        <div>
                            <div>
                                <h2>Studenten zonder Topic, met dit topic in hun top 3</h2>
                                <Select
                                name="secondSelectt"
                                options={Studenten.map(e=>({label: e.username, value: e.id}))}
                                placeholder="Select studenten"
                                isSearchable
                                onChange={handleChange}
                                />
                                <p> You have chosen {Value.name} for this topic</p>
                            </div>
                        </div>
                </div>
            )
        }

    }
}