import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {BsCheck, BsXCircle} from "react-icons/all";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";


export default function TopicInfo_Student(props) {

    const masterid = props.persoonid;
    const companyid = props.companyid;
    const [Company, setCompany] = useState([]);
    const [TargetAudience, setTargetAudience] = useState([]);
    const [Topics, setTopics] = useState([]);



    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(async () => {
        let isMounted = true;
        const controller = new AbortController();

        const getCompany = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/topicprovider/" + companyid,
                    signal: controller.signal
                });
                //console.log(response.data);
                isMounted && setCompany(response.data);
                await getTA(response.data.targetAudience);
                await getTopics(response.data.topic);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getTA = async (ta) => {
            try {
                setTargetAudience(ta);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getTopics = async (topics) => {
            try {
                setTopics(topics);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }

        await getCompany();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    async function submitApprove(approve) {
        //console.log("Approve: " + approve);
        try {
            const response = await axiosPrivate({
                method: "put",
                url: "http://localhost:8080/master/" + masterid + "/approve/" + approve + "/topicprovider/" + companyid,
            });
            //console.log(response)
            navigate("/approve", { replace: true });
        } catch(error) {
            console.log(error)
        }
    }
    function showTopics() {
        return (
            <div>{Topics.map((topic) => (
                <div key={topic.id} className={"content sectie"}>
                    &emsp; {topic.topicName}</div>
            ))}
            </div>
        )
    }

    function showTargetAudience() {
        return (
            <div>
                {TargetAudience.map((target) => (
                    <div key={target.id} className={"content sectie"}>
                        &emsp; {target.campus.campus_name} & {target.course.course_name}</div>
                ))}
            </div>
        )
    }

    return(
        <div className={"showTopicInfo"}>
            <h1 className={"topicTitleInfo"}>{Company.name}</h1>
            <div className={"topicinfocontainer"}>
                <div>
                    <div className={"topicmetButtons"}>
                        <h2 className={"OverflowAuto"}>Topicprovider Information</h2>
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
                        <div>Email: <div className={"content sectie"}>{Company.email}</div></div>
                        <br/>
                        TargetAudience: {TargetAudience? showTargetAudience():<div className={"content sectie"}>No target audiences</div>}
                        <br/>
                        Topics: {Topics? showTopics():<div className={"content sectie"}>No topics </div>}
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    )
}

