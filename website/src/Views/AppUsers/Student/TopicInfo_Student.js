import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";


export default function TopicInfo_Student() {

    const top = useParams();
    const [Topic, setTopic] = useState([]);
    const [Provider, setProvider] = useState([]);
    const [Promotor, setPromotor] = useState([]);
    const [TargetAudience, setTargetAudience] = useState([]);
    // const [Coordinator, setCoordinator] = useState([]);
    const [Keyword, setKeyword] = useState([]);


    const axiosPrivate = useAxiosPrivate();
    const [errMsg, setErrMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(async () => {
        let isMounted = true;
        const controller = new AbortController();

        const getTopic = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/topic/info/" + top.t,
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setTopic(response.data);
                await getProvider(response.data.provider_id);
                await getPromotor(response.data.promotor_id);
                // getCoordinator(response.data.coordinator_id);
                await getTargetAudience(response.data.targetAudience_list);
                await getKeywords(response.data.keyword_list);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getProvider = async (provid) => {
            if (provid !== "undefined") {
                try {
                    const response = await axiosPrivate({
                        method: "get",
                        url: "/topicprovider/" + provid,
                        signal: controller.signal
                    });
                    // console.log(response.data[0]);
                    isMounted && setProvider(response.data[0]);
                } catch (err) {
                    console.error(err);
                    navigate('/login', {state: {from: location}, replace: true});
                    console.log(errMsg);
                }
            }
        }
        const getPromotor = async (promid) => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/promotor/" + promid,
                    signal: controller.signal
                });
                // console.log(response.data);
                isMounted && setPromotor(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
                console.log(errMsg);
            }

        }
        // const getCoordinator = async (coordid) => {
        //     try {
        //         const response = await axiosPrivate({
        //             method: "get",
        //             url: "/masterproefcoordinator/" + coordid,
        //             signal: controller.signal
        //         });
        //         // console.log(response.data);
        //         isMounted && setCoordinator(response.data);
        //     } catch (err) {
        //         console.error(err);
        //         navigate('/login', {state: {from: location}, replace: true});
        //         console.log(errMsg);
        //     }
        //
        // }
        const getTargetAudience = async (targetAudienceList) => {
            // console.log(targetAudienceList);
            try {
                setTargetAudience(targetAudienceList);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getKeywords = async (keywords) => {
            // console.log(keywords);
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


    function PromInfo() {
        return(
        <div>
            {Promotor.firstName} {Promotor.lastName}
            <br/>
            <div>
                &emsp;  Email: {Promotor.email? <div>&emsp;&emsp;{Promotor.email}</div> : "None" }
            </div>
            <div>
                &emsp;  Phone number: {Promotor.phoneNumber? <div>&emsp;&emsp;{Promotor.phoneNumber}</div> : "None" }
            </div>
            <div>
                &emsp;  Address: {(Promotor.country && Promotor.city && Promotor.streetName)? <div>&emsp;&emsp;{Promotor.streetName} {Promotor.streetNumber}<br/>&emsp;&emsp;{Promotor.country} {Promotor.city}</div> : "None"}
            </div>
        </div>
    )}
    function ProvInfo() {
        return(
            <div>
                <div>
                    {Provider.name}
                    <br/>
                    <div>
                        &emsp;  Email: {Provider.email? <div>&emsp;&emsp;{Provider.email}</div> : "None" }
                    </div>
                    <div>
                        &emsp;  Phone number: {Provider.phoneNumber? <div>&emsp;&emsp;{Provider.phoneNumber}</div> : "None" }
                    </div>
                    <div>
                        &emsp;  Address: {(Provider.country && Provider.city && Provider.streetName)? <div>&emsp;&emsp;{Provider.streetName} {Provider.streetNumber}<br/>&emsp;&emsp;{Provider.country} {Provider.city}</div> : "None"}
                    </div>
                </div>
                <br/>
                <div>
                    {Promotor? PromInfo(): "No Promotor"}
                </div>

            </div>
        )
    }
    function KeywordInfo() {
        return(
            <div>
                Keywords: {Keyword? <div>{Keyword.map((keyword) => (<div> &emsp; {keyword.keyword_name}</div> ))}</div> : "None"}
            </div>
        )}

    return(
        <div className={"showTopics"}>
            <h1 className={"topicTitle title"}>{Topic.topicName}</h1>
            <div>
                <h3 className={"sectie title"}>Topic Information</h3>
                <div>Description: {Topic.description_topic}</div>
                <br/>
                Promotor: {Promotor? <div>&emsp;  {Promotor.firstName} {Promotor.lastName}</div> : "None"}
                <br/>
                TargetAudience: {TargetAudience.map((target) => (
                    <div> &emsp; {target.campus.campus_name} - {target.course.course_name}</div>
                ))}
                {/*Coordinator: */}
                <br/>
                {KeywordInfo()}
            </div>
            <div>
                <h3 className={"sectie title"}>Contact</h3>
                {ProvInfo()}
            </div>

        </div>
    )
}

// APIKey: AIzaSyDnFThyxze2Hll6-MDNfV-x1HFX227FuyA