import React, {useEffect, useState} from "react";
import axios from "axios";
// import {FiSearch} from "react-icons/all";
import '../../Styles/Topics.css';
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";


export default function TopicFilter (){
    const [TargetAudience, setTargetAudience] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const [errMsg, setErrMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        let isMounted = true;

        //cancel request if component is unmountend
        const controller = new AbortController();

        const getTargetAudience = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/targetaudience/all",
                    signal: controller.signal
                });
                // console.log(response.data);
                isMounted && setTargetAudience(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }

        getTargetAudience();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

        return(
            <div >
                {/*{this.state.data.map(targetaudience =>*/}
                {/*    <div key = {targetaudience.id}>*/}
                {/*        {targetaudience.state.campus}*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        )
}