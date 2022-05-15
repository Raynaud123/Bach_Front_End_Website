import React, {useEffect, useState} from 'react';
import Home_Student from "../AppUsers/Student/Home_Student"
import Home_Admin from "../AppUsers/Admin/Home_Admin"
import Home_Masterproef from "../AppUsers/Masterproefcoordinator/Home_Masterproef"
import Home_Company from "../AppUsers/Company/Home_Company"
import Home_Promotor from "../AppUsers/Promotor/Home_Promotor"
import Home_Standaard from "../Home_Standaard";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";

export default function Home(props){
    const [Phase, setPhase] = useState([]);
    const [BeginDate, setBeginDate] = useState("");
    const [EndDate, setEndDate] = useState("");

    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        //cancel request if component is unmountend
        const controller = new AbortController();

        const getPhase = async () => {
            function setDate(begin_deadline) {
                function convertTZ(date, tzString) {
                    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
                }
                const convDate = convertTZ(begin_deadline,"Asia/Baku");
                function padTo2Digits(num) {
                    return num.toString().padStart(2, '0');
                }
                let formatDate = [
                        convDate.getFullYear(),
                        padTo2Digits(convDate.getMonth() + 1),
                        padTo2Digits(convDate.getDate()),
                    ].join('-') +
                    ' ' +
                    [
                        padTo2Digits(convDate.getHours()),
                        padTo2Digits(convDate.getMinutes()),
                        padTo2Digits(convDate.getSeconds()),
                    ].join(':')
                console.log("formatDate " + formatDate);
                return formatDate;
            }

            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/phase/now",
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setPhase(response.data);
                setBeginDate(setDate(response.data.begin_deadline));
                setEndDate(setDate(response.data.begin_deadline));
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        getPhase();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    switch(props.roles) {
        case "STUDENT":
            return <Home_Student persoonid={props.persoonid} phase={Phase} beginDate={BeginDate} endDate={EndDate}/>
        case "ADMIN":
            return <Home_Admin persoonid={props.persoonid} phase={Phase} beginDate={BeginDate} endDate={EndDate}/>
        case "MASTER":
            return <Home_Masterproef persoonid={props.persoonid} phase={Phase} beginDate={BeginDate} endDate={EndDate}/>
        case "COMPANY":
            return <Home_Company persoonid={props.persoonid} phase={Phase} beginDate={BeginDate} endDate={EndDate}/>
        case "PROMOTOR":
            return <Home_Promotor persoonid={props.persoonid} phase={Phase} beginDate={BeginDate} endDate={EndDate}/>
        case "NOTAPPROVED":
            return <Home_Standaard/>
        default:
    }
}