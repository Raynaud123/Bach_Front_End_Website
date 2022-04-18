import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";
import "../../../Styles/Maintenance.css"


export default function Maintenance_Admin(props){
    const adminid = props.persoonid;

    const [Phases, setPhases] = useState([]);
    const [PhaseIndex, setPhaseIndex] = useState(-1);
    const [PhaseCreate, setPhaseCreate] = useState(false);


    const [Promotors, setPromotors] = useState([]);
    const [Topics, setTopics] = useState([]);
    const [Students, setStudents] = useState([]);
    const [Masters, setMasters] = useState([]);
    const [Providers, setProviders] = useState([]);
    const [TargetAudiences, setTargetAudiences] = useState([]);
    const [Keywords, setKeywords] = useState([]);

    const [Show, setShow] = useState("");           // "Phases,Promotors,Students,Masters,Providers,TargetAudiences,Keywords"

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
            function showPhaseInfo() {
                return(
                    <div>
                        {PhaseIndex===-1? <div/>:
                            <form className={"FormInfo"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <div className={"comment"}>Initial Value</div>
                                    <div className={"comment"}>New Value</div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="phaseName" className={"InfoAttribute"}>Phase Name</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Phases[PhaseIndex].phase_name}
                                        <input type="text" id="phaseName" placeholder={"Phase Name"}/>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="phaseRound" className={"InfoAttribute"}>FirstRound</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Phases[PhaseIndex].firstRound? "True":"False"}
                                        <input type="checkbox" id="phaseRound"/>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="phaseBeginDeadline" className={"InfoAttribute"}>Begin Dealine</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Phases[PhaseIndex].begin_deadline}
                                        <input type="date" id="phaseBeginDeadline"/>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="phaseEndDeadline" className={"InfoAttribute"}>End Deadline</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Phases[PhaseIndex].end_deadline}
                                        <input type="date" id="phaseEndDeadline"/>
                                    </div>
                                </div>

                                {/*<input type="submit" value="Submit"/>*/}
                            </form>
                        }
                    </div>
                )
            }
            function createPhase() {
                return(
                    <div>
                        {PhaseIndex===-1? <div/>:
                            <form className={"FormInfo"}>
                                <div className={"InfoSection"}>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        <label htmlFor="phaseName" className={"InfoAttribute"}>Phase Name</label>
                                        <input type="text" id="phaseName" placeholder={"Phase Name"}/>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        <label htmlFor="phaseRound" className={"InfoAttribute"}>FirstRound</label>
                                        <input type="checkbox" id="phaseRound"/>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        <label htmlFor="phaseBeginDeadline" className={"InfoAttribute"}>Begin Dealine</label>
                                        <input type="date" id="phaseBeginDeadline"/>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        <label htmlFor="phaseEndDeadline" className={"InfoAttribute"}>End Deadline</label>
                                        <input type="date" id="phaseEndDeadline"/>
                                    </div>
                                </div>

                                {/*<input type="submit" value="Submit"/>*/}
                            </form>
                        }
                    </div>
                )
            }

            return (
                <div className={"windowMainenance"}>
                    <div className={"windowleftlist"}>
                        <div className={"listitemsleft"}>
                            {Phases.map((phase,index) =>(
                                <div key={index} className={"ListItem"} onClick={() => setPhaseIndex(index)}>
                                    <div className={"ListItemTitle"}>
                                        {PhaseIndex===index? <div className={"ListItemSelected"}>{phase.phase_name}</div>:<div>{phase.phase_name}</div>}
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
                            <button className={"buttonMaintenance"} onClick={() => setPhaseCreate(true)}>Create</button>
                        </div>

                    </div>
                    <div className={"borderinwindow"}/>
                    <div className={"windowrightcrud"}>
                        <div>
                            {PhaseCreate? createPhase(): showPhaseInfo()}
                        </div>
                        <div className={"InfoButtonsBottom"}>
                            {PhaseCreate?
                                <div>
                                    <button className={"buttonMaintenance"}>Save</button>
                                    <button className={"buttonMaintenance"} onClick={() => setPhaseCreate(false)}>Cancel</button>
                                </div>:
                                <div>
                                    {PhaseIndex===-1? <div/>:
                                        <div>
                                            <button className={"buttonMaintenance"}>Delete</button>
                                            <button className={"buttonMaintenance"}>Hide</button>
                                            <button className={"buttonMaintenance"}>Update</button>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
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