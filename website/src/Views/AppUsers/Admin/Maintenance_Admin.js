import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";
import "../../../Styles/Maintenance.css"

export default function Maintenance_Admin(props){
    const adminid = props.persoonid;
    const [Phases, setPhases] = useState([]);
    const [Promotors, setPromotors] = useState([]);
    const [Topics, setTopics] = useState([]);
    const [Students, setStudents] = useState([]);
    const [Masters, setMasters] = useState([]);
    const [Providers, setProviders] = useState([]);
    const [TargetAudiences, setTargetAudiences] = useState([]);
    const [Keywords, setKeywords] = useState([]);

    //const [Show, setShow] = useState("");           // "Phases,Promotors,Students,Masters,Providers,TargetAudiences,Keywords"


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
        getPromotors().then(r => null);
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

        return(
            <div>

            </div>
        )
    }

    function showMaintenanceBar() {
        return(
            <div>
                <div className={"Maintenancebar"}>
                    {/*<button onClick={setShow("Students")}>Students</button>*/}
                    {/*<button onClick={setShow("Masters")}>Coordinators</button>*/}
                    {/*<button onClick={setShow("Promotors")}>Promotors</button>*/}
                    {/*<button onClick={setShow("Providers")}>Companies/Researchgroups</button>*/}
                    {/*<button onClick={setShow("Phases")}>Phases</button>*/}
                    {/*<button onClick={setShow("TargetAudiences")}>TargetAudiences</button>*/}
                    {/*<button onClick={setShow("Keywords")}>Keywords</button>*/}
                    <button >Students</button>
                    <button >Coordinators</button>
                    <button >Promotors</button>
                    <button >Companies/Researchgroups</button>
                    <button onClick={() => show("Phases")}>Phases</button>
                    <button >TargetAudiences</button>
                    <button >Keywords</button>
                </div>
                <div className={"windowMainenance"}>
                    <div className={"windowleftlist"}>
                        Oplijsting
                    </div>
                    <div className={"windowrightcrud"}>
                        CRUD opties
                    </div>
                </div>
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