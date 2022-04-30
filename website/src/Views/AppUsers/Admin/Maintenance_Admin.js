import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";
import "../../../Styles/Maintenance.css"


export default function Maintenance_Admin(props){
    const adminid = props.persoonid;

    const [ErrorMessageForm, setErrorMessageForm] = useState("");

    const [Phases, setPhases] = useState([]);
    const [PhaseIndex, setPhaseIndex] = useState(-1);
    const [PhaseCreate, setPhaseCreate] = useState(false);
    const [FormValuePhase, setFormValuePhase] = useState({
        phaseName: "",
        phaseRound: null,
        phaseEndDeadline: "",
        phaseBeginDeadline: "",
        phaseHide: null
    });



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
                const myData = [].concat(response.data).sort((a, b) => a.phase_id > b.phase_id ? 1 : -1);
                console.log(response.data);
                isMounted && setPhases(myData);
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

    function showMaintenanceBar(effect, deps) {
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
            const handlePhaseChange = (event) => {
                setFormValuePhase({
                    ...FormValuePhase,
                    [event.target.name]: event.target.value
                });
            }
            function showPhaseInfo() {
                return(
                    <div>
                        {PhaseIndex===-1? <div/>:
                            <form className={"FormInfo"}>
                                <div className={"FormInfoTitle"}>
                                    Phase
                                </div>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <div className={"comment"}>Initial Value</div>
                                    <div className={"comment"}>New Value</div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="phaseName" className={"InfoAttribute"}>Phase Name</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Phases[PhaseIndex].phase_name? Phases[PhaseIndex].phase_name:""}
                                        <input type="text" name="phaseName" placeholder={"Phase Name"}
                                               value={FormValuePhase.phaseName}
                                               onChange={handlePhaseChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="phaseRound" className={"InfoAttribute"}>First Round</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Phases[PhaseIndex].firstRound? "True":"False"}
                                        <select name="phaseRound" onChange={handlePhaseChange}>
                                            <option value={"null"}>Null</option>
                                            <option value={"false"}>False</option>
                                            <option value={"true"}>True</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="phaseBeginDeadline" className={"InfoAttribute"}>Begin Dealine</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Phases[PhaseIndex].begin_deadline? Phases[PhaseIndex].begin_deadline: " "}
                                        <input type="date" name="phaseBeginDeadline"
                                               value={FormValuePhase.phaseBeginDeadline}
                                               onChange={handlePhaseChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="phaseEndDeadline" className={"InfoAttribute"}>End Deadline</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Phases[PhaseIndex].end_deadline? Phases[PhaseIndex].end_deadline: " "}
                                        <input type="date" name="phaseEndDeadline"
                                               value={FormValuePhase.phaseEndDeadline}
                                               onChange={handlePhaseChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="phaseHide" className={"InfoAttribute"}>Hide</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Phases[PhaseIndex].hide? "True":"False"}
                                        <select name="phaseHide" onChange={handlePhaseChange}>
                                            <option value={"null"}>Null</option>
                                            <option value={"false"}>False</option>
                                            <option value={"true"}>True</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        }
                    </div>
                )
            }
            function createPhase() {
                return(
                    <div>
                        <form className={"FormInfo"}>
                            <div className={"FormInfoTitle"}>
                                New Phase
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="phaseName" className={"InfoAttribute"}>Phase Name</label>
                                    <input type="text" name="phaseName" placeholder={"Phase Name"}
                                           value={FormValuePhase.phaseName}
                                           onChange={handlePhaseChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="phaseRound" className={"InfoAttribute"}>FirstRound</label>
                                    <select name="phaseRound" onChange={handlePhaseChange}>
                                        <option value={"null"}>Null</option>
                                        <option value={"false"}>False</option>
                                        <option value={"true"}>True</option>
                                    </select>
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="phaseBeginDeadline" className={"InfoAttribute"}>Begin Dealine</label>
                                    <input type="date" name="phaseBeginDeadline"
                                           value={FormValuePhase.phaseBeginDeadline}
                                           onChange={handlePhaseChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="phaseEndDeadline" className={"InfoAttribute"}>End Deadline</label>
                                    <input type="date" name="phaseEndDeadline"
                                           value={FormValuePhase.phaseEndDeadline}
                                           onChange={handlePhaseChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="phaseHide" className={"InfoAttribute"}>Hide</label>
                                    <select name="phaseHide" onChange={handlePhaseChange}>
                                        <option value={"null"}>Null</option>
                                        <option value={"false"}>False</option>
                                        <option value={"true"}>True</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                )
            }

            const submitPhaseUpdate = async(e) => {
                console.log(Phases[PhaseIndex]);
                console.log(FormValuePhase);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/update/phase/" + Phases[PhaseIndex].phase_id,
                        data: {
                            phase_name: FormValuePhase.phaseName,
                            firstRound: FormValuePhase.phaseRound,
                            end_deadline: FormValuePhase.phaseEndDeadline,
                            begin_deadline: FormValuePhase.phaseBeginDeadline,
                            hide: FormValuePhase.phaseHide
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setFormValuePhase(
                        {phaseName: "",
                            phaseRound: null,
                            phaseEndDeadline: "",
                            phaseBeginDeadline: "",
                            phaseHide: null}
                    );
                    await updatePhases();
                } catch(error) {
                    console.log(error)
                }
            }
            const submitPhaseCreate = async(e) => {
                let FormValidPhase = true;
                function checkFormValuePhase() {
                    if (FormValuePhase.phaseName === ""){
                        setErrorMessageForm("Invalid Phasename" + FormValuePhase.phaseName);
                        FormValidPhase = false;
                    }
                    if (FormValuePhase.phaseBeginDeadline === ""){
                        setErrorMessageForm("Invalid Phase Begin Deadline" + FormValuePhase.phaseBeginDeadline);
                        FormValidPhase = false;
                    }
                    if (FormValuePhase.phaseEndDeadline === ""){
                        setErrorMessageForm("Invalid Phase End Deadline" + FormValuePhase.phaseEndDeadline);
                        FormValidPhase = false;
                    }
                    console.log("FormValid: " + FormValidPhase);
                }
                checkFormValuePhase();
                if (FormValidPhase){
                    setErrorMessageForm("");
                    try {
                        const response = await axiosPrivate({
                            method: "post",
                            url: "http://localhost:8080/admin/create/phase/",
                            data: {
                                phase_name: FormValuePhase.phaseName,
                                firstRound: FormValuePhase.phaseRound,
                                end_deadline: FormValuePhase.phaseEndDeadline,
                                begin_deadline: FormValuePhase.phaseBeginDeadline,
                                hide: FormValuePhase.phaseHide
                            }
                        });
                        console.log(response)
                        navigate("/maintenance", { replace: true });
                        setPhaseIndex(-1);
                        setPhaseCreate(false);
                        setFormValuePhase(
                            {phaseName: "",
                                phaseRound: null,
                                phaseEndDeadline: "",
                                phaseBeginDeadline: "",
                                phaseHide: null}
                        );
                        await updatePhases();
                    } catch(error) {
                        console.log(error)
                    }
                }
            }
            const submitPhaseDelete = async(e) => {
                console.log(Phases[PhaseIndex]);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/delete/phase",
                        data: {
                            phase_id: Phases[PhaseIndex].phase_id
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setPhaseIndex(-1);
                    setFormValuePhase({
                        phaseName: "",
                        phaseRound: null,
                        phaseEndDeadline: "",
                        phaseBeginDeadline: "",
                        phaseHide: null}
                    );
                    await updatePhases();
                } catch(error) {
                    console.log(error)
                }
            }
            async function updatePhases() {
                let isMounted = true;
                const controller = new AbortController();
                try {
                    const response = await axiosPrivate({
                        method: "get",
                        url: "/phase/all",
                        signal: controller.signal
                    });
                    console.log(response.data);
                    const myData = [].concat(response.data).sort((a, b) => a.phase_id > b.phase_id ? 1 : -1);
                    console.log(response.data);
                    isMounted && setPhases(myData);

                } catch (err) {
                    console.error(err);
                    navigate('/login', {state: {from: location}, replace: true});
                    console.log(errMsg);
                }
            }

            function cancelCreatePhase() {
                setPhaseCreate(false);
                setErrorMessageForm("");
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
                                    <a className={"ErrorMessageForm"}>{ErrorMessageForm}</a>
                                    <button className={"buttonMaintenance"} type="submit" onClick={submitPhaseCreate}>Save</button>
                                    <button className={"buttonMaintenance"} onClick={() => cancelCreatePhase()}>Cancel</button>
                                </div>:
                                <div>
                                    {PhaseIndex===-1? <div/>:
                                        <div>
                                            <button className={"buttonMaintenance"} type="submit" onClick={submitPhaseDelete}>Delete</button>
                                            <button className={"buttonMaintenance"} type="submit" onClick={submitPhaseUpdate}>Update</button>
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