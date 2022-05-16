import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";

export default function PersonalInfo_Student(props) {
    const studentid = props.studentid;
    const [Student, setStudent] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getStudent = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/student/" + studentid,
                    signal: controller.signal
                });
                //console.log("Student: " + response.data);
                isMounted && setStudent(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log("Fout bij getStudent" + errMsg);
            }
        }
        getStudent().then();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return(
        <div>
            {Student.firstName}
        </div>
    )
}
