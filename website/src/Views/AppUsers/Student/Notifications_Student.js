import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";
import NotificationInfo_Student from "../../Notification/NotificationInfo_Student";

export default function Notifications_Student(props) {
    const studentid = props.persoonid;
    const [Student, setStudent] = useState([]);
    const [NotificationList, setNotificationList] = useState([]);


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
                console.log("Student: " + response.data);
                isMounted && setStudent(response.data);
                console.log("notification_list: " + response.data.notification_list);
                if (response.data !== []) setNotificationList(response.data.notification_list);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(" 1 fout" + errMsg);
            }
        }
        getStudent().then();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    function showNot(notification) {
        let d = new Date();
        var arr = notification.addedDate.split("-");
        var year = arr[0];
        var month = arr[1];
        var day = arr[2];
        console.log("addedDate " + year + " " + month + " " + day);
        console.log("Date " + d.getFullYear() + " " + (d.getMonth()+1) + " " + d.getDate());
        return year<=d.getFullYear() && month<=(d.getMonth()+1) && day<=d.getDate();
    }

    return(
        <div>
            Notifications: {Student.firstName} {Student.lastName}
            <div>
                {NotificationList.map((n) => (
                    <div>
                        {showNot(n)?
                    <NotificationInfo_Student notification={n} student={Student}/>:""}
                    </div>
                ))}
            </div>
        </div>
    )
}
