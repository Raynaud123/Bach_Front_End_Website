import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Unauthorized from "../../Login/Unauthorized"
import Select from 'react-select'
import "../../../Styles/Home.css"
import "../../../Styles/Register.css"


export default function Assign_Masterproef(props){
    const id = props.persoonid;
    const topic_id = useParams().topicid;


    const [Topic,setTopic] = useState([]);
    const [Studenten,setStudenten] = useState([]);
    const [Value,setValue] = useState([]);
    const [Null,setNull] = useState(false);
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
                //console.log(response.data);
                isMounted && setTopic(response.data);
                //console.log(Topic)
                if(response.data.aantal_studenten === 2){
                    setTwee(true);
                }else {
                    setTwee(false);
                }
            }catch (err){
                if(err.response.status === 401){
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
                    url: "/student/hided/" + id + "/" + topic_id,
                    signal: controller.signal
                });
                //console.log(response.data);
                setStudenten(response.data);
                //console.log(Studenten);
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
        //console.log(e);
        if(e !== null){
            setNull(false);
            if (e.length === 2 && Twee){
                setVol(true);
            }else if (!Twee){
                setVol(true);
            }
            else {
                setVol(false);
            }
        }
        else{
            setNull(true);
        }

        setValue(e);
    }

    const handleOnclick = async () => {
        const ids = [];
        if (Twee && Vol){
            Object.entries(Value).map(([test]) =>{
                //console.log(key);
                const jep = JSON.stringify(test);
                //console.log(jep);
                const {value} = JSON.parse(jep);
                //console.log(value);
                ids.push(value);
            })
        }else if(!Twee && Vol){
            Object.entries(Value).map((test) => {
                if(test[0] === "value"){
                    ids.push(test[1])
                }
            })
        }

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
                else if(err.response.status === 400){
                    console.log("id niet gevonden")
                }
                else if(err.response.status === 409){
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
                <div className={"standaard"}>
                    <div>
                        <h1>Topic name: {Topic.topicName}</h1>
                        <p>Description: {Topic.description_topic}</p>
                        <p>Students Amount: {Topic.aantal_studenten}</p>
                    </div>
                    <div>
                        <div className={"form-style-1"}>
                            <h2>Students without Topic</h2>
                            {Display && <p>This is a  Topic for {Topic.aantal_studenten} Students</p>}
                            <Select
                                name="secondSelectt"
                                options={Studenten.map(e=>({label: e.username, value: e.id}))}
                                placeholder="Select studenten"
                                isSearchable
                                isMulti
                                isClearable
                                isOptionDisabled={() => Value.length >= 2}
                                onChange={handleChange}
                            />
                            <div> You have chosen for
                            {

                                Object.entries(Value).map(([key,test]) =>{
                                    //console.log(key);
                                    if(key === "0"){
                                        const jep = JSON.stringify(test);
                                        //console.log(jep);
                                        const {label} = JSON.parse(jep);
                                        //console.log(label);
                                        return (` ${label} `)
                                    }else{
                                        const jep = JSON.stringify(test);
                                        //console.log(jep);
                                        const {label} = JSON.parse(jep);
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
                <div className={"standaard"}>
                    <div>
                        <h1>Topic name: {Topic.topicName}</h1>
                        <p>Description: {Topic.description_topic}</p>
                    </div>
                        <div>
                            <div className={"form-style-1"}>
                                <h2>Students without Topic</h2>
                                {Display && <p>Not Full</p>}
                                <Select
                                name="secondSelectt"
                                options={Studenten.map(e=>({label: e.username, value: e.id}))}
                                placeholder="Select Students"
                                isSearchable
                                isClearable
                                onChange={handleChange}
                                />
                                {!Null && <p> You have chosen
                                    {
                                        Object.entries(Value).map((test) => {
                                            //console.log(test);
                                            if(test[0] === "label"){
                                                return (` ${test[1]}`)
                                            }
                                        })
                                    } for this topic
                                </p>}
                                <button onClick={handleOnclick}>Submit here</button>
                            </div>
                        </div>
                </div>
            )
        }

    }
}