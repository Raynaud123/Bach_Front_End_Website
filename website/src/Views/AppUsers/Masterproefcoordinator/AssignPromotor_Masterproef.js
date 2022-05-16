import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Unauthorized from "../../Login/Unauthorized"
import "../../../Styles/Home.css"
import "../../../Styles/Register.css"
import Select from 'react-select'


export default function AssignPromotor_Masterproef(props){
    const topic_id = useParams().topicid;


    const [Topic,setTopic] = useState([]);
    const [Promotoren,setPromotoren] = useState([]);
    const [Value,setValue] = useState([]);
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

        const getPromotoren = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/promotor/hided/ " + topic_id,
                    signal: controller.signal
                });
                //console.log(response.data);
                setPromotoren(response.data);
                //console.log(Promotoren);
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

        getPromotoren()
        getTopic()
    },[])



    const handleChange = (e) =>{
        //console.log(e);
        setValue(e);
    }

    const handleOnclick = async () => {
        let prom_id;
        Object.entries(Value).map((test) => {
            if(test[0] === "value"){
                prom_id = test[1]
            }
        })
        try {
                const response = await axiosPrivate({
                    method: "put",
                    url: "/topic/assing/"+prom_id + "/" + topic_id,
                });
                navigate("/promotor/assign" ,{replace:true});
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



    if(props.roles !== "MASTER"){
        return <Unauthorized/>
    }
    else{
        return (
            <div className={"standaard"}>
                <div>
                    <h1>Topic name: {Topic.topicName}</h1>
                    <p>Description: {Topic.description_topic}</p>
                </div>
                <div>
                    <div className={"form-style-1"}>
                        <h2>Promotors</h2>
                        {Display && <p>Not Full</p>}
                        <Select
                            name="secondSelectt"
                            options={Promotoren.map(e=>({label: e.username, value: e.id}))}
                            placeholder="Select Promotor"
                            isSearchable
                            isClearable
                            onChange={handleChange}
                        />
                        <p> You have chosen
                            {
                                Object.entries(Value).map((test) => {
                                    //console.log(test);
                                    if(test[0] === "label"){
                                        return (` ${test[1]}`)
                                    }
                                })
                            } for this topic
                        </p>
                        <button onClick={handleOnclick}>Submit here</button>
                    </div>
                </div>
            </div>
        )
    }
}