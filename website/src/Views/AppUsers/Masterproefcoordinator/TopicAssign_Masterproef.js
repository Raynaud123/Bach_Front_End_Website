import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";

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
            <h4>Studenten zonder topic</h4>
            {Studenten.map((student) => {
                return(<p>{student.username}</p>)
            })}
            <h4>Topics zonder student</h4>
            {Topics.map((topic) => {
                return(<p>{topic.topicName}</p>)
            })};
        </div>
    )
}