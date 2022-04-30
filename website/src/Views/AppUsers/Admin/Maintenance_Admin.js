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

    const [Students, setStudents] = useState([]);
    const [StudentIndex, setStudentIndex] = useState(-1);
    const [StudentCreate, setStudentCreate] = useState(false);
    const [FormValueStudent, setFormValueStudent] = useState({
        firstName: "",
        lastName: "",
        targetAudience: [],
        top3Topic: [],
        preferredTopics: [],
        streetName: "",
        streetNumber: -1,
        postNumber: -1,
        phoneNumber: -1,
        city: "",
        country: "",
        email: "",
        assignedTopic: null,
        master: null,
        approved: null,
        locked: null,
        enabled: null,
        userName: "",
        password: ""
    });

    const [Masters, setMasters] = useState([]);
    const [MasterIndex, setMasterIndex] = useState(-1);
    const [MasterCreate, setMasterCreate] = useState(false);
    const [FormValueMaster, setFormValueMaster] = useState({
        firstName: "",
        lastName: "",
        targetAudience: [],
        asPromotor_topic_list: [],
        awaitApproved_promotor_list: [],
        awaitApproved_topicProvider_list: [],
        awaitApproved_topic_list: [],
        streetName: "",
        streetNumber: -1,
        postNumber: -1,
        phoneNumber: -1,
        city: "",
        country: "",
        email: "",
        approved: null,
        locked: null,
        enabled: null,
        userName: "",
        password: ""
    });

    const [Promotors, setPromotors] = useState([]);
    const [PromotorIndex, setPromotorIndex] = useState(-1);
    const [PromotorCreate, setPromotorCreate] = useState(false);
    const [FormValuePromotor, setFormValuePromotor] = useState({
        name: "",
        targetAudience: [],
        topic_list: [],
        streetName: "",
        streetNumber: -1,
        postNumber: -1,
        phoneNumber: -1,
        city: "",
        country: "",
        email: "",
        approved: null,
        locked: null,
        enabled: null,
        isCompany: null,
        userName: "",
        password: ""
    });

    const [Providers, setProviders] = useState([]);
    const [ProviderIndex, setProviderIndex] = useState(-1);
    const [ProviderCreate, setProviderCreate] = useState(false);
    const [FormValueProvider, setFormValueProvider] = useState({
        name: "",
        campus: [],
        topic_list: [],
        streetName: "",
        streetNumber: -1,
        postNumber: -1,
        phoneNumber: -1,
        city: "",
        country: "",
        email: "",
        approved: null,
        locked: null,
        enabled: null,
        isCompany: null,
        company: null,
        userName: "",
        password: ""
    });

    const [TargetAudiences, setTargetAudiences] = useState([]);
    const [TargetAudienceIndex, setTargetAudienceIndex] = useState(-1);
    const [TargetAudienceCreate, setTargetAudienceCreate] = useState(false);
    const [FormValueTargetAudience, setFormValueTargetAudience] = useState({
        campus: [],
        course: [],
        hide_targetAudience: null,
    });

    const [Keywords, setKeywords] = useState([]);
    const [KeywordIndex, setKeywordIndex] = useState(-1);
    const [KeywordCreate, setKeywordCreate] = useState(false);
    const [FormValueKeyword, setFormValueKeyword] = useState({
        keyword_name: "",
    });

    const [Topics, setTopics] = useState([]);


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
            const handleStudentChange = (event) => {
                setFormValueStudent({
                    ...FormValueStudent,
                    [event.target.name]: event.target.value
                });
            }

            function showStudentInfo() {
                return(
                    <div>
                        {StudentIndex===-1? <div/>:
                            <form className={"FormInfo"}>
                                <div className={"FormInfoTitle"}>
                                    Student
                                </div>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <div className={"comment"}>Initial Value</div>
                                    <div className={"comment"}>New Value</div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="firstName" className={"InfoAttribute"}>Student firstName</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Students[StudentIndex].firstName? Students[StudentIndex].firstName:""}
                                        <input type="text" name="firstName" placeholder={"Student firstName"}
                                               value={FormValueStudent.firstName}
                                               onChange={handleStudentChange}
                                        />
                                    </div>
                                </div>
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseRound" className={"InfoAttribute"}>First Round</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].firstRound? "True":"False"}*/}
                                {/*        <select name="phaseRound" onChange={handlePhaseChange}>*/}
                                {/*            <option value={"null"}>Null</option>*/}
                                {/*            <option value={"false"}>False</option>*/}
                                {/*            <option value={"true"}>True</option>*/}
                                {/*        </select>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseBeginDeadline" className={"InfoAttribute"}>Begin Dealine</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].begin_deadline? Phases[PhaseIndex].begin_deadline: " "}*/}
                                {/*        <input type="date" name="phaseBeginDeadline"*/}
                                {/*               value={FormValuePhase.phaseBeginDeadline}*/}
                                {/*               onChange={handlePhaseChange}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseEndDeadline" className={"InfoAttribute"}>End Deadline</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].end_deadline? Phases[PhaseIndex].end_deadline: " "}*/}
                                {/*        <input type="date" name="phaseEndDeadline"*/}
                                {/*               value={FormValuePhase.phaseEndDeadline}*/}
                                {/*               onChange={handlePhaseChange}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseHide" className={"InfoAttribute"}>Hide</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].hide? "True":"False"}*/}
                                {/*        <select name="phaseHide" onChange={handlePhaseChange}>*/}
                                {/*            <option value={"null"}>Null</option>*/}
                                {/*            <option value={"false"}>False</option>*/}
                                {/*            <option value={"true"}>True</option>*/}
                                {/*        </select>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </form>
                        }
                    </div>
                )
            }
            function createStudent() {
                return(
                    <div>
                        <form className={"FormInfo"}>
                            <div className={"FormInfoTitle"}>
                                New Student
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="firstName" className={"InfoAttribute"}>Student Firstname</label>
                                    <input type="text" name="firstName" placeholder={"Student Firstname"}
                                           value={FormValueStudent.firstName}
                                           onChange={handleStudentChange}
                                    />
                                </div>
                            </div>
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseRound" className={"InfoAttribute"}>FirstRound</label>*/}
                            {/*        <select name="phaseRound" onChange={handlePhaseChange}>*/}
                            {/*            <option value={"null"}>Null</option>*/}
                            {/*            <option value={"false"}>False</option>*/}
                            {/*            <option value={"true"}>True</option>*/}
                            {/*        </select>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseBeginDeadline" className={"InfoAttribute"}>Begin Dealine</label>*/}
                            {/*        <input type="date" name="phaseBeginDeadline"*/}
                            {/*               value={FormValuePhase.phaseBeginDeadline}*/}
                            {/*               onChange={handlePhaseChange}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseEndDeadline" className={"InfoAttribute"}>End Deadline</label>*/}
                            {/*        <input type="date" name="phaseEndDeadline"*/}
                            {/*               value={FormValuePhase.phaseEndDeadline}*/}
                            {/*               onChange={handlePhaseChange}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseHide" className={"InfoAttribute"}>Hide</label>*/}
                            {/*        <select name="phaseHide" onChange={handlePhaseChange}>*/}
                            {/*            <option value={"null"}>Null</option>*/}
                            {/*            <option value={"false"}>False</option>*/}
                            {/*            <option value={"true"}>True</option>*/}
                            {/*        </select>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </form>
                    </div>
                )
            }

            const submitStudentUpdate = async(e) => {
                console.log(Students[StudentIndex]);
                console.log(FormValueStudent);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/update/student/" + Students[StudentIndex].id,
                        data: {
                            firstName: FormValueStudent.firstName,
                            lastName: FormValueStudent.lastName,
                            targetAudience: FormValueStudent.targetAudience,
                            top3Topic: FormValueStudent.top3Topic,
                            preferredTopics: FormValueStudent.preferredTopics,
                            streetName: FormValueStudent.streetName,
                            streetNumber: FormValueStudent.streetNumber,
                            postNumber: FormValueStudent.postNumber,
                            phoneNumber: FormValueStudent.phoneNumber,
                            city: FormValueStudent.city,
                            country: FormValueStudent.country,
                            email: FormValueStudent.email,
                            assignedTopic: FormValueStudent.assignedTopic,
                            master: FormValueStudent.master,
                            approved: FormValueStudent.approved,
                            locked: FormValueStudent.locked,
                            enabled: FormValueStudent.enabled,
                            userName: FormValueStudent.userName,
                            password: FormValueStudent.password
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setFormValueStudent(
                        {firstName: "",
                            lastName: "",
                            targetAudience: [],
                            top3Topic: [],
                            preferredTopics: [],
                            streetName: "",
                            streetNumber: -1,
                            postNumber: -1,
                            phoneNumber: -1,
                            city: "",
                            country: "",
                            email: "",
                            assignedTopic: null,
                            master: null,
                            approved: null,
                            locked: null,
                            enabled: null,
                            userName: "",
                            password: ""}
                    );
                    await updateStudents();
                } catch(error) {
                    console.log(error)
                }
            }
            const submitStudentCreate = async(e) => {
                let FormValidStudent = true;
                function checkFormValueStudent() {
                    if (FormValueStudent.firstName === ""){
                        setErrorMessageForm("Invalid firstname" + FormValueStudent.firstName);
                        FormValidStudent = false;
                    }
                    if (FormValueStudent.lastName === ""){
                        setErrorMessageForm("Invalid lastname" + FormValueStudent.lastName);
                        FormValidStudent = false;
                    }
                    console.log("FormValid: " + FormValidStudent);
                }
                checkFormValueStudent();
                if (FormValidStudent){
                    setErrorMessageForm("");
                    try {
                        const response = await axiosPrivate({
                            method: "post",
                            url: "http://localhost:8080/admin/create/student/",
                            data: {
                                firstName: FormValueStudent.firstName,
                                lastName: FormValueStudent.lastName,
                                targetAudience: FormValueStudent.targetAudience,
                                top3Topic: FormValueStudent.top3Topic,
                                preferredTopics: FormValueStudent.preferredTopics,
                                streetName: FormValueStudent.streetName,
                                streetNumber: FormValueStudent.streetNumber,
                                postNumber: FormValueStudent.postNumber,
                                phoneNumber: FormValidStudent.phoneNumber,
                                city: FormValueStudent.city,
                                country: FormValueStudent.country,
                                email: FormValueStudent.email,
                                assignedTopic: FormValueStudent.assignedTopic,
                                master: FormValueStudent.master,
                                approved: FormValueStudent.approved,
                                locked: FormValueStudent.locked,
                                enabled: FormValueStudent.enabled,
                                userName: FormValueStudent.userName,
                                password: FormValueStudent.password
                            }
                        });
                        console.log(response)
                        navigate("/maintenance", { replace: true });
                        setStudentIndex(-1);
                        setStudentCreate(false);
                        setFormValueStudent(
                            {firstName: "",
                                lastName: "",
                                targetAudience: [],
                                top3Topic: [],
                                preferredTopics: [],
                                streetName: "",
                                streetNumber: -1,
                                postNumber: -1,
                                phoneNumber: -1,
                                city: "",
                                country: "",
                                email: "",
                                assignedTopic: null,
                                master: null,
                                approved: null,
                                locked: null,
                                enabled: null,
                                userName: "",
                                password: ""}
                        );
                        await updateStudents();
                    } catch(error) {
                        console.log(error)
                    }
                }
            }
            const submitStudentDelete = async(e) => {
                console.log(Students[StudentIndex]);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/delete/student",
                        data: {
                            student_id: Students[StudentIndex].id
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setStudentIndex(-1);
                    setFormValueStudent({
                        firstName: "",
                        lastName: "",
                        targetAudience: [],
                        top3Topic: [],
                        preferredTopics: [],
                        streetName: "",
                        streetNumber: -1,
                        postNumber: -1,
                        phoneNumber: -1,
                        city: "",
                        country: "",
                        email: "",
                        assignedTopic: null,
                        master: null,
                        approved: null,
                        locked: null,
                        enabled: null,
                        userName: "",
                        password: ""}
                    );
                    await updateStudents();
                } catch(error) {
                    console.log(error)
                }
            }
            async function updateStudents() {
                let isMounted = true;
                const controller = new AbortController();
                try {
                    const response = await axiosPrivate({
                        method: "get",
                        url: "/student/all",
                        signal: controller.signal
                    });
                    console.log(response.data);
                    const myData = [].concat(response.data).sort((a, b) => a.id > b.id ? 1 : -1);
                    console.log(response.data);
                    isMounted && setStudents(myData);

                } catch (err) {
                    console.error(err);
                    navigate('/login', {state: {from: location}, replace: true});
                    console.log(errMsg);
                }
            }
            function cancelCreateStudent() {
                setStudentCreate(false);
                setErrorMessageForm("");
            }

            return (
                <div className={"windowMainenance"}>
                    <div className={"windowleftlist"}>
                        <div className={"listitemsleft"}>
                            {Students.map((student,index) =>(
                                <div key={index} className={"ListItem"} onClick={() => setStudentIndex(index)}>
                                    <div className={"ListItemTitle"}>
                                        {StudentIndex===index? <div className={"ListItemSelected"}>{student.firstName} {student.lastName}</div>:<div>{student.firstName} {student.lastName}</div>}
                                    </div>
                                    {/*<div>*/}
                                    {/*    {student.firstRound? <div>First Round</div>: <div>Second Round</div>}*/}
                                    {/*</div>*/}
                                    {/*<div>*/}
                                    {/*    {student.begin_deadline} - {student.end_deadline}*/}
                                    {/*</div>*/}
                                </div>
                            ))}
                        </div>
                        <div className={"leftUnderSidebalk"}>
                            <button className={"buttonMaintenance"} onClick={() => setStudentCreate(true)}>Create</button>
                        </div>

                    </div>
                    <div className={"borderinwindow"}/>
                    <div className={"windowrightcrud"}>
                        <div>
                            {StudentCreate? createStudent(): showStudentInfo()}
                        </div>
                        <div className={"InfoButtonsBottom"}>
                            {StudentCreate?
                                <div>
                                    <a className={"ErrorMessageForm"}>{ErrorMessageForm}</a>
                                    <button className={"buttonMaintenance"} type="submit" onClick={submitStudentCreate}>Save</button>
                                    <button className={"buttonMaintenance"} onClick={() => cancelCreateStudent()}>Cancel</button>
                                </div>:
                                <div>
                                    {StudentIndex===-1? <div/>:
                                        <div>
                                            <button className={"buttonMaintenance"} type="submit" onClick={submitStudentDelete}>Delete</button>
                                            <button className={"buttonMaintenance"} type="submit" onClick={submitStudentUpdate}>Update</button>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )
            return null;
        }
        function showMasters() {
            const handleMasterChange = (event) => {
                setFormValueMaster({
                    ...FormValueMaster,
                    [event.target.name]: event.target.value
                });
            }

            function showMasterInfo() {
                return(
                    <div>
                        {MasterIndex===-1? <div/>:
                            <form className={"FormInfo"}>
                                <div className={"FormInfoTitle"}>
                                    Master
                                </div>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <div className={"comment"}>Initial Value</div>
                                    <div className={"comment"}>New Value</div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="firstName" className={"InfoAttribute"}>Master firstName</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Masters[MasterIndex].firstName? Masters[MasterIndex].firstName:""}
                                        <input type="text" name="firstName" placeholder={"Master firstName"}
                                               value={FormValueMaster.firstName}
                                               onChange={handleMasterChange}
                                        />
                                    </div>
                                </div>
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseRound" className={"InfoAttribute"}>First Round</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].firstRound? "True":"False"}*/}
                                {/*        <select name="phaseRound" onChange={handlePhaseChange}>*/}
                                {/*            <option value={"null"}>Null</option>*/}
                                {/*            <option value={"false"}>False</option>*/}
                                {/*            <option value={"true"}>True</option>*/}
                                {/*        </select>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseBeginDeadline" className={"InfoAttribute"}>Begin Dealine</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].begin_deadline? Phases[PhaseIndex].begin_deadline: " "}*/}
                                {/*        <input type="date" name="phaseBeginDeadline"*/}
                                {/*               value={FormValuePhase.phaseBeginDeadline}*/}
                                {/*               onChange={handlePhaseChange}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseEndDeadline" className={"InfoAttribute"}>End Deadline</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].end_deadline? Phases[PhaseIndex].end_deadline: " "}*/}
                                {/*        <input type="date" name="phaseEndDeadline"*/}
                                {/*               value={FormValuePhase.phaseEndDeadline}*/}
                                {/*               onChange={handlePhaseChange}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseHide" className={"InfoAttribute"}>Hide</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].hide? "True":"False"}*/}
                                {/*        <select name="phaseHide" onChange={handlePhaseChange}>*/}
                                {/*            <option value={"null"}>Null</option>*/}
                                {/*            <option value={"false"}>False</option>*/}
                                {/*            <option value={"true"}>True</option>*/}
                                {/*        </select>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </form>
                        }
                    </div>
                )
            }
            function createMaster() {
                return(
                    <div>
                        <form className={"FormInfo"}>
                            <div className={"FormInfoTitle"}>
                                New Master
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="firstName" className={"InfoAttribute"}>Master Firstname</label>
                                    <input type="text" name="firstName" placeholder={"Master Firstname"}
                                           value={FormValueMaster.firstName}
                                           onChange={handleMasterChange}
                                    />
                                </div>
                            </div>
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseRound" className={"InfoAttribute"}>FirstRound</label>*/}
                            {/*        <select name="phaseRound" onChange={handlePhaseChange}>*/}
                            {/*            <option value={"null"}>Null</option>*/}
                            {/*            <option value={"false"}>False</option>*/}
                            {/*            <option value={"true"}>True</option>*/}
                            {/*        </select>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseBeginDeadline" className={"InfoAttribute"}>Begin Dealine</label>*/}
                            {/*        <input type="date" name="phaseBeginDeadline"*/}
                            {/*               value={FormValuePhase.phaseBeginDeadline}*/}
                            {/*               onChange={handlePhaseChange}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseEndDeadline" className={"InfoAttribute"}>End Deadline</label>*/}
                            {/*        <input type="date" name="phaseEndDeadline"*/}
                            {/*               value={FormValuePhase.phaseEndDeadline}*/}
                            {/*               onChange={handlePhaseChange}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseHide" className={"InfoAttribute"}>Hide</label>*/}
                            {/*        <select name="phaseHide" onChange={handlePhaseChange}>*/}
                            {/*            <option value={"null"}>Null</option>*/}
                            {/*            <option value={"false"}>False</option>*/}
                            {/*            <option value={"true"}>True</option>*/}
                            {/*        </select>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </form>
                    </div>
                )
            }

            const submitMasterUpdate = async(e) => {
                console.log(Masters[MasterIndex]);
                console.log(FormValueMaster);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/update/master/" + Masters[MasterIndex].id,
                        data: {
                            firstName: FormValueMaster.firstName,
                            lastName: FormValueMaster.lastName,
                            targetAudience: FormValueMaster.targetAudience,
                            asPromotor_topic_list: FormValueMaster.asPromotor_topic_list,
                            awaitApproved_promotor_list: FormValueMaster.awaitApproved_promotor_list,
                            awaitApproved_topicProvider_list: FormValueMaster.awaitApproved_topicProvider_list,
                            awaitApproved_topic_list: FormValueMaster.awaitApproved_topic_list,
                            streetName: FormValueMaster.streetName,
                            streetNumber: FormValueMaster.streetNumber,
                            postNumber: FormValueMaster.postNumber,
                            phoneNumber: FormValueMaster.phoneNumber,
                            city: FormValueMaster.city,
                            country: FormValueMaster.country,
                            email: FormValueMaster.email,
                            approved: FormValueMaster.approved,
                            locked: FormValueMaster.locked,
                            enabled: FormValueMaster.enabled,
                            userName: FormValueMaster.userName,
                            password: FormValueMaster.password
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setFormValueMaster(
                        {firstName: "",
                            lastName: "",
                            targetAudience: [],
                            asPromotor_topic_list: [],
                            awaitApproved_promotor_list: [],
                            awaitApproved_topicProvider_list: [],
                            awaitApproved_topic_list: [],
                            streetName: "",
                            streetNumber: -1,
                            postNumber: -1,
                            phoneNumber: -1,
                            city: "",
                            country: "",
                            email: "",
                            approved: null,
                            locked: null,
                            enabled: null,
                            userName: "",
                            password: ""}
                    );
                    await updateMasters();
                } catch(error) {
                    console.log(error)
                }
            }
            const submitMasterCreate = async(e) => {
                let FormValidMaster = true;
                function checkFormValueMaster() {
                    if (FormValueMaster.firstName === ""){
                        setErrorMessageForm("Invalid firstname" + FormValueMaster.firstName);
                        FormValidMaster = false;
                    }
                    if (FormValueMaster.lastName === ""){
                        setErrorMessageForm("Invalid lastname" + FormValueMaster.lastName);
                        FormValidMaster = false;
                    }
                    console.log("FormValid: " + FormValidMaster);
                }
                checkFormValueMaster();
                if (FormValidMaster){
                    setErrorMessageForm("");
                    try {
                        const response = await axiosPrivate({
                            method: "post",
                            url: "http://localhost:8080/admin/create/master/",
                            data: {
                                firstName: FormValueMaster.firstName,
                                lastName: FormValueMaster.lastName,
                                targetAudience: FormValueMaster.targetAudience,
                                asPromotor_topic_list: FormValueMaster.asPromotor_topic_list,
                                awaitApproved_promotor_list: FormValueMaster.awaitApproved_promotor_list,
                                awaitApproved_topicProvider_list: FormValueMaster.awaitApproved_topicProvider_list,
                                awaitApproved_topic_list: FormValueMaster.awaitApproved_topic_list,
                                streetName: FormValueMaster.streetName,
                                streetNumber: FormValueMaster.streetNumber,
                                postNumber: FormValueMaster.postNumber,
                                phoneNumber: FormValueMaster.phoneNumber,
                                city: FormValueMaster.city,
                                country: FormValueMaster.country,
                                email: FormValueMaster.email,
                                approved: FormValueMaster.approved,
                                locked: FormValueMaster.locked,
                                enabled: FormValueMaster.enabled,
                                userName: FormValueMaster.userName,
                                password: FormValueMaster.password
                            }
                        });
                        console.log(response)
                        navigate("/maintenance", { replace: true });
                        setMasterIndex(-1);
                        setMasterCreate(false);
                        setFormValueMaster(
                            {firstName: "",
                                lastName: "",
                                targetAudience: [],
                                asPromotor_topic_list: [],
                                awaitApproved_promotor_list: [],
                                awaitApproved_topicProvider_list: [],
                                awaitApproved_topic_list: [],
                                streetName: "",
                                streetNumber: -1,
                                postNumber: -1,
                                phoneNumber: -1,
                                city: "",
                                country: "",
                                email: "",
                                approved: null,
                                locked: null,
                                enabled: null,
                                userName: "",
                                password: ""}
                        );
                        await updateMasters();
                    } catch(error) {
                        console.log(error)
                    }
                }
            }
            const submitMasterDelete = async(e) => {
                console.log(Masters[MasterIndex]);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/delete/master",
                        data: {
                            master_id: Masters[MasterIndex].id
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setMasterIndex(-1);
                    setFormValueMaster({
                        firstName: "",
                        lastName: "",
                        targetAudience: [],
                        asPromotor_topic_list: [],
                        awaitApproved_promotor_list: [],
                        awaitApproved_topicProvider_list: [],
                        awaitApproved_topic_list: [],
                        streetName: "",
                        streetNumber: -1,
                        postNumber: -1,
                        phoneNumber: -1,
                        city: "",
                        country: "",
                        email: "",
                        approved: null,
                        locked: null,
                        enabled: null,
                        userName: "",
                        password: ""}
                    );
                    await updateMasters();
                } catch(error) {
                    console.log(error)
                }
            }
            async function updateMasters() {
                let isMounted = true;
                const controller = new AbortController();
                try {
                    const response = await axiosPrivate({
                        method: "get",
                        url: "/student/all",
                        signal: controller.signal
                    });
                    console.log(response.data);
                    const myData = [].concat(response.data).sort((a, b) => a.id > b.id ? 1 : -1);
                    console.log(response.data);
                    isMounted && setMasters(myData);

                } catch (err) {
                    console.error(err);
                    navigate('/login', {state: {from: location}, replace: true});
                    console.log(errMsg);
                }
            }
            function cancelCreateMaster() {
                setMasterCreate(false);
                setErrorMessageForm("");
            }

            return (
                <div className={"windowMainenance"}>
                    <div className={"windowleftlist"}>
                        <div className={"listitemsleft"}>
                            {Masters.map((master,index) =>(
                                <div key={index} className={"ListItem"} onClick={() => setMasterIndex(index)}>
                                    <div className={"ListItemTitle"}>
                                        {MasterIndex===index? <div className={"ListItemSelected"}>{master.firstName} {master.lastName}</div>:<div>{master.firstName} {master.lastName}</div>}
                                    </div>
                                    {/*<div>*/}
                                    {/*    {student.firstRound? <div>First Round</div>: <div>Second Round</div>}*/}
                                    {/*</div>*/}
                                    {/*<div>*/}
                                    {/*    {student.begin_deadline} - {student.end_deadline}*/}
                                    {/*</div>*/}
                                </div>
                            ))}
                        </div>
                        <div className={"leftUnderSidebalk"}>
                            <button className={"buttonMaintenance"} onClick={() => setMasterCreate(true)}>Create</button>
                        </div>

                    </div>
                    <div className={"borderinwindow"}/>
                    <div className={"windowrightcrud"}>
                        <div>
                            {MasterCreate? createMaster(): showMasterInfo()}
                        </div>
                        <div className={"InfoButtonsBottom"}>
                            {MasterCreate?
                                <div>
                                    <a className={"ErrorMessageForm"}>{ErrorMessageForm}</a>
                                    <button className={"buttonMaintenance"} type="submit" onClick={submitMasterCreate}>Save</button>
                                    <button className={"buttonMaintenance"} onClick={() => cancelCreateMaster()}>Cancel</button>
                                </div>:
                                <div>
                                    {MasterIndex===-1? <div/>:
                                        <div>
                                            <button className={"buttonMaintenance"} type="submit" onClick={submitMasterDelete}>Delete</button>
                                            <button className={"buttonMaintenance"} type="submit" onClick={submitMasterUpdate}>Update</button>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )
            return null;
        }
        function showPromotors() {
            return undefined;
        }
        function showProviders() {
            const handleProviderChange = (event) => {
                setFormValueProvider({
                    ...FormValueProvider,
                    [event.target.name]: event.target.value
                });
            }

            function showProviderInfo() {
                return(
                    <div>
                        {ProviderIndex===-1? <div/>:
                            <form className={"FormInfo"}>
                                <div className={"FormInfoTitle"}>
                                    Topic provider
                                </div>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <div className={"comment"}>Initial Value</div>
                                    <div className={"comment"}>New Value</div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="name" className={"InfoAttribute"}>Provider name</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Providers[ProviderIndex].name? Providers[ProviderIndex].name:""}
                                        <input type="text" name="name" placeholder={"Provider name"}
                                               value={FormValueProvider.name}
                                               onChange={handleProviderChange}
                                        />
                                    </div>
                                </div>
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseRound" className={"InfoAttribute"}>First Round</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].firstRound? "True":"False"}*/}
                                {/*        <select name="phaseRound" onChange={handlePhaseChange}>*/}
                                {/*            <option value={"null"}>Null</option>*/}
                                {/*            <option value={"false"}>False</option>*/}
                                {/*            <option value={"true"}>True</option>*/}
                                {/*        </select>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseBeginDeadline" className={"InfoAttribute"}>Begin Dealine</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].begin_deadline? Phases[PhaseIndex].begin_deadline: " "}*/}
                                {/*        <input type="date" name="phaseBeginDeadline"*/}
                                {/*               value={FormValuePhase.phaseBeginDeadline}*/}
                                {/*               onChange={handlePhaseChange}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseEndDeadline" className={"InfoAttribute"}>End Deadline</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].end_deadline? Phases[PhaseIndex].end_deadline: " "}*/}
                                {/*        <input type="date" name="phaseEndDeadline"*/}
                                {/*               value={FormValuePhase.phaseEndDeadline}*/}
                                {/*               onChange={handlePhaseChange}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseHide" className={"InfoAttribute"}>Hide</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].hide? "True":"False"}*/}
                                {/*        <select name="phaseHide" onChange={handlePhaseChange}>*/}
                                {/*            <option value={"null"}>Null</option>*/}
                                {/*            <option value={"false"}>False</option>*/}
                                {/*            <option value={"true"}>True</option>*/}
                                {/*        </select>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </form>
                        }
                    </div>
                )
            }
            function createProvider() {
                return(
                    <div>
                        <form className={"FormInfo"}>
                            <div className={"FormInfoTitle"}>
                                New Provider
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="name" className={"InfoAttribute"}>Provider name</label>
                                    <input type="text" name="name" placeholder={"Provider name"}
                                           value={FormValueProvider.name}
                                           onChange={handleProviderChange}
                                    />
                                </div>
                            </div>
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseRound" className={"InfoAttribute"}>FirstRound</label>*/}
                            {/*        <select name="phaseRound" onChange={handlePhaseChange}>*/}
                            {/*            <option value={"null"}>Null</option>*/}
                            {/*            <option value={"false"}>False</option>*/}
                            {/*            <option value={"true"}>True</option>*/}
                            {/*        </select>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseBeginDeadline" className={"InfoAttribute"}>Begin Dealine</label>*/}
                            {/*        <input type="date" name="phaseBeginDeadline"*/}
                            {/*               value={FormValuePhase.phaseBeginDeadline}*/}
                            {/*               onChange={handlePhaseChange}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseEndDeadline" className={"InfoAttribute"}>End Deadline</label>*/}
                            {/*        <input type="date" name="phaseEndDeadline"*/}
                            {/*               value={FormValuePhase.phaseEndDeadline}*/}
                            {/*               onChange={handlePhaseChange}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseHide" className={"InfoAttribute"}>Hide</label>*/}
                            {/*        <select name="phaseHide" onChange={handlePhaseChange}>*/}
                            {/*            <option value={"null"}>Null</option>*/}
                            {/*            <option value={"false"}>False</option>*/}
                            {/*            <option value={"true"}>True</option>*/}
                            {/*        </select>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </form>
                    </div>
                )
            }

            const submitProviderUpdate = async(e) => {
                console.log(Providers[ProviderIndex]);
                console.log(FormValueProvider);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/update/topicprovider/" + Providers[ProviderIndex].id,
                        data: {
                            name: FormValueProvider.name,
                            campus: FormValueProvider.campus,
                            topic_list: FormValueProvider.topic_list,
                            streetName: FormValueProvider.streetName,
                            streetNumber: FormValueProvider.streetNumber,
                            postNumber: FormValueProvider.postNumber,
                            phoneNumber: FormValueProvider.phoneNumber,
                            city: FormValueProvider.city,
                            country: FormValueProvider.country,
                            email: FormValueProvider.email,
                            approved: FormValueProvider.approved,
                            locked: FormValueProvider.locked,
                            enabled: FormValueProvider.enabled,
                            userName: FormValueProvider.userName,
                            password: FormValueProvider.password
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setFormValueProvider({
                            name: "",
                            campus: [],
                            topic_list: [],
                            streetName: "",
                            streetNumber: -1,
                            postNumber: -1,
                            phoneNumber: -1,
                            city: "",
                            country: "",
                            email: "",
                            approved: null,
                            locked: null,
                            enabled: null,
                            isCompany: null,
                            company: null,
                            userName: "",
                            password: ""}
                    );
                    await updateProviders();
                } catch(error) {
                    console.log(error)
                }
            }
            const submitProviderCreate = async(e) => {
                let FormValidProvider = true;
                function checkFormValueProvider() {
                    if (FormValueProvider.name === ""){
                        setErrorMessageForm("Invalid name" + FormValueProvider.name);
                        FormValidProvider = false;
                    }
                    console.log("FormValid: " + FormValidProvider);
                }
                checkFormValueProvider();
                if (FormValidProvider){
                    setErrorMessageForm("");
                    try {
                        const response = await axiosPrivate({
                            method: "post",
                            url: "http://localhost:8080/admin/create/topicprovider/",
                            data: {
                                name: FormValueProvider.name,
                                campus: FormValueProvider.campus,
                                topic_list: FormValueProvider.topic_list,
                                streetName: FormValueProvider.streetName,
                                streetNumber: FormValueProvider.streetNumber,
                                postNumber: FormValueProvider.postNumber,
                                phoneNumber: FormValueProvider.phoneNumber,
                                city: FormValueProvider.city,
                                country: FormValueProvider.country,
                                email: FormValueProvider.email,
                                approved: FormValueProvider.approved,
                                locked: FormValueProvider.locked,
                                enabled: FormValueProvider.enabled,
                                userName: FormValueProvider.userName,
                                password: FormValueProvider.password

                            }
                        });
                        console.log(response)
                        navigate("/maintenance", { replace: true });
                        setProviderIndex(-1);
                        setProviderCreate(false);
                        setFormValueProvider({
                            name: "",
                            campus: [],
                            topic_list: [],
                            streetName: "",
                            streetNumber: -1,
                            postNumber: -1,
                            phoneNumber: -1,
                            city: "",
                            country: "",
                            email: "",
                            approved: null,
                            locked: null,
                            enabled: null,
                            isCompany: null,
                            company: null,
                            userName: "",
                            password: ""}
                        );
                        await updateProviders();
                    } catch(error) {
                        console.log(error)
                    }
                }
            }
            const submitProviderDelete = async(e) => {
                console.log(Providers[ProviderIndex]);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/delete/topicprovider",
                        data: {
                            topicprovider_id: Providers[ProviderIndex].id
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setProviderIndex(-1);
                    setFormValueProvider({
                        name: "",
                        campus: [],
                        topic_list: [],
                        streetName: "",
                        streetNumber: -1,
                        postNumber: -1,
                        phoneNumber: -1,
                        city: "",
                        country: "",
                        email: "",
                        approved: null,
                        locked: null,
                        enabled: null,
                        isCompany: null,
                        company: null,
                        userName: "",
                        password: ""}
                    );
                    await updateProviders();
                } catch(error) {
                    console.log(error)
                }
            }
            async function updateProviders() {
                let isMounted = true;
                const controller = new AbortController();
                try {
                    const response = await axiosPrivate({
                        method: "get",
                        url: "/master/all",
                        signal: controller.signal
                    });
                    console.log(response.data);
                    const myData = [].concat(response.data).sort((a, b) => a.id > b.id ? 1 : -1);
                    console.log(response.data);
                    isMounted && setProviders(myData);

                } catch (err) {
                    console.error(err);
                    navigate('/login', {state: {from: location}, replace: true});
                    console.log(errMsg);
                }
            }
            function cancelCreateProvider() {
                setProviderCreate(false);
                setErrorMessageForm("");
            }

            return (
                <div className={"windowMainenance"}>
                    <div className={"windowleftlist"}>
                        <div className={"listitemsleft"}>
                            {Providers.map((provider,index) =>(
                                <div key={index} className={"ListItem"} onClick={() => setProviderIndex(index)}>
                                    <div className={"ListItemTitle"}>
                                        {ProviderIndex===index? <div className={"ListItemSelected"}>{provider.name}</div>:<div>{provider.name}</div>}
                                    </div>
                                    {/*<div>*/}
                                    {/*    {student.firstRound? <div>First Round</div>: <div>Second Round</div>}*/}
                                    {/*</div>*/}
                                    {/*<div>*/}
                                    {/*    {student.begin_deadline} - {student.end_deadline}*/}
                                    {/*</div>*/}
                                </div>
                            ))}
                        </div>
                        <div className={"leftUnderSidebalk"}>
                            <button className={"buttonMaintenance"} onClick={() => setProviderCreate(true)}>Create</button>
                        </div>

                    </div>
                    <div className={"borderinwindow"}/>
                    <div className={"windowrightcrud"}>
                        <div>
                            {ProviderCreate? createProvider(): showProviderInfo()}
                        </div>
                        <div className={"InfoButtonsBottom"}>
                            {ProviderCreate?
                                <div>
                                    <a className={"ErrorMessageForm"}>{ErrorMessageForm}</a>
                                    <button className={"buttonMaintenance"} type="submit" onClick={submitProviderCreate}>Save</button>
                                    <button className={"buttonMaintenance"} onClick={() => cancelCreateProvider()}>Cancel</button>
                                </div>:
                                <div>
                                    {ProviderIndex===-1? <div/>:
                                        <div>
                                            <button className={"buttonMaintenance"} type="submit" onClick={submitProviderDelete}>Delete</button>
                                            <button className={"buttonMaintenance"} type="submit" onClick={submitProviderUpdate}>Update</button>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )
        }
        function showTargetAudiences() {
            const handleTargetAudienceChange = (event) => {
                setFormValueTargetAudience({
                    ...FormValueTargetAudience,
                    [event.target.name]: event.target.value
                });
            }

            function showTargetAudienceInfo() {
                return(
                    <div>
                        {TargetAudienceIndex===-1? <div/>:
                            <form className={"FormInfo"}>
                                <div className={"FormInfoTitle"}>
                                    TargetAudience
                                </div>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <div className={"comment"}>Initial Value</div>
                                    <div className={"comment"}>New Value</div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="name" className={"InfoAttribute"}>TargetAudience campus</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {TargetAudiences[TargetAudienceIndex].campus? TargetAudiences[TargetAudienceIndex].campus:""}
                                        <input type="text" name="name" placeholder={"TargetAudience campus"}
                                               value={FormValueTargetAudience.campus}
                                               onChange={handleTargetAudienceChange}
                                        />
                                    </div>
                                </div>
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseRound" className={"InfoAttribute"}>First Round</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].firstRound? "True":"False"}*/}
                                {/*        <select name="phaseRound" onChange={handlePhaseChange}>*/}
                                {/*            <option value={"null"}>Null</option>*/}
                                {/*            <option value={"false"}>False</option>*/}
                                {/*            <option value={"true"}>True</option>*/}
                                {/*        </select>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseBeginDeadline" className={"InfoAttribute"}>Begin Dealine</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].begin_deadline? Phases[PhaseIndex].begin_deadline: " "}*/}
                                {/*        <input type="date" name="phaseBeginDeadline"*/}
                                {/*               value={FormValuePhase.phaseBeginDeadline}*/}
                                {/*               onChange={handlePhaseChange}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseEndDeadline" className={"InfoAttribute"}>End Deadline</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].end_deadline? Phases[PhaseIndex].end_deadline: " "}*/}
                                {/*        <input type="date" name="phaseEndDeadline"*/}
                                {/*               value={FormValuePhase.phaseEndDeadline}*/}
                                {/*               onChange={handlePhaseChange}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseHide" className={"InfoAttribute"}>Hide</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].hide? "True":"False"}*/}
                                {/*        <select name="phaseHide" onChange={handlePhaseChange}>*/}
                                {/*            <option value={"null"}>Null</option>*/}
                                {/*            <option value={"false"}>False</option>*/}
                                {/*            <option value={"true"}>True</option>*/}
                                {/*        </select>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </form>
                        }
                    </div>
                )
            }
            function createTargetAudience() {
                return(
                    <div>
                        <form className={"FormInfo"}>
                            <div className={"FormInfoTitle"}>
                                New TargetAudience
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="campus" className={"InfoAttribute"}>TargetAudience campus</label>
                                    <input type="text" name="campus" placeholder={"TargetAudience campus"}
                                           value={FormValueTargetAudience.campus}
                                           onChange={handleTargetAudienceChange}
                                    />
                                </div>
                            </div>
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseRound" className={"InfoAttribute"}>FirstRound</label>*/}
                            {/*        <select name="phaseRound" onChange={handlePhaseChange}>*/}
                            {/*            <option value={"null"}>Null</option>*/}
                            {/*            <option value={"false"}>False</option>*/}
                            {/*            <option value={"true"}>True</option>*/}
                            {/*        </select>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseBeginDeadline" className={"InfoAttribute"}>Begin Dealine</label>*/}
                            {/*        <input type="date" name="phaseBeginDeadline"*/}
                            {/*               value={FormValuePhase.phaseBeginDeadline}*/}
                            {/*               onChange={handlePhaseChange}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseEndDeadline" className={"InfoAttribute"}>End Deadline</label>*/}
                            {/*        <input type="date" name="phaseEndDeadline"*/}
                            {/*               value={FormValuePhase.phaseEndDeadline}*/}
                            {/*               onChange={handlePhaseChange}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseHide" className={"InfoAttribute"}>Hide</label>*/}
                            {/*        <select name="phaseHide" onChange={handlePhaseChange}>*/}
                            {/*            <option value={"null"}>Null</option>*/}
                            {/*            <option value={"false"}>False</option>*/}
                            {/*            <option value={"true"}>True</option>*/}
                            {/*        </select>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </form>
                    </div>
                )
            }

            const submitTargetAudienceUpdate = async(e) => {
                console.log(TargetAudiences[TargetAudienceIndex]);
                console.log(FormValueTargetAudience);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/update/targetaudience/" + TargetAudiences[TargetAudienceIndex].targetAudience_id,
                        data: {
                            campus: FormValueTargetAudience.campus,
                            course: FormValueTargetAudience.course,
                            hide_targetAudience: FormValueTargetAudience.hide_targetAudience
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setFormValueTargetAudience({
                        campus: [],
                        course: [],
                        hide_targetAudience: null,}
                    );
                    await updateTargetAudiences();
                } catch(error) {
                    console.log(error)
                }
            }
            const submitTargetAudienceCreate = async(e) => {
                let FormValidTargetAudience = true;
                function checkFormValueTargetAudience() {
                    if (FormValueTargetAudience.campus === null){
                        setErrorMessageForm("Invalid campus" + FormValueTargetAudience.campus);
                        FormValidTargetAudience = false;
                    }
                    console.log("FormValid: " + FormValidTargetAudience);
                }
                checkFormValueTargetAudience();
                if (FormValidTargetAudience){
                    setErrorMessageForm("");
                    try {
                        const response = await axiosPrivate({
                            method: "post",
                            url: "http://localhost:8080/admin/create/targetaudience/",
                            data: {
                                campus: FormValueTargetAudience.campus,
                                course: FormValueTargetAudience.course,
                                hide_targetAudience: FormValueTargetAudience.hide_targetAudience,
                            }
                        });
                        console.log(response)
                        navigate("/maintenance", { replace: true });
                        setTargetAudienceIndex(-1);
                        setTargetAudienceCreate(false);
                        setFormValueTargetAudience({
                            campus: [],
                            course: [],
                            hide_targetAudience: null,
                            }
                        );
                        await updateTargetAudiences();
                    } catch(error) {
                        console.log(error)
                    }
                }
            }
            const submitTargetAudienceDelete = async(e) => {
                console.log(TargetAudiences[TargetAudienceIndex]);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/delete/targetaudience",
                        data: {
                            targetaudience_id: TargetAudiences[TargetAudienceIndex].targetAudience_id
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setTargetAudienceIndex(-1);
                    setFormValueTargetAudience({
                        campus: [],
                        course: [],
                        hide_targetAudience: null,}
                    );
                    await updateTargetAudiences();
                } catch(error) {
                    console.log(error)
                }
            }
            async function updateTargetAudiences() {
                let isMounted = true;
                const controller = new AbortController();
                try {
                    const response = await axiosPrivate({
                        method: "get",
                        url: "/targetaudience/all",
                        signal: controller.signal
                    });
                    console.log(response.data);
                    const myData = [].concat(response.data).sort((a, b) => a.targetAudience_id > b.targetAudience_id ? 1 : -1);
                    console.log(response.data);
                    isMounted && setTargetAudiences(myData);

                } catch (err) {
                    console.error(err);
                    navigate('/login', {state: {from: location}, replace: true});
                    console.log(errMsg);
                }
            }
            function cancelCreateTargetAudience() {
                setTargetAudienceCreate(false);
                setErrorMessageForm("");
            }

            return (
                <div className={"windowMainenance"}>
                    <div className={"windowleftlist"}>
                        <div className={"listitemsleft"}>
                            {TargetAudiences.map((ta,index) =>(
                                <div key={index} className={"ListItem"} onClick={() => setTargetAudienceIndex(index)}>
                                    <div className={"ListItemTitle"}>
                                        {TargetAudienceIndex===index? <div className={"ListItemSelected"}>{ta.campus}</div>:<div>{ta.campus}</div>}
                                    </div>
                                    {/*<div>*/}
                                    {/*    {student.firstRound? <div>First Round</div>: <div>Second Round</div>}*/}
                                    {/*</div>*/}
                                    {/*<div>*/}
                                    {/*    {student.begin_deadline} - {student.end_deadline}*/}
                                    {/*</div>*/}
                                </div>
                            ))}
                        </div>
                        <div className={"leftUnderSidebalk"}>
                            <button className={"buttonMaintenance"} onClick={() => setTargetAudienceCreate(true)}>Create</button>
                        </div>

                    </div>
                    <div className={"borderinwindow"}/>
                    <div className={"windowrightcrud"}>
                        <div>
                            {TargetAudienceCreate? createTargetAudience(): showTargetAudienceInfo()}
                        </div>
                        <div className={"InfoButtonsBottom"}>
                            {TargetAudienceCreate?
                                <div>
                                    <a className={"ErrorMessageForm"}>{ErrorMessageForm}</a>
                                    <button className={"buttonMaintenance"} type="submit" onClick={submitTargetAudienceCreate}>Save</button>
                                    <button className={"buttonMaintenance"} onClick={() => cancelCreateTargetAudience()}>Cancel</button>
                                </div>:
                                <div>
                                    {TargetAudienceIndex===-1? <div/>:
                                        <div>
                                            <button className={"buttonMaintenance"} type="submit" onClick={submitTargetAudienceDelete}>Delete</button>
                                            <button className={"buttonMaintenance"} type="submit" onClick={submitTargetAudienceUpdate}>Update</button>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )
        }
        function showKeywords() {
            const handleKeywordChange = (event) => {
                setFormValueKeyword({
                    ...FormValueKeyword,
                    [event.target.name]: event.target.value
                });
            }

            function showKeywordInfo() {
                return(
                    <div>
                        {KeywordIndex===-1? <div/>:
                            <form className={"FormInfo"}>
                                <div className={"FormInfoTitle"}>
                                    Keyword
                                </div>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <div className={"comment"}>Initial Value</div>
                                    <div className={"comment"}>New Value</div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="name" className={"InfoAttribute"}>Keyword name</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Keywords[KeywordIndex].keyword_name? Keywords[KeywordIndex].keyword_name:""}
                                        <input type="text" name="name" placeholder={"Keyword name"}
                                               value={FormValueKeyword.keyword_name}
                                               onChange={handleKeywordChange}
                                        />
                                    </div>
                                </div>
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseRound" className={"InfoAttribute"}>First Round</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].firstRound? "True":"False"}*/}
                                {/*        <select name="phaseRound" onChange={handlePhaseChange}>*/}
                                {/*            <option value={"null"}>Null</option>*/}
                                {/*            <option value={"false"}>False</option>*/}
                                {/*            <option value={"true"}>True</option>*/}
                                {/*        </select>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseBeginDeadline" className={"InfoAttribute"}>Begin Dealine</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].begin_deadline? Phases[PhaseIndex].begin_deadline: " "}*/}
                                {/*        <input type="date" name="phaseBeginDeadline"*/}
                                {/*               value={FormValuePhase.phaseBeginDeadline}*/}
                                {/*               onChange={handlePhaseChange}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseEndDeadline" className={"InfoAttribute"}>End Deadline</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].end_deadline? Phases[PhaseIndex].end_deadline: " "}*/}
                                {/*        <input type="date" name="phaseEndDeadline"*/}
                                {/*               value={FormValuePhase.phaseEndDeadline}*/}
                                {/*               onChange={handlePhaseChange}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className={"InfoSection"}>*/}
                                {/*    <label htmlFor="phaseHide" className={"InfoAttribute"}>Hide</label>*/}
                                {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                                {/*        {Phases[PhaseIndex].hide? "True":"False"}*/}
                                {/*        <select name="phaseHide" onChange={handlePhaseChange}>*/}
                                {/*            <option value={"null"}>Null</option>*/}
                                {/*            <option value={"false"}>False</option>*/}
                                {/*            <option value={"true"}>True</option>*/}
                                {/*        </select>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </form>
                        }
                    </div>
                )
            }
            function createKeyword() {
                return(
                    <div>
                        <form className={"FormInfo"}>
                            <div className={"FormInfoTitle"}>
                                New Keyword
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="name" className={"InfoAttribute"}>Keyword name</label>
                                    <input type="text" name="name" placeholder={"Keyword name"}
                                           value={FormValueKeyword.keyword_name}
                                           onChange={handleKeywordChange}
                                    />
                                </div>
                            </div>
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseRound" className={"InfoAttribute"}>FirstRound</label>*/}
                            {/*        <select name="phaseRound" onChange={handlePhaseChange}>*/}
                            {/*            <option value={"null"}>Null</option>*/}
                            {/*            <option value={"false"}>False</option>*/}
                            {/*            <option value={"true"}>True</option>*/}
                            {/*        </select>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseBeginDeadline" className={"InfoAttribute"}>Begin Dealine</label>*/}
                            {/*        <input type="date" name="phaseBeginDeadline"*/}
                            {/*               value={FormValuePhase.phaseBeginDeadline}*/}
                            {/*               onChange={handlePhaseChange}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseEndDeadline" className={"InfoAttribute"}>End Deadline</label>*/}
                            {/*        <input type="date" name="phaseEndDeadline"*/}
                            {/*               value={FormValuePhase.phaseEndDeadline}*/}
                            {/*               onChange={handlePhaseChange}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={"InfoSection"}>*/}
                            {/*    <div className={"InfoAttributeValueAndInput"}>*/}
                            {/*        <label htmlFor="phaseHide" className={"InfoAttribute"}>Hide</label>*/}
                            {/*        <select name="phaseHide" onChange={handlePhaseChange}>*/}
                            {/*            <option value={"null"}>Null</option>*/}
                            {/*            <option value={"false"}>False</option>*/}
                            {/*            <option value={"true"}>True</option>*/}
                            {/*        </select>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </form>
                    </div>
                )
            }

            const submitKeywordUpdate = async(e) => {
                console.log(Keywords[KeywordIndex]);
                console.log(FormValueKeyword);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/update/keyword/" + Keywords[KeywordIndex].keyword_id,
                        data: {
                            keyword_name: FormValueKeyword.keyword_name,
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setFormValueKeyword({
                        keyword_name: "",
                        }
                    );
                    await updateKeywords();
                } catch(error) {
                    console.log(error)
                }
            }
            const submitKeywordCreate = async(e) => {
                let FormValidKeyword = true;
                function checkFormValueKeyword() {
                    if (FormValueKeyword.keyword_name === ""){
                        setErrorMessageForm("Invalid name" + FormValueKeyword.keyword_name);
                        FormValidKeyword = false;
                    }
                    console.log("FormValid: " + FormValidKeyword);
                }
                checkFormValueKeyword();
                if (FormValidKeyword){
                    setErrorMessageForm("");
                    try {
                        const response = await axiosPrivate({
                            method: "post",
                            url: "http://localhost:8080/admin/create/keyword/",
                            data: {
                                keyword_name: FormValueKeyword.keyword_name,
                            }
                        });
                        console.log(response)
                        navigate("/maintenance", { replace: true });
                        setKeywordIndex(-1);
                        setKeywordCreate(false);
                        setFormValueKeyword({
                            keyword_name: "",
                            }
                        );
                        await updateKeywords();
                    } catch(error) {
                        console.log(error)
                    }
                }
            }
            const submitKeywordDelete = async(e) => {
                console.log(Keywords[KeywordIndex]);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/delete/keyword",
                        data: {
                            keyword_id: Keywords[KeywordIndex].keyword_id
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setKeywordIndex(-1);
                    setFormValueKeyword({
                        keyword_name: "",
                        }
                    );
                    await updateKeywords();
                } catch(error) {
                    console.log(error)
                }
            }
            async function updateKeywords() {
                let isMounted = true;
                const controller = new AbortController();
                try {
                    const response = await axiosPrivate({
                        method: "get",
                        url: "/keyword/all",
                        signal: controller.signal
                    });
                    console.log(response.data);
                    const myData = [].concat(response.data).sort((a, b) => a.keyword_id > b.keyword_id ? 1 : -1);
                    console.log(response.data);
                    isMounted && setKeywords(myData);

                } catch (err) {
                    console.error(err);
                    navigate('/login', {state: {from: location}, replace: true});
                    console.log(errMsg);
                }
            }
            function cancelCreateKeyword() {
                setKeywordCreate(false);
                setErrorMessageForm("");
            }

            return (
                <div className={"windowMainenance"}>
                    <div className={"windowleftlist"}>
                        <div className={"listitemsleft"}>
                            {Keywords.map((k,index) =>(
                                <div key={index} className={"ListItem"} onClick={() => setKeywordIndex(index)}>
                                    <div className={"ListItemTitle"}>
                                        {KeywordIndex===index? <div className={"ListItemSelected"}>{k.keyword_name}</div>:<div>{k.keyword_name}</div>}
                                    </div>
                                    {/*<div>*/}
                                    {/*    {student.firstRound? <div>First Round</div>: <div>Second Round</div>}*/}
                                    {/*</div>*/}
                                    {/*<div>*/}
                                    {/*    {student.begin_deadline} - {student.end_deadline}*/}
                                    {/*</div>*/}
                                </div>
                            ))}
                        </div>
                        <div className={"leftUnderSidebalk"}>
                            <button className={"buttonMaintenance"} onClick={() => setKeywordCreate(true)}>Create</button>
                        </div>

                    </div>
                    <div className={"borderinwindow"}/>
                    <div className={"windowrightcrud"}>
                        <div>
                            {KeywordCreate? createKeyword(): showKeywordInfo()}
                        </div>
                        <div className={"InfoButtonsBottom"}>
                            {KeywordCreate?
                                <div>
                                    <a className={"ErrorMessageForm"}>{ErrorMessageForm}</a>
                                    <button className={"buttonMaintenance"} type="submit" onClick={submitKeywordCreate}>Save</button>
                                    <button className={"buttonMaintenance"} onClick={() => cancelCreateKeyword()}>Cancel</button>
                                </div>:
                                <div>
                                    {KeywordIndex===-1? <div/>:
                                        <div>
                                            <button className={"buttonMaintenance"} type="submit" onClick={submitKeywordDelete}>Delete</button>
                                            <button className={"buttonMaintenance"} type="submit" onClick={submitKeywordUpdate}>Update</button>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
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
            </div>
        )
    }

    return (
        <div>
            <h1>Admin maintenance</h1>
            {showMaintenanceBar()}
        </div>
    )
}