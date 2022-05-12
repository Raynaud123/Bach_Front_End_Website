import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {HiUsers} from "react-icons/all";

export default function TopicAssign_Masterproef(props){

    const id = props.persoonid;

    const [Studenten,SetStudenten] = useState([]);
    const [Topics,SetTopics] = useState([]);


    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const navigate = useNavigate();
    const [errMsg] = useState('');

    useEffect(() => {

        let isMounted = true;
        //cancel request if component is unmountend
        const controller = new AbortController();

        const getStudenten =async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/student/hided/" + id,
                    signal: controller.signal
                });
                console.log(response.data);
                SetStudenten(response.data);
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
        const getTopics =async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/topic/hided/" + id,
                    signal: controller.signal
                });
                console.log(response.data);
                SetTopics(response.data);
                console.log(Topics);
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

        getStudenten();
        getTopics();
    },[])


    return(
        <div >
            <h1>Assign</h1>
            {/*<h4>Studenten zonder topic</h4>*/}
            {/*{Studenten.map((student) => {*/}
            {/*    return(<p>{student.username}</p>)*/}
            {/*})}*/}
            {/* zoekfunctie */}
            <div>

            </div>
            <h4>Topics zonder student</h4>
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
                                    pathname: `/topics/assign/${topic.topic_id}`,
                                }}
                                >Assign</Link></button>
                        </div>
                    </div>
                </div>)
            })}
        </div>
    )
}