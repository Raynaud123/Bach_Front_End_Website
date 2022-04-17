import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";
import "../../../Styles/Maintenance.css"


export default function Maintenance_Admin(props){
    const adminid = props.persoonid;
    const [Phases, setPhases] = useState([]);
    const [PhaseIndex, setPhaseIndex] = useState(-1);

    const [Promotors, setPromotors] = useState([]);
    const [Topics, setTopics] = useState([]);
    const [Students, setStudents] = useState([]);
    const [Masters, setMasters] = useState([]);
    const [Providers, setProviders] = useState([]);
    const [TargetAudiences, setTargetAudiences] = useState([]);
    const [Keywords, setKeywords] = useState([]);

    const [Show, setShow] = useState("");           // "Phases,Promotors,Students,Masters,Providers,TargetAudiences,Keywords"
    const [Create, setCreate] = useState("");

    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getPhases = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/phase/all",
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setPhases(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getTopics = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/topic/all",
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setTopics(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getPromotors = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/promotor/all",
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setPromotors(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
                console.log(errMsg);
            }

        }
        const getStudents = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/student/all",
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setStudents(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
                console.log(errMsg);
            }

        }
        const getMasters = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/master/all",
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setMasters(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
                console.log(errMsg);
            }

        }
        const getProviders = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/topicprovider/all",
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setProviders(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
                console.log(errMsg);
            }

        }
        const getTargetAudiences = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/targetaudience/all",
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setTargetAudiences(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
                console.log(errMsg);
            }

        }
        const getKeywords = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/keyword/all",
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setKeywords(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
                console.log(errMsg);
            }

        }
        getTopics().then(r => null);
        //getPromotors().then(r => null);
        getPhases().then(r => null);
        getStudents().then(r => null);
        getMasters().then(r => null);
        getProviders().then(r => null);
        getTargetAudiences().then(r => null);
        getKeywords().then(r => null);

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    function show(which) {


    }


    function showMaintenanceBar() {
        function showStandaard() {
            return (
                <div className={"windowMainenance"}>
                    <div className={"windowleftlist"}>
                        <div className={"emptyListItem"}>List Item</div>
                        <div className={"emptyListItem"}>List Item</div>
                        <div className={"emptyListItem"}>List Item</div>
                        <div className={"emptyListItem"}>List Item</div>
                        <div className={"emptyListItem"}>List Item</div>
                    </div>
                    <div className={"borderinwindow"}/>
                    <div className={"windowrightcrud"}>
                        CRUD opties
                    </div>
                </div>
            )
        }
        function showPhases() {
            function getDate(end_deadline) {
                let date = end_deadline.split('/');
                const day = date[0];
                const month = date[1];
                const year = 20 + date[2];
                return year + "-" + month + "-" + day;
            }
            const filterComp = () => {
                const newArr = Phases.findIndex((c) => c.phase_id === 0);
                {
                    console.log("index", newArr);
                    return newArr;
                }
            };

            return (
                <div className={"windowMainenance"}>
                    <div className={"windowleftlist"}>
                        <div className={"listitemsleft"}>
                            {Phases.map((phase,index) =>(
                                <div key={index} className={"ListItem"} onClick={() => setPhaseIndex(index)}>
                                    <div className={"ListItemTitle"}>
                                        {PhaseIndex===phase.phase_id? <div className={"ListItemSelected"}>{phase.phase_name}</div>:<div>{phase.phase_name}</div>}
                                    </div>
                                    <div>
                                        {phase.firstRound? <div>First Round</div>: <div>Second Round</div>}
                                    </div>
                                    <div>
                                        {phase.begin_deadline} - {phase.end_deadline}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={"leftUnderSidebalk"}>
                            <button className={"buttonMaintenance"} onClick={() => setCreate("Phases")}>Create</button>
                        </div>

                    </div>
                    <div className={"borderinwindow"}/>
                    <div className={"windowrightcrud"}>
                        {
                            PhaseIndex===-1? <div/>:
                                <form>
                                    <div>
                                        <label htmlFor="phaseName">Phase Name</label>
                                        <input type="text" id="phaseName" name="phaseName" placeholder={Phases[PhaseIndex].phase_name}/>
                                    </div>
                                    <div>
                                        <label htmlFor="phaseRound">FirstRound</label>
                                        <input type="checkbox" id="phaseRound" name="phaseRound" checked={Phases[PhaseIndex].firstRound}/>
                                    </div>
                                    <div>
                                        <label htmlFor="phaseBeginDeadline">Begin Dealine</label>
                                        <input type="date" id="phaseBeginDeadline" name="phaseBeginDeadline" value={getDate(Phases[PhaseIndex].begin_deadline)}/>
                                    </div>
                                    <div>
                                        <label htmlFor="phaseEndDeadline">End Deadline</label>
                                        <input type="date" id="phaseEndDeadline" name="phaseEndDeadline" value={getDate(Phases[PhaseIndex].end_deadline)}/>
                                    </div>

                                    {/*<input type="submit" value="Submit"/>*/}
                        </form>
                        }


                    </div>
                </div>
            )
        }
        function showStudents() {
            return undefined;
        }
        function showMasters() {
            return undefined;
        }
        function showPromotors() {
            return undefined;
        }
        function showProviders() {
            return undefined;
        }
        function showTargetAudiences() {
            return undefined;
        }
        function showKeywords() {
            return undefined;
        }

        function createPhase() {
            return(
                <div>
                    <div>
                        Phase name:
                    </div>
                    <div>
                        Phase Round:
                    </div>
                    <div>
                        Phase begin date:
                    </div>
                    <div>
                        Phase end date:
                    </div>
                    <button onClick={() => setCreate("")}>Hide Create</button>
                </div>
            )
        }

        return(
            <div>
                <div className={"Maintenancebar"}>
                    <button onClick={() => setShow("Students")}>Students</button>
                    <button onClick={() => setShow("Masters")}>Coordinators</button>
                    <button onClick={() => setShow("Promotors")}>Promotors</button>
                    <button onClick={() => setShow("Providers")}>Companies/Researchgroups</button>
                    <button onClick={() => setShow("Phases")}>Phases</button>
                    <button onClick={() => setShow("TargetAudiences")}>TargetAudiences</button>
                    <button onClick={() => setShow("Keywords")}>Keywords</button>
                </div>
                {Show===""?                 showStandaard()         :   <div/>  }
                {Show==="Students"?         showStudents()          :   <div/>  }
                {Show==="Masters"?          showMasters()           :   <div/>  }
                {Show==="Promotors"?        showPromotors()         :   <div/>  }
                {Show==="Providers"?        showProviders()         :   <div/>  }
                {Show==="Phases"?           showPhases()            :   <div/>  }
                {Show==="TargetAudiences"?  showTargetAudiences()   :   <div/>  }
                {Show==="Keywords"?         showKeywords()          :   <div/>  }
                {Create===""? <div/>: <div/>}
                {Create==="Phases"? createPhase(): <div/>}

            </div>
        )
    }

    return (
        <div>
            <h1>Admin maintenance</h1>
            {showMaintenanceBar()}
            {/*{showCRUDPhase()}*/}
        </div>
    )
}