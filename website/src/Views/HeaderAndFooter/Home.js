import React, {useEffect, useState} from 'react';
import Home_Standaard from "../Home_Standaard";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";
import "../../Styles/Home.css";

export default function Home(props){
    const [Phase, setPhase] = useState([]);
    const [BeginDate, setBeginDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [FirstRound, setFirstRound] = useState(true);

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
                setEndDate(setDate(response.data.end_deadline));
                setFirstRound(response.data.firstRound);
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

    function getTekst() {
        switch(props.roles) {
            case "STUDENT":
                return (
                    <div>
                        As student, you can (depending on the current phase):
                        <ul>
                            <li>Submit Possible Thesis topics</li>
                            <li>Like Thesis topics</li>
                            <li>Choose Top3 Thesis topics from preferred topics</li>
                            <li>View Top3</li>
                        </ul>
                    </div>
                )
            case "ADMIN":
                return (
                    <div>
                        As admin you can have full control over everything. Take a look at "Maintenance".
                    </div>
                )
            case "MASTER":
                return (
                    <div>
                        As ThesisCoordinator, you can (depending on the current phase):
                        <ul>
                            <li>Submit Possible Thesis topics</li>
                            <li>View added Thesis topics</li>
                            <li>Approve Promotors/Companies/ResearchGroups</li>
                            <li>Assign Promotors</li>
                            <li>Assign Students to their Thesis topic</li>
                        </ul>
                    </div>
                )
            case "COMPANY":
                return (
                    <div>
                        As Company or researchgroup, you can (depending on the current phase):
                        <ul>
                            <li>Submit Possible Thesis topics</li>
                            <li>View added Thesis topics</li>
                        </ul>
                    </div>
                )
            case "PROMOTOR":
                return (
                    <div>
                        As promotor, you can (depending on the current phase):
                        <ul>
                            <li>Submit Possible Thesis topics</li>
                            <li>View added Thesis topics</li>
                            <li>Boost Students for each Thesis topic</li>
                        </ul>
                    </div>
                )
            case "NOTAPPROVED":
                return <Home_Standaard/>
            default:
        }
    }

    return(
        <div className={"standaard"}>
            <div className={"titel"}>
                <h1 className={"topicTitle titel"}>Home</h1>
                <h4 className={"ronde titel"}> { FirstRound? <b>First Round</b> : <b>Second Round</b>}
                    &emsp;&emsp; {Phase.phase_name} ({BeginDate} - {EndDate})</h4>
            </div>
            <br/>
            {getTekst()}
            <div className={"fill"}/>
        </div>
    )

}