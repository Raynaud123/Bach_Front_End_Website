import React, {useEffect, useState} from "react";
import {BsHeartFill, BsHeart} from "react-icons/all";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";


export default function PreferredTopic (props){
    const studentid = props.studentid;

    const [filled, setFilled] = useState(false);
    const [Student, setStudent] = useState([]);

    const topicid = props.topic_id;

    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getPreferred = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/student/" + studentid + "/preferred/" + topicid,
                    signal: controller.signal
                });
                console.log("Response preferred: " + response.data);
                isMounted && setFilled(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getStudent = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/student/" + studentid,
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setStudent(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        getStudent();
        getPreferred();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    async function submitPreferrence() {
        setFilled(!filled);
        try {
            const response = await axiosPrivate({
                method: "put",
                url: "http://localhost:8080/student/" + studentid + "/submitpreferrencetopic/" + topicid,
            });
            // console.log(response)
            navigate(location, {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button className={"buttonheart"} onClick={() => submitPreferrence()} type={"button"}>{         //setFilled(!filled)}
            filled? <BsHeartFill className={"hearticoonfill"}/>:
                    <BsHeart className={"hearticoon"}/>
        }
        </button>
    )
}