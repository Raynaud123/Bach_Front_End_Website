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
        streetName: "",
        streetNumber: 0,
        postNumber: 0,
        phoneNumber: 0,
        city: "",
        country: "",
        email: "",
        master: null,
    });

    const [Masters, setMasters] = useState([]);
    const [MasterIndex, setMasterIndex] = useState(-1);
    const [MasterCreate, setMasterCreate] = useState(false);
    const [FormValueMaster, setFormValueMaster] = useState({
        firstName: "",
        lastName: "",
        targetAudience: [],
        streetName: "",
        streetNumber: 0,
        postNumber: 0,
        phoneNumber: 0,
        city: "",
        country: "",
        email: ""
    });

    const [Promotors, setPromotors] = useState([]);
    const [PromotorIndex, setPromotorIndex] = useState(-1);
    const [PromotorCreate, setPromotorCreate] = useState(false);
    const [FormValuePromotor, setFormValuePromotor] = useState({
        firstName: "",
        lastName: "",
        targetAudience: [],
        streetName: "",
        streetNumber: 0,
        postNumber: 0,
        phoneNumber: 0,
        city: "",
        country: "",
        email: "",
        approved: null
    });

    const [Providers, setProviders] = useState([]);
    const [ProviderIndex, setProviderIndex] = useState(-1);
    const [ProviderCreate, setProviderCreate] = useState(false);
    const [FormValueProvider, setFormValueProvider] = useState({
        name: "",
        approved: null,
        isCompany: null
    });

    const [TargetAudiences, setTargetAudiences] = useState([]);
    const [TargetAudienceIndex, setTargetAudienceIndex] = useState(-1);
    const [TargetAudienceCreate, setTargetAudienceCreate] = useState(false);
    const [FormValueTargetAudience, setFormValueTargetAudience] = useState({
        campus_name: "",
        city: "",
        country: "",
        postNumber:-1,
        streetName: "",
        streetNumber:-1,
        course_name: "",
        abbriviationName: "",
        hide: null
    });

    const [Keywords, setKeywords] = useState([]);
    const [KeywordIndex, setKeywordIndex] = useState(-1);
    const [KeywordCreate, setKeywordCreate] = useState(false);
    const [FormValueKeyword, setFormValueKeyword] = useState({
        keyword_name: "",
        hide: null,
    });

    const [Topics, setTopics] = useState([]);
    const [TopicIndex, setTopicIndex] = useState(-1);
    const [TopicCreate, setTopicCreate] = useState(false);
    const [FormValueTopic, setFormValueTopic] = useState({
        aantal_studenten: 2,
        approved_topic: null,
        boostedStudent: -1,
        description_topic: "",
        hide_topic: null,
        keyword_list: [],
        promotor: -1,
        provider: -1,
        release_date: "",
        student_list: [],
        tags: [],
        targetAudiences: [],
        topicName: ""
    });


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
        getPromotors().then(r => null);
        getPhases().then(r => null);
        getStudents().then(r => null);
        getMasters().then(r => null);
        getProviders().then(r => null);
        getTargetAudiences().then(r => null);
        getKeywords().then();
        getTopics().then();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    function showMaintenanceBar(effect, deps) {
        function getObjectOrNull(a) {
            if (a==="null"){
                return null;
            }
            return a;
        }
        function getObjectOrNullArray(a) {
            if (a.includes('null')){
                return null;
            }
            return a;
        }
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
                    else {
                        FormValuePhase.phaseBeginDeadline = FormValuePhase.phaseBeginDeadline + " 00:00:00";
                    }
                    if (FormValuePhase.phaseEndDeadline === ""){
                        setErrorMessageForm("Invalid Phase End Deadline" + FormValuePhase.phaseEndDeadline);
                        FormValidPhase = false;
                    }
                    else {
                        FormValuePhase.phaseEndDeadline = FormValuePhase.phaseEndDeadline + " 23:55:55";
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
                        <div className={"windowrightcrudForm"}>
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
                //console.log(event.target.name + " " + event.target.value);
            }
            const handleStudentChangeArray = (event) => {
                setFormValueStudent({
                    ...FormValueStudent,
                    [event.target.name]: Array.from(event.target.selectedOptions, item => item.value)
                });
                //console.log(Array.from(event.target.selectedOptions, item => item.value));
            }

            function showStudentInfo() {
                function getMaster(mid) {
                    return <div>{Masters.map((m) =>(
                        m.id===mid? m.firstName + " " + m.lastName:""
                    ))}
                    </div>
                }

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
                                <div className={"InfoSection"}>
                                    <label htmlFor="lastName" className={"InfoAttribute"}>Student Lastname</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Students[StudentIndex].lastName? Students[StudentIndex].lastName:""}
                                        <input type="text" name="lastName" placeholder={"Student Lastname"}
                                               value={FormValueStudent.lastName}
                                               onChange={handleStudentChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="targetAudience" className={"InfoAttribute"}>Target Audiences</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Students[StudentIndex].targetAudience.length!==0?
                                            <div>
                                                {Students[StudentIndex].targetAudience.map((ta) => (
                                                    <div key={ta.targetAudience_id}>{ta.campus.campus_name} {ta.course.abbriviationName}
                                                    </div>))}
                                            </div>:<div>No target audiences</div>}
                                        <select name="targetAudience" onChange={handleStudentChangeArray} multiple className={"maxgrootte"}>
                                            <option value={"null"}>--None--</option>
                                            {TargetAudiences.map((ta) => (
                                                <option key={ta.targetAudience_id}
                                                        value={ta.targetAudience_id}>
                                                    {ta.campus.campus_name} {ta.course.course_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="country" className={"InfoAttribute"}>Student Country</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Students[StudentIndex].country? Students[StudentIndex].country:"No country"}
                                        <input type="text" name="country" placeholder={"Country"}
                                               value={FormValueStudent.country}
                                               onChange={handleStudentChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="city" className={"InfoAttribute"}>Student City</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Students[StudentIndex].city? Students[StudentIndex].city:""}
                                        <input type="text" name="city" placeholder={"City"}
                                               value={FormValueStudent.city}
                                               onChange={handleStudentChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="postNumber" className={"InfoAttribute"}>Student Post number</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Students[StudentIndex].postNumber!==0? Students[StudentIndex].postNumber:""}
                                        <input type="number" name="postNumber" placeholder={"Post number"}
                                               value={FormValueStudent.postNumber}
                                               onChange={handleStudentChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="streetName" className={"InfoAttribute"}>Student Streetname</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Students[StudentIndex].streetName? Students[StudentIndex].streetName:""}
                                        <input type="text" name="streetName" placeholder={"Streetname"}
                                               value={FormValueStudent.streetName}
                                               onChange={handleStudentChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="streetNumber" className={"InfoAttribute"}>Student Street number</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Students[StudentIndex].streetNumber!==0? Students[StudentIndex].streetNumber:""}
                                        <input type="number" name="streetNumber" placeholder={"Street number"}
                                               value={FormValueStudent.streetNumber}
                                               onChange={handleStudentChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="email" className={"InfoAttribute"}>Email</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Students[StudentIndex].email? Students[StudentIndex].email:""}
                                        <input type="email" name="email" placeholder={"Email"}
                                               value={FormValueStudent.email}
                                               onChange={handleStudentChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="phoneNumber" className={"InfoAttribute"}>Student Phone number</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Students[StudentIndex].phoneNumber!==0? Students[StudentIndex].phoneNumber:""}
                                        <input type="number" name="phoneNumber" placeholder={"Phone number"}
                                               value={FormValueStudent.phoneNumber}
                                               onChange={handleStudentChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="master" className={"InfoAttribute"}>Student Thesis Coordinator</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Students[StudentIndex].master!==null && Students[StudentIndex].master!==0? getMaster(Students[StudentIndex].master):""}
                                        <select name="master" onChange={handleStudentChange} >
                                            <option value={"null"}>--None--</option>
                                            {Masters.map((m) => (
                                                <option value={m.id}>{m.firstName} {m.lastName}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
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
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="lastName" className={"InfoAttribute"}>Student Lastname</label>
                                    <input type="text" name="lastName" placeholder={"Student Lastname"}
                                           value={FormValueStudent.lastName}
                                           onChange={handleStudentChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="targetAudience" className={"InfoAttribute"}>Target Audiences</label>
                                    <select name="targetAudience" onChange={handleStudentChangeArray} multiple className={"maxgrootte"}>
                                        <option value={"null"}>--None--</option>
                                        {TargetAudiences.map((ta) => (
                                            <option key={ta.targetAudience_id}
                                                    value={ta.targetAudience_id}>
                                                {ta.campus.campus_name} {ta.course.course_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="country" className={"InfoAttribute"}>Student Country</label>
                                    <input type="text" name="country" placeholder={"Country"}
                                           value={FormValueStudent.country}
                                           onChange={handleStudentChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="city" className={"InfoAttribute"}>Student City</label>
                                    <input type="text" name="city" placeholder={"City"}
                                           value={FormValueStudent.city}
                                           onChange={handleStudentChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="postNumber" className={"InfoAttribute"}>Student Post number</label>
                                    <input type="number" name="postNumber" placeholder={"Post number"}
                                           value={FormValueStudent.postNumber}
                                           onChange={handleStudentChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="streetName" className={"InfoAttribute"}>Student Streetname</label>
                                    <input type="text" name="streetName" placeholder={"Streetname"}
                                           value={FormValueStudent.streetName}
                                           onChange={handleStudentChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="streetNumber" className={"InfoAttribute"}>Student Street number</label>
                                    <input type="number" name="streetNumber" placeholder={"Street number"}
                                           value={FormValueStudent.streetNumber}
                                           onChange={handleStudentChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="email" className={"InfoAttribute"}>Email</label>
                                    <input type="email" name="email" placeholder={"Email"}
                                           value={FormValueStudent.email}
                                           onChange={handleStudentChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="phoneNumber" className={"InfoAttribute"}>Student Phone number</label>
                                    <input type="number" name="phoneNumber" placeholder={"Phone number"}
                                           value={FormValueStudent.phoneNumber}
                                           onChange={handleStudentChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="master" className={"InfoAttribute"}>Student Thesis Coordinator</label>
                                    <select name="master" onChange={handleStudentChange} >
                                        <option value={"null"}>--None--</option>
                                        {Masters.map((m) => (
                                            <option value={m.id}>{m.firstName} {m.lastName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                )
            }

            const submitStudentUpdate = async(e) => {
                //console.log(FormValueStudent);
                let tas = getObjectOrNullArray(FormValueStudent.targetAudience);
                let master = getObjectOrNull(FormValueStudent.master);

                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/update/student/" + Students[StudentIndex].id,
                        data: {
                            firstName: FormValueStudent.firstName,
                            lastName: FormValueStudent.lastName,
                            targetAudience: tas,
                            streetName: FormValueStudent.streetName,
                            streetNumber: FormValueStudent.streetNumber,
                            postNumber: FormValueStudent.postNumber,
                            phoneNumber: FormValueStudent.phoneNumber,
                            city: FormValueStudent.city,
                            country: FormValueStudent.country,
                            email: FormValueStudent.email,
                            master: master,
                        }
                    });
                    //console.log(response)
                    navigate("/maintenance", { replace: true });
                    setFormValueStudent(
                        {
                            firstName: "",
                            lastName: "",
                            targetAudience: [],
                            streetName: "",
                            streetNumber: 0,
                            postNumber: 0,
                            phoneNumber: 0,
                            city: "",
                            country: "",
                            email: "",
                            master: null,
                        }
                    );
                    await updateStudents();
                } catch(error) {
                    console.log(error)
                }
            }
            const submitStudentCreate = async(e) => {
                let FormValidStudent = true;
                function checkFormValueStudent() {
                    if (FormValueStudent.phoneNumber === "" || FormValueStudent.phoneNumber === 0){
                        setErrorMessageForm("Invalid phoneNumber " + FormValueStudent.phoneNumber );
                        FormValidStudent = false;
                    }
                    if (FormValueStudent.email === ""){
                        setErrorMessageForm("Invalid email " + FormValueStudent.email);
                        FormValidStudent = false;
                    }
                    if (FormValueStudent.streetNumber <= 0  || FormValueStudent.streetNumber === null){
                        setErrorMessageForm("Invalid streetNumber " + FormValueStudent.streetNumber);
                        FormValidStudent = false;
                    }
                    if (FormValueStudent.streetName === ""){
                        setErrorMessageForm("Invalid streetName " + FormValueStudent.streetName);
                        FormValidStudent = false;
                    }
                    if (FormValueStudent.postNumber <= 0  || FormValueStudent.postNumber === null){
                        setErrorMessageForm("Invalid postNumber " + FormValueStudent.streetNumber);
                        FormValidStudent = false;
                    }
                    if (FormValueStudent.city === ""){
                        setErrorMessageForm("Invalid city " + FormValueStudent.city);
                        FormValidStudent = false;
                    }
                    if (FormValueStudent.country === ""){
                        setErrorMessageForm("Invalid country " + FormValueStudent.country);
                        FormValidStudent = false;
                    }
                    if (FormValueStudent.lastName === ""){
                        setErrorMessageForm("Invalid lastname " + FormValueStudent.lastName);
                        FormValidStudent = false;
                    }
                    if (FormValueStudent.firstName === ""){
                        setErrorMessageForm("Invalid firstname " + FormValueStudent.firstName);
                        FormValidStudent = false;
                    }
                    //console.log("FormValid: " + FormValidStudent);
                }
                checkFormValueStudent();
                if (FormValidStudent){
                    setErrorMessageForm("");
                    let tas = getObjectOrNullArray(FormValueStudent.targetAudience);
                    let master = getObjectOrNull(FormValueStudent.master);
                    try {
                        const response = await axiosPrivate({
                            method: "post",
                            url: "http://localhost:8080/admin/create/student/",
                            data: {
                                firstName: FormValueStudent.firstName,
                                lastName: FormValueStudent.lastName,
                                targetAudience: tas,
                                streetName: FormValueStudent.streetName,
                                streetNumber: FormValueStudent.streetNumber,
                                postNumber: FormValueStudent.postNumber,
                                phoneNumber: FormValidStudent.phoneNumber,
                                city: FormValueStudent.city,
                                country: FormValueStudent.country,
                                email: FormValueStudent.email,
                                master: master,
                            }
                        });
                        //console.log(response)
                        navigate("/maintenance", { replace: true });
                        setStudentIndex(-1);
                        setStudentCreate(false);
                        setFormValueStudent(
                            {
                                firstName: "",
                                lastName: "",
                                targetAudience: [],
                                streetName: "",
                                streetNumber: 0,
                                postNumber: 0,
                                phoneNumber: 0,
                                city: "",
                                country: "",
                                email: "",
                                master: null,
                            }
                        );
                        await updateStudents();
                    } catch(error) {
                        console.log(error)
                    }
                }
            }
            const submitStudentDelete = async(e) => {
                //console.log(Students[StudentIndex]);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/delete/student",
                        data: {
                            id: Students[StudentIndex].id
                        }
                    });
                    //console.log(response)
                    navigate("/maintenance", { replace: true });
                    setStudentIndex(-1);
                    setFormValueStudent({
                        firstName: "",
                        lastName: "",
                        targetAudience: [],
                        streetName: "",
                        streetNumber: 0,
                        postNumber: 0,
                        phoneNumber: 0,
                        city: "",
                        country: "",
                        email: "",
                        master: null,
                    }
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
                    //console.log(response.data);
                    const myData = [].concat(response.data).sort((a, b) => a.id > b.id ? 1 : -1);
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
                                    {student.targetAudience.map((ta) => (
                                        <div key={ta.targetAudience_id}>{ta.campus.campus_name + " " + ta.course.abbriviationName}</div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className={"leftUnderSidebalk"}>
                            <button className={"buttonMaintenance"} onClick={() => setStudentCreate(true)}>Create</button>
                        </div>

                    </div>
                    <div className={"borderinwindow"}/>
                    <div className={"windowrightcrud"}>
                        <div className={"windowrightcrudForm"}>
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
        }
        function showMasters() {
            const handleMasterChange = (event) => {
                setFormValueMaster({
                    ...FormValueMaster,
                    [event.target.name]: event.target.value
                });
            }
            const handleMasterChangeArray = (event) => {
                setFormValueMaster({
                    ...FormValueMaster,
                    [event.target.name]: Array.from(event.target.selectedOptions, item => item.value)
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
                                    <label htmlFor="firstName" className={"InfoAttribute"}>Firstname</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Masters[MasterIndex].firstName? Masters[MasterIndex].firstName:""}
                                        <input type="text" name="firstName" placeholder={"firstname"}
                                               value={FormValueMaster.firstName}
                                               onChange={handleMasterChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="lastName" className={"InfoAttribute"}>Lastname</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Masters[MasterIndex].lastName? Masters[MasterIndex].lastName:""}
                                        <input type="text" name="lastName" placeholder={"Lastname"}
                                               value={FormValueMaster.lastName}
                                               onChange={handleMasterChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="targetAudience" className={"InfoAttribute"}>Target Audience</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Masters[MasterIndex].targetAudience.length!==0?
                                            <div>
                                                {Masters[MasterIndex].targetAudience.map((ta) => (
                                                    <div key={ta.targetAudience_id}>{ta.campus.campus_name} {ta.course.abbriviationName}
                                                    </div>))}
                                            </div>:<div>No target audiences</div>}
                                        <select name="targetAudience" onChange={handleMasterChangeArray} multiple className={"maxgrootte"}>
                                            <option value={"null"}>--None--</option>
                                            {TargetAudiences.map((ta) => (
                                                <option key={ta.targetAudience_id}
                                                        value={ta.targetAudience_id}>
                                                    {ta.campus.campus_name} {ta.course.course_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="country" className={"InfoAttribute"}>Country</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Masters[MasterIndex].country? Masters[MasterIndex].country:"No country"}
                                        <input type="text" name="country" placeholder={"Country"}
                                               value={FormValueMaster.country}
                                               onChange={handleMasterChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="city" className={"InfoAttribute"}>City</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Masters[MasterIndex].city? Masters[MasterIndex].city:""}
                                        <input type="text" name="city" placeholder={"City"}
                                               value={FormValueMaster.city}
                                               onChange={handleMasterChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="postNumber" className={"InfoAttribute"}>Post number</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Masters[MasterIndex].postNumber!==0? Masters[MasterIndex].postNumber:""}
                                        <input type="number" name="postNumber" placeholder={"Post number"}
                                               value={FormValueMaster.postNumber}
                                               onChange={handleMasterChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="streetName" className={"InfoAttribute"}>Streetname</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Masters[MasterIndex].streetName? Masters[MasterIndex].streetName:""}
                                        <input type="text" name="streetName" placeholder={"Streetname"}
                                               value={FormValueMaster.streetName}
                                               onChange={handleMasterChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="streetNumber" className={"InfoAttribute"}>Street number</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Masters[MasterIndex].streetNumber!==0? Masters[MasterIndex].streetNumber:""}
                                        <input type="number" name="streetNumber" placeholder={"Street number"}
                                               value={FormValueMaster.streetNumber}
                                               onChange={handleMasterChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="email" className={"InfoAttribute"}>Email</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Masters[MasterIndex].email? Masters[MasterIndex].email:""}
                                        <input type="email" name="email" placeholder={"Email"}
                                               value={FormValueMaster.email}
                                               onChange={handleMasterChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="phoneNumber" className={"InfoAttribute"}>Phone number</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Masters[MasterIndex].phoneNumber!==0? Masters[MasterIndex].phoneNumber:""}
                                        <input type="number" name="phoneNumber" placeholder={"Phone number"}
                                               value={FormValueMaster.phoneNumber}
                                               onChange={handleMasterChange}
                                        />
                                    </div>
                                </div>
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
                                    <label htmlFor="firstName" className={"InfoAttribute"}>Firstname</label>
                                    <input type="text" name="firstName" placeholder={"Firstname"}
                                           value={FormValueMaster.firstName}
                                           onChange={handleMasterChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="lastName" className={"InfoAttribute"}>Lastname</label>
                                    <input type="text" name="lastName" placeholder={"Lastname"}
                                           value={FormValueMaster.lastName}
                                           onChange={handleMasterChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="targetAudience" className={"InfoAttribute"}>Target Audiences</label>
                                    <select name="targetAudience" onChange={handleMasterChangeArray} multiple className={"maxgrootte"}>
                                        <option value={"null"}>--None--</option>
                                        {TargetAudiences.map((ta) => (
                                            <option key={ta.targetAudience_id}
                                                    value={ta.targetAudience_id}>
                                                {ta.campus.campus_name} {ta.course.course_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="country" className={"InfoAttribute"}>Country</label>
                                    <input type="text" name="country" placeholder={"Country"}
                                           value={FormValueMaster.country}
                                           onChange={handleMasterChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="city" className={"InfoAttribute"}>City</label>
                                    <input type="text" name="city" placeholder={"City"}
                                           value={FormValueMaster.city}
                                           onChange={handleMasterChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="postNumber" className={"InfoAttribute"}>Post number</label>
                                    <input type="number" name="postNumber" placeholder={"Post number"}
                                           value={FormValueMaster.postNumber}
                                           onChange={handleMasterChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="streetName" className={"InfoAttribute"}>Streetname</label>
                                    <input type="text" name="streetName" placeholder={"Streetname"}
                                           value={FormValueMaster.streetName}
                                           onChange={handleMasterChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="streetNumber" className={"InfoAttribute"}>Street number</label>
                                    <input type="number" name="streetNumber" placeholder={"Street number"}
                                           value={FormValueMaster.streetNumber}
                                           onChange={handleMasterChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="email" className={"InfoAttribute"}>Email</label>
                                    <input type="email" name="email" placeholder={"Email"}
                                           value={FormValueMaster.email}
                                           onChange={handleMasterChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="phoneNumber" className={"InfoAttribute"}>Phone number</label>
                                    <input type="number" name="phoneNumber" placeholder={"Phone number"}
                                           value={FormValueMaster.phoneNumber}
                                           onChange={handleMasterChange}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                )
            }

            const submitMasterUpdate = async(e) => {
                //console.log(Masters[MasterIndex]);
                //console.log(FormValueMaster);
                let tas = getObjectOrNullArray(FormValueMaster.targetAudience);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/update/master/" + Masters[MasterIndex].id,
                        data: {
                            firstName: FormValueMaster.firstName,
                            lastName: FormValueMaster.lastName,
                            targetAudience: tas,
                            streetName: FormValueMaster.streetName,
                            streetNumber: FormValueMaster.streetNumber,
                            postNumber: FormValueMaster.postNumber,
                            phoneNumber: FormValueMaster.phoneNumber,
                            city: FormValueMaster.city,
                            country: FormValueMaster.country,
                            email: FormValueMaster.email
                        }
                    });
                    //console.log(response)
                    navigate("/maintenance", { replace: true });
                    setFormValueMaster(
                        {
                            firstName: "",
                            lastName: "",
                            targetAudience: [],
                            streetName: "",
                            streetNumber: 0,
                            postNumber: 0,
                            phoneNumber: 0,
                            city: "",
                            country: "",
                            email: ""
                        }
                    );
                    await updateMasters();
                } catch(error) {
                    console.log(error)
                }
            }
            const submitMasterCreate = async(e) => {
                let FormValidMaster = true;
                function checkFormValueMaster() {
                    if (FormValueMaster.phoneNumber === "" || FormValueMaster.phoneNumber === 0){
                        setErrorMessageForm("Invalid phoneNumber " + FormValueMaster.phoneNumber );
                        FormValidMaster = false;
                    }
                    if (FormValueMaster.email === ""){
                        setErrorMessageForm("Invalid email " + FormValueMaster.email);
                        FormValidMaster = false;
                    }
                    if (FormValueMaster.streetNumber <= 0  || FormValueMaster.streetNumber === null){
                        setErrorMessageForm("Invalid streetNumber " + FormValueMaster.streetNumber);
                        FormValidMaster = false;
                    }
                    if (FormValueMaster.streetName === ""){
                        setErrorMessageForm("Invalid streetName " + FormValueMaster.streetName);
                        FormValidMaster = false;
                    }
                    if (FormValueMaster.postNumber <= 0  || FormValueMaster.postNumber === null){
                        setErrorMessageForm("Invalid postNumber " + FormValueMaster.streetNumber);
                        FormValidMaster = false;
                    }
                    if (FormValueMaster.city === ""){
                        setErrorMessageForm("Invalid city " + FormValueMaster.city);
                        FormValidMaster = false;
                    }
                    if (FormValueMaster.country === ""){
                        setErrorMessageForm("Invalid country " + FormValueMaster.country);
                        FormValidMaster = false;
                    }
                    if (FormValuePromotor.targetAudience.length > 1){
                        setErrorMessageForm("To many targetAudience " + FormValuePromotor.targetAudience);
                        FormValidMaster = false;
                    }
                    if (FormValueMaster.lastName === ""){
                        setErrorMessageForm("Invalid lastname " + FormValueMaster.lastName);
                        FormValidMaster = false;
                    }
                    if (FormValueMaster.firstName === ""){
                        setErrorMessageForm("Invalid firstname " + FormValueMaster.firstName);
                        FormValidMaster = false;
                    }
                    //console.log("FormValid: " + FormValidMaster);
                }
                checkFormValueMaster();
                if (FormValidMaster){
                    setErrorMessageForm("");
                    //console.log(FormValueMaster);
                    try {
                        const response = await axiosPrivate({
                            method: "post",
                            url: "http://localhost:8080/admin/create/master/",
                            data: {
                                firstName: FormValueMaster.firstName,
                                lastName: FormValueMaster.lastName,
                                targetAudience: FormValueMaster.targetAudience,
                                streetName: FormValueMaster.streetName,
                                streetNumber: FormValueMaster.streetNumber,
                                postNumber: FormValueMaster.postNumber,
                                phoneNumber: FormValueMaster.phoneNumber,
                                city: FormValueMaster.city,
                                country: FormValueMaster.country,
                                email: FormValueMaster.email
                            }
                        });
                        //console.log(response)
                        navigate("/maintenance", { replace: true });
                        setMasterIndex(-1);
                        setMasterCreate(false);
                        setFormValueMaster(
                            {
                                firstName: "",
                                lastName: "",
                                targetAudience: [],
                                streetName: "",
                                streetNumber: 0,
                                postNumber: 0,
                                phoneNumber: 0,
                                city: "",
                                country: "",
                                email: ""
                            }
                        );
                        await updateMasters();
                    } catch(error) {
                        console.log(error)
                    }
                }
            }
            const submitMasterDelete = async(e) => {
                //console.log(Masters[MasterIndex]);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/delete/master",
                        data: {
                            master_id: Masters[MasterIndex].id
                        }
                    });
                    //console.log(response)
                    navigate("/maintenance", { replace: true });
                    setMasterIndex(-1);
                    setFormValueMaster({
                        firstName: "",
                        lastName: "",
                        targetAudience: [],
                        streetName: "",
                        streetNumber: 0,
                        postNumber: 0,
                        phoneNumber: 0,
                        city: "",
                        country: "",
                        email: ""
                        }
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
                        url: "/master/all",
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
                                    {master.targetAudience.map((ta) => (
                                        <div key={ta.targetAudience_id}>{ta.campus.campus_name + " " + ta.course.abbriviationName}</div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className={"leftUnderSidebalk"}>
                            <button className={"buttonMaintenance"} onClick={() => setMasterCreate(true)}>Create</button>
                        </div>

                    </div>
                    <div className={"borderinwindow"}/>
                    <div className={"windowrightcrud"}>
                        <div className={"windowrightcrudForm"}>
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
        }
        function showPromotors() {
            const handlePromotorChange = (event) => {
                setFormValuePromotor({
                    ...FormValuePromotor,
                    [event.target.name]: event.target.value
                });
                console.log(event.target.name + " " + event.target.value);
            }
            const handlePromotorChangeArray = (event) => {
                setFormValuePromotor({
                    ...FormValuePromotor,
                    [event.target.name]: Array.from(event.target.selectedOptions, item => item.value)
                });
                console.log(Array.from(event.target.selectedOptions, item => item.value));
            }

            function showPromotorInfo() {
                return(
                    <div>
                        {PromotorIndex===-1? <div/>:
                            <form className={"FormInfo"}>
                                <div className={"FormInfoTitle"}>
                                    Promotor
                                </div>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <div className={"comment"}>Initial Value</div>
                                    <div className={"comment"}>New Value</div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="firstName" className={"InfoAttribute"}>Firstname</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Promotors[PromotorIndex].firstName? Promotors[PromotorIndex].firstName:""}
                                        <input type="text" name="firstName" placeholder={"Firstname"}
                                               value={FormValuePromotor.firstName}
                                               onChange={handlePromotorChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="lastName" className={"InfoAttribute"}>Lastname</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Promotors[PromotorIndex].lastName? Promotors[PromotorIndex].lastName:""}
                                        <input type="text" name="lastName" placeholder={"Lastname"}
                                               value={FormValuePromotor.lastName}
                                               onChange={handlePromotorChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="targetAudience" className={"InfoAttribute"}>Target Audiences</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Promotors[PromotorIndex].targetAudience.length!==0?
                                            <div>
                                                {Promotors[PromotorIndex].targetAudience.map((ta) => (
                                                    <div key={ta.targetAudience_id}>{ta.campus.campus_name} {ta.course.abbriviationName}
                                                    </div>))}
                                            </div>:<div>No target audiences</div>}
                                        <select name="targetAudience" onChange={handlePromotorChangeArray} multiple className={"maxgrootte"}>
                                            <option value={"null"}>--None--</option>
                                            {TargetAudiences.map((ta) => (
                                                <option key={ta.targetAudience_id}
                                                        value={ta.targetAudience_id}>
                                                    {ta.campus.campus_name} {ta.course.course_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="country" className={"InfoAttribute"}>Country</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Promotors[PromotorIndex].country? Promotors[PromotorIndex].country:""}
                                        <input type="text" name="country" placeholder={"Country"}
                                               value={FormValuePromotor.country}
                                               onChange={handlePromotorChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="city" className={"InfoAttribute"}>City</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Promotors[PromotorIndex].city? Promotors[PromotorIndex].city:""}
                                        <input type="text" name="city" placeholder={"City"}
                                               value={FormValuePromotor.city}
                                               onChange={handlePromotorChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="postNumber" className={"InfoAttribute"}>Postnumber</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Promotors[PromotorIndex].postNumber!==0? Promotors[PromotorIndex].postNumber:""}
                                        <input type="number" name="postNumber"
                                               value={FormValuePromotor.postNumber}
                                               onChange={handlePromotorChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="streetName" className={"InfoAttribute"}>Streetname</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Promotors[PromotorIndex].streetName? Promotors[PromotorIndex].streetName:""}
                                        <input type="text" name="streetName" placeholder={"Streetname"}
                                               value={FormValuePromotor.streetName}
                                               onChange={handlePromotorChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="streetNumber" className={"InfoAttribute"}>Street number</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Promotors[PromotorIndex].streetNumber!==0? Promotors[PromotorIndex].streetNumber:""}
                                        <input type="number" name="streetNumber"
                                               value={FormValuePromotor.streetNumber}
                                               onChange={handlePromotorChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="email" className={"InfoAttribute"}>Email</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Promotors[PromotorIndex].email? Promotors[PromotorIndex].email:""}
                                        <input type="email" name="email" placeholder={"Email"}
                                               value={FormValuePromotor.email}
                                               onChange={handlePromotorChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="phoneNumber" className={"InfoAttribute"}>Phone number</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Promotors[PromotorIndex].phoneNumber!==0? Promotors[PromotorIndex].phoneNumber:""}
                                        <input type="number" name="phoneNumber" placeholder={"Phone number"}
                                               value={FormValuePromotor.phoneNumber}
                                               onChange={handlePromotorChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="approved" className={"InfoAttribute"}>Approve</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Promotors[PromotorIndex].approved? "True":"False"}
                                        <select name="approved" onChange={handlePromotorChange}>
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
            function createPromotor() {
                return(
                    <div>
                        <form className={"FormInfo"}>
                            <div className={"FormInfoTitle"}>
                                New Promotor
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="firstName" className={"InfoAttribute"}>Firstname</label>
                                    <input type="text" name="firstName" placeholder={"Firstname"}
                                           value={FormValuePromotor.firstName}
                                           onChange={handlePromotorChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="lastName" className={"InfoAttribute"}>Lastname</label>
                                    <input type="text" name="lastName" placeholder={"Lastname"}
                                           value={FormValuePromotor.lastName}
                                           onChange={handlePromotorChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="targetAudience" className={"InfoAttribute"}>Target Audiences</label>
                                    <select name="targetAudience" onChange={handlePromotorChangeArray} multiple className={"maxgrootte"}>
                                        <option value={"null"}>--None--</option>
                                        {TargetAudiences.map((ta) => (
                                            <option key={ta.targetAudience_id}
                                                    value={ta.targetAudience_id}>
                                                {ta.campus.campus_name} {ta.course.course_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="country" className={"InfoAttribute"}>Country</label>
                                    <input type="text" name="country" placeholder={"Country"}
                                           value={FormValuePromotor.country}
                                           onChange={handlePromotorChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="city" className={"InfoAttribute"}>City</label>
                                    <input type="text" name="city" placeholder={"City"}
                                           value={FormValuePromotor.city}
                                           onChange={handlePromotorChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="postNumber" className={"InfoAttribute"}>Postnumber</label>
                                    <input type="number" name="postNumber"
                                           value={FormValuePromotor.postNumber}
                                           onChange={handlePromotorChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="streetName" className={"InfoAttribute"}>Streetname</label>
                                    <input type="text" name="streetName" placeholder={"Streetname"}
                                           value={FormValuePromotor.streetName}
                                           onChange={handlePromotorChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="streetNumber" className={"InfoAttribute"}>Street number</label>
                                    <input type="number" name="streetNumber"
                                           value={FormValuePromotor.streetNumber}
                                           onChange={handlePromotorChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="email" className={"InfoAttribute"}>Email</label>
                                    <input type="email" name="email" placeholder={"Email"}
                                           value={FormValuePromotor.email}
                                           onChange={handlePromotorChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="phoneNumber" className={"InfoAttribute"}>Phone number</label>
                                    <input type="number" name="phoneNumber" placeholder={"Phone number"}
                                           value={FormValuePromotor.phoneNumber}
                                           onChange={handlePromotorChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="approved" className={"InfoAttribute"}>Approve</label>
                                    <select name="approved" onChange={handlePromotorChange}>
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

            const submitPromotorUpdate = async(e) => {
                //console.log(Promotors[PromotorIndex]);
                //console.log(FormValuePromotor);
                let tas = getObjectOrNullArray(FormValuePromotor.targetAudience);
                console.log(tas);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/update/promotor/" + Promotors[PromotorIndex].id,
                        data: {
                            firstName: FormValuePromotor.firstName,
                            lastName: FormValuePromotor.lastName,
                            targetAudience: tas,
                            streetName: FormValuePromotor.streetName,
                            streetNumber: FormValuePromotor.streetNumber,
                            postNumber: FormValuePromotor.postNumber,
                            phoneNumber: FormValuePromotor.phoneNumber,
                            city: FormValuePromotor.city,
                            country: FormValuePromotor.country,
                            email: FormValuePromotor.email,
                            approved: FormValuePromotor.approved
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setFormValuePromotor({
                        firstName: "",
                        lastName: "",
                        targetAudience: [],
                        streetName: "",
                        streetNumber: 0,
                        postNumber: 0,
                        phoneNumber: 0,
                        city: "",
                        country: "",
                        email: "",
                        approved: null
                    }
                    );
                    await updatePromotors();
                } catch(error) {
                    console.log(error)
                }
            }
            const submitPromotorCreate = async(e) => {
                let FormValidPromotor = true;
                function checkFormValuePromotor() {
                    if (FormValuePromotor.approved === null ){
                        setErrorMessageForm("Invalid approve " + FormValuePromotor.approved);
                        FormValidPromotor = false;
                    }
                    if (FormValuePromotor.phoneNumber === "" || FormValuePromotor.phoneNumber === 0){
                        setErrorMessageForm("Invalid phoneNumber " + FormValuePromotor.phoneNumber );
                        FormValidPromotor = false;
                    }
                    if (FormValuePromotor.email === ""){
                        setErrorMessageForm("Invalid email " + FormValuePromotor.email);
                        FormValidPromotor = false;
                    }
                    if (FormValuePromotor.streetNumber <= 0  || FormValuePromotor.streetNumber === null){
                        setErrorMessageForm("Invalid streetNumber " + FormValuePromotor.streetNumber);
                        FormValidPromotor = false;
                    }
                    if (FormValuePromotor.streetName === ""){
                        setErrorMessageForm("Invalid streetName " + FormValuePromotor.streetName);
                        FormValidPromotor = false;
                    }
                    if (FormValuePromotor.postNumber <= 0  || FormValuePromotor.postNumber === null){
                        setErrorMessageForm("Invalid postNumber " + FormValuePromotor.streetNumber);
                        FormValidPromotor = false;
                    }
                    if (FormValuePromotor.city === ""){
                        setErrorMessageForm("Invalid city " + FormValuePromotor.city);
                        FormValidPromotor = false;
                    }
                    if (FormValuePromotor.country === ""){
                        setErrorMessageForm("Invalid country " + FormValuePromotor.country);
                        FormValidPromotor = false;
                    }
                    if (FormValuePromotor.lastName === ""){
                        setErrorMessageForm("Invalid lastname " + FormValuePromotor.lastName);
                        FormValidPromotor = false;
                    }
                    if (FormValuePromotor.firstName === ""){
                        setErrorMessageForm("Invalid firstname " + FormValuePromotor.firstName);
                        FormValidPromotor = false;
                    }
                }
                checkFormValuePromotor();
                if (FormValidPromotor){
                    setErrorMessageForm("");
                    let tas = getObjectOrNullArray(FormValuePromotor.targetAudience);
                    try {
                        const response = await axiosPrivate({
                            method: "post",
                            url: "http://localhost:8080/admin/create/promotor/",
                            data: {
                                firstName: FormValuePromotor.firstName,
                                lastName: FormValuePromotor.lastName,
                                targetAudience: tas,
                                streetName: FormValuePromotor.streetName,
                                streetNumber: FormValuePromotor.streetNumber,
                                postNumber: FormValuePromotor.postNumber,
                                phoneNumber: FormValuePromotor.phoneNumber,
                                city: FormValuePromotor.city,
                                country: FormValuePromotor.country,
                                email: FormValuePromotor.email,
                                approved: FormValuePromotor.approved
                            }
                        });
                        console.log(response)
                        navigate("/maintenance", { replace: true });
                        setPromotorIndex(-1);
                        setPromotorCreate(false);
                        setFormValuePromotor({
                            firstName: "",
                            lastName: "",
                            targetAudience: [],
                            streetName: "",
                            streetNumber: 0,
                            postNumber: 0,
                            phoneNumber: 0,
                            city: "",
                            country: "",
                            email: "",
                            approved: null
                            }
                        );
                        await updatePromotors();
                    } catch(error) {
                        console.log(error)
                    }
                }
            }
            const submitPromotorDelete = async(e) => {
                console.log(Promotors[PromotorIndex]);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/delete/promotor",
                        data: {
                            id: Promotors[PromotorIndex].id
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setPromotorIndex(-1);
                    setFormValuePromotor({
                            firstName: "",
                            lastName: "",
                            targetAudience: [],
                            streetName: "",
                            streetNumber: 0,
                            postNumber: 0,
                            phoneNumber: 0,
                            city: "",
                            country: "",
                            email: "",
                            approved: null
                        }
                    );
                    await updatePromotors();
                } catch(error) {
                    console.log(error)
                }
            }
            async function updatePromotors() {
                let isMounted = true;
                const controller = new AbortController();
                try {
                    const response = await axiosPrivate({
                        method: "get",
                        url: "/promotor/all",
                        signal: controller.signal
                    });
                    console.log(response.data);
                    const myData = [].concat(response.data).sort((a, b) => a.id > b.id ? 1 : -1);
                    console.log(response.data);
                    isMounted && setPromotors(myData);

                } catch (err) {
                    console.error(err);
                    navigate('/login', {state: {from: location}, replace: true});
                    console.log(errMsg);
                }
            }
            function cancelCreatePromotor() {
                setPromotorCreate(false);
                setErrorMessageForm("");
            }

            return (
                <div className={"windowMainenance"}>
                    <div className={"windowleftlist"}>
                        <div className={"listitemsleft"}>
                            {Promotors.map((prom,index) =>(
                                <div key={index} className={"ListItem"} onClick={() => setPromotorIndex(index)}>
                                    <div className={"ListItemTitle"}>
                                        {PromotorIndex===index? <div className={"ListItemSelected"}>{prom.firstName}</div>:<div>{prom.firstName}</div>}
                                    </div>
                                    {prom.targetAudience.map((ta) => (
                                        <div key={ta.targetAudience_id}>{ta.campus.campus_name + " " + ta.course.abbriviationName}</div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className={"leftUnderSidebalk"}>
                            <button className={"buttonMaintenance"} onClick={() => setPromotorCreate(true)}>Create</button>
                        </div>

                    </div>
                    <div className={"borderinwindow"}/>
                    <div className={"windowrightcrud"}>
                        <div className={"windowrightcrudForm"}>
                            {PromotorCreate? createPromotor(): showPromotorInfo()}
                        </div>
                        <div className={"InfoButtonsBottom"}>
                            {PromotorCreate?
                                <div>
                                    <a className={"ErrorMessageForm"}>{ErrorMessageForm}</a>
                                    <button className={"buttonMaintenance"} type="submit" onClick={submitPromotorCreate}>Save</button>
                                    <button className={"buttonMaintenance"} onClick={() => cancelCreatePromotor()}>Cancel</button>
                                </div>:
                                <div>
                                    {PromotorIndex===-1? <div/>:
                                        <div>
                                            <button className={"buttonMaintenance"} type="submit" onClick={submitPromotorDelete}>Delete</button>
                                            <button className={"buttonMaintenance"} type="submit" onClick={submitPromotorUpdate}>Update</button>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )
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
                                        {Providers[ProviderIndex].name!==""? Providers[ProviderIndex].name:<div/>}
                                        <input type="text" name="name" placeholder={"Provider name"}
                                               value={FormValueProvider.name}
                                               onChange={handleProviderChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="isCompany" className={"InfoAttribute"}>Is a Company?</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Providers[ProviderIndex].isCompany? "True":"False"}
                                        <select name="isCompany" onChange={handleProviderChange}>
                                            <option value={"null"}>Null</option>
                                            <option value={"false"}>False</option>
                                            <option value={"true"}>True</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="approved" className={"InfoAttribute"}>Approved</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Providers[ProviderIndex].approved? "True":"False"}
                                        <select name="approved" onChange={handleProviderChange}>
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
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="isCompany" className={"InfoAttribute"}>Is a Company?</label>
                                    <select name="isCompany" onChange={handleProviderChange}>
                                        <option value={"null"}>Null</option>
                                        <option value={"false"}>False</option>
                                        <option value={"true"}>True</option>
                                    </select>
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="approved" className={"InfoAttribute"}>Approved</label>
                                    <select name="approved" onChange={handleProviderChange}>
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

            const submitProviderUpdate = async(e) => {
                console.log(Providers[ProviderIndex]);
                console.log(FormValueProvider);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/update/topicprovider/" + Providers[ProviderIndex].id,
                        data: {
                            name: FormValueProvider.name,
                            isCompany: FormValueProvider.isCompany,
                            approved: FormValueProvider.approved
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setFormValueProvider({
                            name: "",
                            approved: null,
                            isCompany: null
                    }
                    );
                    await updateProviders();
                } catch(error) {
                    console.log(error)
                }
            }
            const submitProviderCreate = async(e) => {
                let FormValidProvider = true;
                function checkFormValueProvider() {
                    if (FormValueProvider.approved === null){
                        setErrorMessageForm("Invalid approved" + FormValueProvider.approved);
                        FormValidProvider = false;
                    }
                    if (FormValueProvider.isCompany === null){
                        setErrorMessageForm("Invalid isCompany" + FormValueProvider.isCompany);
                        FormValidProvider = false;
                    }
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
                                isCompany: FormValueProvider.isCompany,
                                approved: FormValueProvider.approved
                            }
                        });
                        console.log(response)
                        navigate("/maintenance", { replace: true });
                        setProviderIndex(-1);
                        setProviderCreate(false);
                        setFormValueProvider({
                                name: "",
                                approved: null,
                                isCompany: null
                        }
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
                            approved: null,
                            isCompany: null
                    }
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
                        url: "/topicprovider/all",
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
                                </div>
                            ))}
                        </div>
                        <div className={"leftUnderSidebalk"}>
                            <button className={"buttonMaintenance"} onClick={() => setProviderCreate(true)}>Create</button>
                        </div>

                    </div>
                    <div className={"borderinwindow"}/>
                    <div className={"windowrightcrud"}>
                        <div className={"windowrightcrudForm"}>
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
                console.log(event.target.name + ": " + event.target.value)
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
                                    <label htmlFor="campus_name" className={"InfoAttribute"}>Campus Name</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {TargetAudiences[TargetAudienceIndex].campus.campus_name? TargetAudiences[TargetAudienceIndex].campus.campus_name:""}
                                        <input type="text" name="campus_name" placeholder={"Campus name"}
                                               value={FormValueTargetAudience.campus_name}
                                               onChange={handleTargetAudienceChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="country" className={"InfoAttribute"}>Campus Country</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {TargetAudiences[TargetAudienceIndex].campus.country? TargetAudiences[TargetAudienceIndex].campus.country:""}
                                        <input type="text" name="country" placeholder={"Campus country"}
                                               value={FormValueTargetAudience.country}
                                               onChange={handleTargetAudienceChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="city" className={"InfoAttribute"}>Campus City</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {TargetAudiences[TargetAudienceIndex].campus.city? TargetAudiences[TargetAudienceIndex].campus.city:""}
                                        <input type="text" name="city" placeholder={"Campus city"}
                                               value={FormValueTargetAudience.city}
                                               onChange={handleTargetAudienceChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="postNumber" className={"InfoAttribute"}>Campus Postnumber</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {TargetAudiences[TargetAudienceIndex].campus.postNumber? TargetAudiences[TargetAudienceIndex].campus.postNumber:""}
                                        <input type="number" name="postNumber" placeholder={0}
                                               value={FormValueTargetAudience.postNumber}
                                               onChange={handleTargetAudienceChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="streetName" className={"InfoAttribute"}>Campus Streetname</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {TargetAudiences[TargetAudienceIndex].campus.streetName? TargetAudiences[TargetAudienceIndex].campus.streetName:""}
                                        <input type="text" name="streetName" placeholder={"Campus streetname"}
                                               value={FormValueTargetAudience.streetName}
                                               onChange={handleTargetAudienceChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="streetNumber" className={"InfoAttribute"}>Campus Streetnumber</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {TargetAudiences[TargetAudienceIndex].campus.streetNumber? TargetAudiences[TargetAudienceIndex].campus.streetNumber:""}
                                        <input type="number" name="streetNumber" placeholder={0}
                                               value={FormValueTargetAudience.streetNumber}
                                               onChange={handleTargetAudienceChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="course_name" className={"InfoAttribute"}>Course Name</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {TargetAudiences[TargetAudienceIndex].course.course_name? TargetAudiences[TargetAudienceIndex].course.course_name:""}
                                        <input type="text" name="course_name" placeholder={"Course name"}
                                               value={FormValueTargetAudience.course_name}
                                               onChange={handleTargetAudienceChange}
                                        />
                                    </div></div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="abbriviationName" className={"InfoAttribute"}>Course Abbriviation</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {TargetAudiences[TargetAudienceIndex].course.abbriviationName? TargetAudiences[TargetAudienceIndex].course.abbriviationName:""}
                                        <input type="text" name="abbriviationName" placeholder={"Course abbriviation"}
                                               value={FormValueTargetAudience.abbriviationName}
                                               onChange={handleTargetAudienceChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="hide" className={"InfoAttribute"}>Hide</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {TargetAudiences[TargetAudienceIndex].hide? "True":"False"}
                                        <select name="hide" onChange={handleTargetAudienceChange}>
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
            function createTargetAudience() {
                return(
                    <div>
                        <form className={"FormInfo"}>
                            <div className={"FormInfoTitle"}>
                                New TargetAudience
                            </div>
                            <div className={"InfoSection"}>
                                Campus
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="campus_name" className={"InfoAttribute"}>Campus name</label>
                                    <input type="text" name="campus_name" placeholder={"Campus name"}
                                           value={FormValueTargetAudience.campus_name}
                                           onChange={handleTargetAudienceChange}
                                    />
                                </div>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="country" className={"InfoAttribute"}>Campus country</label>
                                    <input type="text" name="country" placeholder={"Campus country"}
                                           value={FormValueTargetAudience.country}
                                           onChange={handleTargetAudienceChange}
                                    />
                                </div>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="city" className={"InfoAttribute"}>Campus city</label>
                                    <input type="text" name="city" placeholder={"Campus city"}
                                           value={FormValueTargetAudience.city}
                                           onChange={handleTargetAudienceChange}
                                    />
                                </div>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="postNumber" className={"InfoAttribute"}>Campus postnumber</label>
                                    <input type="number" name="postNumber" placeholder={0}
                                           value={FormValueTargetAudience.postNumber}
                                           onChange={handleTargetAudienceChange}
                                    />
                                </div>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="streetName" className={"InfoAttribute"}>Campus streetname</label>
                                    <input type="text" name="streetName" placeholder={"Campus streetname"}
                                           value={FormValueTargetAudience.streetName}
                                           onChange={handleTargetAudienceChange}
                                    />
                                </div>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="streetNumber" className={"InfoAttribute"}>Campus streetnumber</label>
                                    <input type="number" name="streetNumber" placeholder={0}
                                           value={FormValueTargetAudience.streetNumber}
                                           onChange={handleTargetAudienceChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                Course
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="course_name" className={"InfoAttribute"}>Course name</label>
                                    <input type="text" name="course_name" placeholder={"Course name"}
                                           value={FormValueTargetAudience.course_name}
                                           onChange={handleTargetAudienceChange}
                                    />
                                </div>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="abbriviationName" className={"InfoAttribute"}>Course abbriviation name</label>
                                    <input type="text" name="abbriviationName" placeholder={"Course abbriviation"}
                                           value={FormValueTargetAudience.abbriviationName}
                                           onChange={handleTargetAudienceChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                Hide
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="hide" className={"InfoAttribute"}>Hide TargetAudience</label>
                                    <select name="hide" onChange={handleTargetAudienceChange}>
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

            const submitTargetAudienceUpdate = async(e) => {
                console.log(TargetAudiences[TargetAudienceIndex]);
                console.log(FormValueTargetAudience);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/update/targetaudience/" + TargetAudiences[TargetAudienceIndex].targetAudience_id,
                        data: {
                            campus: {
                                campus_name: FormValueTargetAudience.campus_name,
                                city: FormValueTargetAudience.city,
                                country: FormValueTargetAudience.country,
                                postNumber: FormValueTargetAudience.postNumber,
                                streetName: FormValueTargetAudience.streetName,
                                streetNumber: FormValueTargetAudience.streetNumber
                            },
                            course: {
                                course_name: FormValueTargetAudience.course_name,
                                abbriviationName: FormValueTargetAudience.abbriviationName
                            },
                            hide: FormValueTargetAudience.hide,
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setFormValueTargetAudience({
                        campus_name: "",
                        city: "",
                        country: "",
                        postNumber:-1,
                        streetName: "",
                        streetNumber:-1,
                        course_name: "",
                        abbriviationName: "",
                        hide: null
                    }
                    );
                    await updateTargetAudiences();
                } catch(error) {
                    console.log(error)
                }
            }
            const submitTargetAudienceCreate = async(e) => {
                let FormValidTargetAudience = true;
                function checkFormValueTargetAudience() {
                    if (FormValueTargetAudience.campus_name === ""){
                        setErrorMessageForm("Invalid campus name: " + FormValueTargetAudience.campus_name);
                        FormValidTargetAudience = false;
                    }
                    else if (FormValueTargetAudience.country === ""){
                        setErrorMessageForm("Invalid campus country: " + FormValueTargetAudience.country);
                        FormValidTargetAudience = false;
                    }
                    else if (FormValueTargetAudience.city === ""){
                        setErrorMessageForm("Invalid campus city: " + FormValueTargetAudience.city);
                        FormValidTargetAudience = false;
                    }
                    else if (FormValueTargetAudience.streetName === ""){
                        setErrorMessageForm("Invalid campus streetname: " + FormValueTargetAudience.streetName);
                        FormValidTargetAudience = false;
                    }
                    else if (FormValueTargetAudience.course_name === ""){
                        setErrorMessageForm("Invalid course name: " + FormValueTargetAudience.course_name);
                        FormValidTargetAudience = false;
                    }
                    else if (FormValueTargetAudience.abbriviationName === ""){
                        setErrorMessageForm("Invalid course abbriviation name: " + FormValueTargetAudience.abbriviationName);
                        FormValidTargetAudience = false;
                    }
                    else if (FormValueTargetAudience.hide === null){
                        setErrorMessageForm("Invalid course abbriviation name: " + FormValueTargetAudience.abbriviationName);
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
                                campus: {
                                    campus_name: FormValueTargetAudience.campus_name,
                                    city: FormValueTargetAudience.city,
                                    country: FormValueTargetAudience.country,
                                    postNumber: FormValueTargetAudience.postNumber,
                                    streetName: FormValueTargetAudience.streetName,
                                    streetNumber: FormValueTargetAudience.streetNumber
                                },
                                course: {
                                    course_name: FormValueTargetAudience.course_name,
                                    abbriviationName: FormValueTargetAudience.abbriviationName
                                },
                                hide: FormValueTargetAudience.hide,
                            }
                        });
                        console.log(response)
                        navigate("/maintenance", { replace: true });
                        setTargetAudienceIndex(-1);
                        setTargetAudienceCreate(false);
                        setFormValueTargetAudience({
                            campus: [],
                            course: [],
                            hide: null,
                            }
                        );
                        await updateTargetAudiences();
                    } catch(error) {
                        console.log(error)
                    }
                }
            }
            const submitTargetAudienceDelete = async(e) => {
                console.log("TA: " + TargetAudienceIndex);
                console.log(TargetAudiences[TargetAudienceIndex]);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/delete/targetaudience",
                        data: {
                            targetAudience_id: TargetAudiences[TargetAudienceIndex].targetAudience_id
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setTargetAudienceIndex(-1);
                    setFormValueTargetAudience({
                        campus_name: "",
                        city: "",
                        country: "",
                        postNumber:-1,
                        streetName: "",
                        streetNumber:-1,
                        course_name: "",
                        abbriviationName: "",
                        hide: null
                    }
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
                                        {TargetAudienceIndex===index? <div className={"ListItemSelected"}>{ta.campus.campus_name} - {ta.course.abbriviationName}</div>:<div>{ta.campus.campus_name} - {ta.course.abbriviationName}</div>}
                                    </div>
                                    <div>
                                        {ta.campus.city} {ta.campus.postNumber}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={"leftUnderSidebalk"}>
                            <button className={"buttonMaintenance"} onClick={() => setTargetAudienceCreate(true)}>Create</button>
                        </div>

                    </div>
                    <div className={"borderinwindow"}/>
                    <div className={"windowrightcrud"}>
                        <div  className={"windowrightcrudForm"}>
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
                console.log(event.target.name + ": " + event.target.value);
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
                                    <label htmlFor="keyword_name" className={"InfoAttribute"}>Keyword name</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Keywords[KeywordIndex].keyword_name? Keywords[KeywordIndex].keyword_name:""}
                                        <input type="text" name="keyword_name" placeholder={"Keyword name"}
                                               value={FormValueKeyword.keyword_name}
                                               onChange={handleKeywordChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="hide" className={"InfoAttribute"}>Hide</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Keywords[KeywordIndex].hide? "True":"False"}
                                        <select name="hide" onChange={handleKeywordChange}>
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
            function createKeyword() {
                return(
                    <div>
                        <form className={"FormInfo"}>
                            <div className={"FormInfoTitle"}>
                                New Keyword
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="keyword_name" className={"InfoAttribute"}>Keyword name</label>
                                    <input type="text" name="keyword_name" placeholder={"Keyword name"}
                                           value={FormValueKeyword.keyword_name}
                                           onChange={handleKeywordChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="hide" className={"InfoAttribute"}>Hide</label>
                                    <select name="hide" onChange={handleKeywordChange}>
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

            const submitKeywordUpdate = async(e) => {
                console.log(Keywords[KeywordIndex]);
                console.log(FormValueKeyword);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/update/keyword/" + Keywords[KeywordIndex].keyword_id,
                        data: {
                            keyword_name: FormValueKeyword.keyword_name,
                            hide: FormValueKeyword.hide,
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setFormValueKeyword({
                        keyword_name: "",
                        hide: null,
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
                    if (FormValueKeyword.hide === null){
                        setErrorMessageForm("Invalid hide" + FormValueKeyword.hide);
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
                                hide: FormValueKeyword.hide,
                            }
                        });
                        console.log(response)
                        navigate("/maintenance", { replace: true });
                        setKeywordIndex(-1);
                        setKeywordCreate(false);
                        setFormValueKeyword({
                            keyword_name: "",
                            hide: null,
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
                        hide: null,
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
                                </div>
                            ))}
                        </div>
                        <div className={"leftUnderSidebalk"}>
                            <button className={"buttonMaintenance"} onClick={() => setKeywordCreate(true)}>Create</button>
                        </div>

                    </div>
                    <div className={"borderinwindow"}/>
                    <div className={"windowrightcrud"}>
                        <div className={"windowrightcrudForm"}>
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
        function showTopics() {
            const handleTopicChange = (event) => {
                setFormValueTopic({
                    ...FormValueTopic,
                    [event.target.name]: event.target.value
                });
            }
            const handleTopicChangeArray = (event) => {
                setFormValueTopic({
                    ...FormValueTopic,
                    [event.target.name]: Array.from(event.target.selectedOptions, item => item.value)
                });
                // console.log(Array.from(event.target.selectedOptions, item => item.value));
            }
            function getObjectOrNull(a) {
                if (a.includes('null')){
                    // console.log("a: " + a)
                    return null;
                }
                return a;
            }

            function showTopicInfo() {
                function getProvider(provider) {
                    return <div>{Providers.map((prov) =>(
                        prov.id===provider? prov.name:""
                    ))}
                    </div>
                }
                function getStudent(student) {
                    return <div>{Students.map((a) =>(
                        a.id===student? a.firstName:<div/>
                    ))}
                    </div>
                }
                function getReleaseDate(date) {
                    if (date !== null && date !== "")
                        return date.slice(0,10)
                    else
                        return "No date"
                }
                return(
                    <div>
                        {TopicIndex===-1? <div/>:
                            <form className={"FormInfo"}>
                                <div className={"FormInfoTitle"}>
                                    Topic
                                </div>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <div className={"comment"}>Initial Value</div>
                                    <div className={"comment"}>New Value</div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="topicName" className={"InfoAttribute"}>Topic name</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Topics[TopicIndex].topicName? Topics[TopicIndex].topicName:<div/>}
                                        <input type="text" name="topicName" placeholder={"Topic name"}
                                               value={FormValueTopic.topicName}
                                               onChange={handleTopicChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="description_topic" className={"InfoAttribute"}>Topic description</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Topics[TopicIndex].description_topic? Topics[TopicIndex].description_topic:<div/>}
                                        <input type="text" name="description_topic" placeholder={"Topic description"}
                                               value={FormValueTopic.description_topic}
                                               onChange={handleTopicChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="promotor" className={"InfoAttribute"}>Topic promotor</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Topics[TopicIndex].promotor && Topics[TopicIndex].promotor!==null && Topics[TopicIndex].promotor!==-1? Topics[TopicIndex].promotor.firstName + " " +Topics[TopicIndex].promotor.lastName:"No promotor"}
                                        <select name="promotor" onChange={handleTopicChange} >
                                            <option value={"null"}>--None--</option>
                                            {Promotors? Promotors.map((p) => (
                                                <option value={p.id}>{p.firstName} {p.lastName}</option>
                                            )):"No promotor"}
                                        </select>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="provider" className={"InfoAttribute"}>Topic provider</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Topics[TopicIndex].provider? getProvider(Topics[TopicIndex].provider):<div/>}
                                        <select name="provider" onChange={handleTopicChange} >
                                            <option value={"null"}>--None--</option>
                                            {Providers.map((p) => (
                                                <option value={p.id}>{p.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="release_date" className={"InfoAttribute"}>Topic release date</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Topics[TopicIndex].release_date!==""? getReleaseDate(Topics[TopicIndex].release_date):<div/>}
                                        <input type="date" name="release_date" placeholder={"Topic release date"}
                                               value={FormValueTopic.release_date}
                                               onChange={handleTopicChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="aantal_studenten" className={"InfoAttribute"}>Topic number of students (1 or 2)</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Topics[TopicIndex].aantal_studenten? Topics[TopicIndex].aantal_studenten:<div/>}
                                        <input type="range" name="aantal_studenten" min={1} max={2}
                                               value={FormValueTopic.aantal_studenten}
                                               onChange={handleTopicChange}
                                        />
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="boostedStudent" className={"InfoAttribute"}>Boosted Student</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Topics[TopicIndex].boostedStudent.length!==0? Topics[TopicIndex].boostedStudent:<div>No boosted student(s)</div>}
                                        <select name="boostedStudent" onChange={handleTopicChange}>
                                            <option value={"null"}>--None--</option>
                                            {Students.map((student) => (
                                                <option value={student.id}>{student.firstName} {student.lastName}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="student_list" className={"InfoAttribute"}>Assigned Student(s)</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Topics[TopicIndex].student_list.length!==0?
                                            <div>
                                            {Topics[TopicIndex].student_list.map((s) => (
                                                <div key={s.id}>{s.firstName} {s.lastName}
                                                </div>))}
                                            </div>:<div>No assigned students</div>}
                                        <select name="student_list" onChange={handleTopicChangeArray} multiple>
                                            <option value={"null"}>--None--</option>
                                            {Students.map((s) => (
                                                <option value={s.id}>{s.firstName} {s.lastName}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="keyword_list" className={"InfoAttribute"}>Keywords</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Topics[TopicIndex].keyword_list.length!==0?
                                            <div>
                                                {Topics[TopicIndex].keyword_list.map((s) => (
                                                    <div key={s.keyword_id}>{s.keyword_name}
                                                    </div>))}
                                            </div>:<div>No keywords</div>}
                                        <select name="keyword_list" onChange={handleTopicChangeArray} multiple={"multiple"}>
                                            <option value={"null"}>--None--</option>
                                            {Keywords.map((k) => (
                                                <option value={k.keyword_id}>{k.keyword_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="targetAudiences" className={"InfoAttribute"}>Target Audiences</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Topics[TopicIndex].targetAudiences.length!==0?
                                            <div>
                                                {Topics[TopicIndex].targetAudiences.map((ta) => (
                                                    <div key={ta.targetAudience_id}>{ta.campus.campus_name} {ta.course.abbriviationName}
                                                    </div>))}
                                            </div>:<div>No target audiences</div>}
                                        <select name="targetAudiences" onChange={handleTopicChangeArray} multiple>
                                            <option value={"null"}>--None--</option>
                                            {TargetAudiences.map((ta) => (
                                                <option key={ta.targetAudience_id}
                                                        value={ta.targetAudience_id}>
                                                    {ta.campus.campus_name} {ta.course.abbriviationName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="tags" className={"InfoAttribute"}>Students with topic as first choice</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Topics[TopicIndex].tags.length!==0?
                                            <div>
                                                {Topics[TopicIndex].tags.map((a) => (
                                                    <div key={a.id}>{getStudent(a.student)}
                                                    </div>))}
                                            </div>:<div>No students with topic as first choice</div>}
                                        <select name="tags" onChange={handleTopicChangeArray} multiple >
                                            <option value={"null"}>--None--</option>
                                            {Students.map((s) => (
                                                <option key={s.id}
                                                        value={s.id}>
                                                    {s.firstName} {s.lastName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="approved_topic" className={"InfoAttribute"}>Approved</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Topics[TopicIndex].approved_topic? "True":"False"}
                                        <select name="approved_topic" onChange={handleTopicChange}>
                                            <option value={"null"}>Null</option>
                                            <option value={"false"}>False</option>
                                            <option value={"true"}>True</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={"InfoSection"}>
                                    <label htmlFor="hide_topic" className={"InfoAttribute"}>Hide</label>
                                    <div className={"InfoAttributeValueAndInput"}>
                                        {Topics[TopicIndex].hide? "True":"False"}
                                        <select name="hide_topic" onChange={handleTopicChange}>
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
            function createTopic() {
                return(
                    <div>
                        <form className={"FormInfo"}>
                            <div className={"FormInfoTitle"}>
                                New Topic
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="topicName" className={"InfoAttribute"}>Topic name</label>
                                    <input type="text" name="topicName" placeholder={"Topic name"}
                                           value={FormValueTopic.topicName}
                                           onChange={handleTopicChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="description_topic" className={"InfoAttribute"}>Topic description</label>
                                    <input type="text" name="description_topic" placeholder={"Topic description"}
                                           value={FormValueTopic.description_topic}
                                           onChange={handleTopicChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="promotor" className={"InfoAttribute"}>Topic promotor</label>
                                    <select name="promotor" onChange={handleTopicChange} >
                                        <option value={"null"}>--None--</option>
                                        {Promotors.map((p) => (
                                            <option value={p.id}>{p.firstName} {p.lastName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="provider" className={"InfoAttribute"}>Topic provider</label>
                                    <select name="provider" onChange={handleTopicChange} >
                                        <option value={"null"}>--None--</option>
                                        {Providers.map((p) => (
                                            <option value={p.id}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="release_date" className={"InfoAttribute"}>Topic release date</label>
                                    <input type="date" name="release_date" placeholder={"Topic release date"}
                                           value={FormValueTopic.release_date}
                                           onChange={handleTopicChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="aantal_studenten" className={"InfoAttribute"}>Topic number of students (1 or 2)</label>
                                    <input type="range" name="aantal_studenten" min={1} max={2}
                                           value={FormValueTopic.aantal_studenten}
                                           onChange={handleTopicChange}
                                    />
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="boostedStudent" className={"InfoAttribute"}>Boosted Student</label>
                                    <select name="boostedStudent" onChange={handleTopicChange}>
                                        <option value={"null"}>--None--</option>
                                        {Students.map((student) => (
                                            <option value={student.id}>{student.firstName} {student.lastName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="student_list" className={"InfoAttribute"}>Assigned Student(s)</label>
                                    <select name="student_list" onChange={handleTopicChangeArray} multiple>
                                        <option value={"null"}>--None--</option>
                                        {Students.map((s) => (
                                            <option value={s.id}>{s.firstName} {s.lastName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="keyword_list" className={"InfoAttribute"}>Keywords</label>
                                    <select name="keyword_list" onChange={handleTopicChangeArray} multiple={"multiple"}>
                                        <option value={"null"}>--None--</option>
                                        {Keywords.map((k) => (
                                            <option value={k.keyword_id}>{k.keyword_name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="targetAudiences" className={"InfoAttribute"}>Target Audiences</label>
                                    <select name="targetAudiences" onChange={handleTopicChangeArray} multiple>
                                        <option value={"null"}>--None--</option>
                                        {TargetAudiences.map((ta) => (
                                            <option key={ta.targetAudience_id}
                                                    value={ta.targetAudience_id}>
                                                {ta.campus.campus_name} {ta.course.course_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="tags" className={"InfoAttribute"}>Students with topic as first choice</label>
                                    <select name="tags" onChange={handleTopicChangeArray} multiple >
                                        <option value={"null"}>--None--</option>
                                        {Students.map((s) => (
                                            <option key={s.id}
                                                    value={s.id}>
                                                {s.firstName} {s.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="approved_topic" className={"InfoAttribute"}>Approve</label>
                                    <select name="approved_topic" onChange={handleTopicChange}>
                                        <option value={"null"}>Null</option>
                                        <option value={"false"}>False</option>
                                        <option value={"true"}>True</option>
                                    </select>
                                </div>
                            </div>
                            <div className={"InfoSection"}>
                                <div className={"InfoAttributeValueAndInput"}>
                                    <label htmlFor="hide_topic" className={"InfoAttribute"}>Hide</label>
                                    <select name="hide_topic" onChange={handleTopicChange}>
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

            const submitTopicUpdate = async(e) => {
                console.log(Topics[TopicIndex]);
                console.log(FormValueTopic);
                let keywords = getObjectOrNull(FormValueTopic.keyword_list);
                let tas = getObjectOrNull(FormValueTopic.targetAudiences);
                let students = getObjectOrNull(FormValueTopic.student_list);
                let tags = getObjectOrNull(FormValueTopic.tags);

                setErrorMessageForm("");
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/update/topic/" + Topics[TopicIndex].topic_id,
                        data: {
                            topicName: FormValueTopic.topicName,
                            aantal_studenten: FormValueTopic.aantal_studenten,
                            approved_topic: FormValueTopic.approved_topic,
                            boostedStudent: FormValueTopic.boostedStudent,
                            description_topic: FormValueTopic.description_topic,
                            hide_topic: FormValueTopic.hide_topic,
                            keyword_list: keywords,
                            promotor: FormValueTopic.promotor,
                            provider: FormValueTopic.provider,
                            release_date: FormValueTopic.release_date,
                            student_list: students,
                            tags: tags,
                            targetAudiences: tas
                        }
                    });
                    console.log(response)
                    navigate("/maintenance", { replace: true });
                    setFormValueTopic({
                        aantal_studenten: 2,
                        approved_topic: null,
                        boostedStudent: -1,
                        description_topic: "",
                        hide_topic: null,
                        keyword_list: [],
                        promotor: -1,
                        provider: -1,
                        release_date: "",
                        student_list: [],
                        tags: [],
                        targetAudiences: [],
                        topicName: ""
                        }
                    );
                    await updateTopics();
                } catch(error) {
                    console.log(error)
                }
            }
            const submitTopicCreate = async(e) => {
                let FormValidTopic = true;
                function checkFormValueTopic() {
                    if (FormValueTopic.hide_topic === null){
                        setErrorMessageForm("Invalid hide");
                        FormValidTopic = false;
                    }
                    if (FormValueTopic.approved_topic === null){
                        setErrorMessageForm("Invalid approved");
                        FormValidTopic = false;
                    }
                    if (FormValueTopic.targetAudiences.length===0){
                        setErrorMessageForm("Invalid target audiences");
                        FormValidTopic = false;
                    }
                    if (FormValueTopic.release_date===""){
                        setErrorMessageForm("Invalid release date");
                        FormValidTopic = false;
                    }
                    if (FormValueTopic.provider === -1){
                        setErrorMessageForm("Invalid provider");
                        FormValidTopic = false;
                    }
                    if (FormValueTopic.description_topic === ""){
                        setErrorMessageForm("Invalid description");
                        FormValidTopic = false;
                    }
                    if (FormValueTopic.topicName === ""){
                        setErrorMessageForm("Invalid name");
                        FormValidTopic = false;
                    }
                    console.log("FormValid: " + FormValidTopic);
                }
                checkFormValueTopic();
                if (FormValidTopic){
                    let keywords = getObjectOrNull(FormValueTopic.keyword_list);
                    let tas = getObjectOrNull(FormValueTopic.targetAudiences);
                    let students = getObjectOrNull(FormValueTopic.student_list);
                    let tags = getObjectOrNull(FormValueTopic.tags);
                    setErrorMessageForm("");
                    // console.log(FormValueTopic);
                    // console.log("keywords " + keywords);
                    // console.log("tas " + tas);
                    // console.log("students " + students);
                    // console.log("tags " + tags);

                    try {
                        const response = await axiosPrivate({
                            method: "post",
                            url: "http://localhost:8080/admin/create/topic/",
                            data: {
                                topicName: FormValueTopic.topicName,
                                aantal_studenten: FormValueTopic.aantal_studenten,
                                approved_topic: FormValueTopic.approved_topic,
                                boostedStudent: FormValueTopic.boostedStudent,
                                description_topic: FormValueTopic.description_topic,
                                hide_topic: FormValueTopic.hide_topic,
                                keyword_list: keywords,
                                promotor: FormValueTopic.promotor,
                                provider: FormValueTopic.provider,
                                release_date: FormValueTopic.release_date,
                                student_list: students,
                                tags: tags,
                                targetAudiences: tas
                            }
                        });
                        // console.log(response)
                        navigate("/maintenance", { replace: true });
                        setTopicIndex(-1);
                        setTopicCreate(false);
                        setFormValueTopic({
                            aantal_studenten: 2,
                            approved_topic: null,
                            boostedStudent: -1,
                            description_topic: "",
                            hide_topic: null,
                            keyword_list: [],
                            promotor: -1,
                            provider: -1,
                            release_date: "",
                            student_list: [],
                            tags: [],
                            targetAudiences: [],
                            topicName: ""
                            }
                        );
                        await updateTopics();
                    } catch(error) {
                        console.log(error)
                    }
                }
            }
            const submitTopicDelete = async(e) => {
                // console.log(Topics[TopicIndex]);
                try {
                    const response = await axiosPrivate({
                        method: "post",
                        url: "http://localhost:8080/admin/delete/topic",
                        data: {
                            topic_id: Topics[TopicIndex].topic_id
                        }
                    });
                    // console.log(response)
                    navigate("/maintenance", { replace: true });
                    setTopicIndex(-1);
                    setFormValueTopic({
                        aantal_studenten: 2,
                        approved_topic: null,
                        boostedStudent: null,
                        description_topic: "",
                        hide_topic: null,
                        keyword_list: [],
                        promotor: null,
                        provider: -1,
                        release_date: "",
                        student_list: [],
                        tags: [],
                        targetAudiences: [],
                        topicName: ""
                        }
                    );
                    await updateTopics();
                } catch(error) {
                    console.log(error)
                }
            }
            async function updateTopics() {
                let isMounted = true;
                const controller = new AbortController();
                try {
                    const response = await axiosPrivate({
                        method: "get",
                        url: "/topic/all",
                        signal: controller.signal
                    });
                    console.log(response.data);
                    const myData = [].concat(response.data).sort((a, b) => a.topic_id > b.topic_id ? 1 : -1);
                    console.log(response.data);
                    isMounted && setTopics(myData);

                } catch (err) {
                    console.error(err);
                    navigate('/login', {state: {from: location}, replace: true});
                    console.log(errMsg);
                }
            }
            function cancelCreateTopic() {
                setTopicCreate(false);
                setErrorMessageForm("");
            }

            function getProviderVanTopic(provider) {
                return (
                    <div>
                        {Providers.map((prov) => (
                            <div key={prov.id}>
                                {prov.id === provider? <div>{prov.name} </div>:<div/>}
                            </div>
                        ))}
                    </div>
                )
            }

            return (
                <div className={"windowMainenance"}>
                    <div className={"windowleftlist"}>
                        <div className={"listitemsleft"}>
                            {Topics.map((t,index) =>(
                                <div key={index} className={"ListItemTopic"} onClick={() => setTopicIndex(index)}>
                                    <div className={"ListItemTitle"}>
                                        {TopicIndex===index? <div className={"ListItemSelected "}>{t.topicName}</div>:<div>{t.topicName}</div>}
                                    </div>
                                    <div>
                                        {getProviderVanTopic(t.provider)}
                                    </div>
                                    <div>
                                        {t.promotor?<div>{t.promotor.firstName} {t.promotor.lastName}</div>:""}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={"leftUnderSidebalk"}>
                            <button className={"buttonMaintenance"} onClick={() => setTopicCreate(true)}>Create</button>
                        </div>

                    </div>
                    <div className={"borderinwindow"}/>
                    <div className={"windowrightcrud"}>
                        <div className={"windowrightcrudForm"}>
                            {TopicCreate? createTopic(): showTopicInfo()}
                        </div>
                        <div className={"InfoButtonsBottom"}>
                            {TopicCreate?
                                <div>
                                    <a className={"ErrorMessageForm"}>{ErrorMessageForm}</a>
                                    <button className={"buttonMaintenance"} type="submit" onClick={submitTopicCreate}>Save</button>
                                    <button className={"buttonMaintenance"} onClick={() => cancelCreateTopic()}>Cancel</button>
                                </div>:
                                <div>
                                    {TopicIndex===-1? <div/>:
                                        <div>
                                            <button className={"buttonMaintenance"} type="submit" onClick={submitTopicDelete}>Delete</button>
                                            <button className={"buttonMaintenance"} type="submit" onClick={submitTopicUpdate}>Update</button>
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
                    <button onClick={() => setShow("Topics")}>Topics</button>
                </div>
                {Show===""?                 showStandaard()         :   <div/>  }
                {Show==="Students"?         showStudents()          :   <div/>  }
                {Show==="Masters"?          showMasters()           :   <div/>  }
                {Show==="Promotors"?        showPromotors()         :   <div/>  }
                {Show==="Providers"?        showProviders()         :   <div/>  }
                {Show==="Phases"?           showPhases()            :   <div/>  }
                {Show==="TargetAudiences"?  showTargetAudiences()   :   <div/>  }
                {Show==="Keywords"?         showKeywords()          :   <div/>  }
                {Show==="Topics"?           showTopics()            :   <div/>  }
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