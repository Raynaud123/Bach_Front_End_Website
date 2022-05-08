import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {BsCheck, BsXCircle} from "react-icons/all";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";


export default function TopicInfo_Student(props) {

    const masterid = props.persoonid;
    const topicid = props.topicid;
    const [Topic, setTopic] = useState([]);
    const [Provider, setProvider] = useState([]);
    const [Promotor, setPromotor] = useState([]);
    const [TargetAudience, setTargetAudience] = useState([]);
    const [Keyword, setKeyword] = useState([]);


    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(async () => {
        let isMounted = true;
        const controller = new AbortController();

        const getTopic = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/topic/" + topicid,
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setTopic(response.data);
                await getTargetAudience(response.data.targetAudience_list);
                await getKeywords(response.data.keyword_list);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getTargetAudience = async (targetAudienceList) => {
            try {
                setTargetAudience(targetAudienceList);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getKeywords = async (keywords) => {
            try {
                setKeyword(keywords);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        await getTopic();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    async function submitApprove(approve) {
        console.log("Approve: " + approve);
        try {
            const response = await axiosPrivate({
                method: "put",
                url: "http://localhost:8080/master/" + masterid + "/approve/" + approve + "/topic/" + topicid,
            });
            console.log(response)
            navigate("/approve", { replace: true });
            // await updateStudents();
        } catch(error) {
            console.log(error)
        }
    }

    return(
        <div className={"showTopicInfo"}>
            <h1 className={"topicTitleInfo"}>{Topic.topicName}</h1>
            <div className={"topicinfocontainer"}>
                <div>
                    <div className={"topicmetButtons"}>
                        <h2 className={"OverflowAuto"}>Topic Information</h2>
                        <div className={"NotButtons"}>
                            <button className={"ButtonV"}>
                                <BsCheck onClick={() => submitApprove(true)}/>
                            </button>
                            <button className={"ButtonX"} >
                                <BsXCircle onClick={() => submitApprove(false)}/>
                            </button>
                        </div>
                    </div>
                    <div className={"sectie"}>
                        <div>Description: <div className={"content sectie"}>&emsp;{Topic.description_topic}</div></div>
                        <br/>
                        Provider: {Topic.provider?
                        <div className={"Approved content sectie"}>
                            <div>&emsp;{Topic.provider.name} </div>
                            <div>{Topic.provider.approved? "Provider is approved":"Provider is not apprroved"}</div>
                        </div> : "None"}
                        <br/>
                        Promotor: {Topic.promotor?
                        <div className={"Approved content sectie"}>
                            <div>&emsp;{Topic.promotor.firstName} {Topic.promotor.lastName}</div>
                            <div>{Topic.promotor.approved? "Promotor is approved":"Promotor is not apprroved"}</div>
                        </div> : "None"}
                        <br/>
                        TargetAudience: {TargetAudience.map((target) => (
                            <div key={target.id} className={"content sectie"}>
                                &emsp; {target.campus.campus_name} & {target.course.course_name}</div>
                        ))}
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    )
}

