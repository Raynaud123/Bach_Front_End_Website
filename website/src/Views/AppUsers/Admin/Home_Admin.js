import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";

export default function Home_Admin(props) {
    const phase = props.phase;
    const firstRound = phase.firstRound;

    return(
        <div className={"showTopics"}>
            <div className={"titel"}>
                <h1 className={"topicTitle titel"}>Home Admin</h1>
                <h4 className={"ronde titel"}> { firstRound? <b>First Round</b> : <b>Second Round</b>}
                    &emsp;&emsp; {phase.phase_name} ({phase.begin_deadline} - {phase.end_deadline})</h4>
            </div>
        </div>
    )
}
