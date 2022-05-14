import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Unauthorized from "../../Login/Unauthorized"
import Select from 'react-select'


export default function BoostComponent(props){
    const topic_id = props.id;

    const [AantalStudenten,setAantalStudenten] = useState();
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


    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();
        console.log(topic_id);


        const getTopic = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: `/topic/${topic_id}`,
                    signal: controller.signal
                });
                if(response.data.aantal_studenten == 2){
                    setTwee(true)
                }else setTwee(false);
            } catch (err) {

                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        getTopic();

        const getStudenten = async () => {
            try {
            const response = await axiosPrivate({
                method: "get",
                url: "/student/hided/boost/" + topic_id,
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

        }}
        getStudenten();

    },[])

    const handleChange = (e) =>{
        console.log(e);
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

    const handleOnclick = async (e) => {
        const ids = [];
        console.log(Vol)
        console.log("twee" + Twee);
        if (Twee && Vol){
            Object.entries(Value).map(([key,test]) =>{
                console.log(key);
                const jep = JSON.stringify(test);
                console.log(jep);
                const {label,value} = JSON.parse(jep);
                console.log(value);
                ids.push(value);
            })
        }else if(!Twee && Vol){
            Object.entries(Value).map((test) => {
                if(test[0] === "value"){
                    ids.push(test[1])
                }
            })
        }
        console.log(ids);
        if(Vol){
            setDisplay(false);
            try {
                const response = await axiosPrivate({
                    method: "put",
                    url: "/topic/boost/" + topic_id,
                    data: {
                        "studentId": ids,
                    }
                    //                   signal: controller.signal
                });
                navigate("/topic" ,{replace:true});
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


    if(Twee){
            return (
                <div>
                    <h2>Choose a student to boost</h2>
                    {Display && <p>This is a  Topic for {AantalStudenten} Students</p>}
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
                </div>)
        }else {
            return (
                <div>
                <h2>Choose a student to boost</h2>
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
                                console.log(test);
                                if(test[0] === "label"){
                                    return (` ${test[1]}`)
                                }
                            })
                        } for this topic
                    </p>}
                    <button onClick={handleOnclick}>Submit here</button>
            </div>)
        }
}