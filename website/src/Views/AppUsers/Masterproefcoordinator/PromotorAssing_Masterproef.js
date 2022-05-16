import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {HiUsers} from "react-icons/all";
import "../../../Styles/Home.css";


export default function PromotorAssing_Masterproef(props){

    const id = props.persoonid;

    const [Empty,setEmpty] = useState(false);
    const [Topics,SetTopics] = useState([]);


    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const navigate = useNavigate();
    const [errMsg] = useState('');

    useEffect(() => {

        //cancel request if component is unmountend
        const controller = new AbortController();
        const getTopics =async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/topic/hided/promotor/" + id,
                    signal: controller.signal
                });
                //console.log(response.data);
                if(response.data.length ===0){
                    setEmpty(true);
                }
                else {
                    setEmpty(false);
                }
                SetTopics(response.data);
                //console.log(Topics);
            }catch (err){
                console.error(err);
                if(err.response.status === 500){
                }
                else {
                    navigate('/login', { state: { from: location }, replace: true });
                    console.log(errMsg);
                }

            }
        }

        getTopics();
    },[])


    return(
        <div className={"standaard"}>
            <h1>Assign</h1>

            {Empty && <p>Er moeten geen Promotoren toegewezen worden</p>}
            {!Empty &&
                <div><h4>Topics zonder Promotor</h4>
                {Topics.map((topic) => {
                    return(<div className={"topiccontainer"}>
                        <div key={topic.id} className={"topicbox"}>
                            <div className={"topicmetheart"}>
                                <div className={"topictitleinbox"}>
                                    {topic.topicName}
                                </div>
                            </div>
                            <div className={"topicDescriptionbox contentintopicbow"}>
                                {topic.description_topic}
                            </div>
                            <div className={"studentenmetinfo"}>
                                <div className={"topicAantalStudentenbox contentintopicbow"}>
                                    <HiUsers className={"persoonicoontopic"}/>
                                    <p>number of students: {topic.aantal_studenten}</p>
                                </div>
                                <button className={"info_topic_button"}>
                                    <Link to={{
                                        pathname: `/topic/promotor/assign/${topic.topic_id}`,
                                    }}
                                    >Assign</Link>
                                </button>
                            </div>
                        </div>
                    </div>)
                })}</div>}
        </div>
    )
}