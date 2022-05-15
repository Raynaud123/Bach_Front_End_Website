import React from "react";
import "../../../Styles/Home.css";

export default function Home_Admin(props) {
    const phase = props.phase;
    const firstRound = phase.firstRound;

    return(
        <div className={"standaard"}>
            <div className={"titel"}>
                <h1 className={"topicTitle titel"}>Home</h1>
                <h4 className={"ronde titel"}> { firstRound? <b>First Round</b> : <b>Second Round</b>}
                    &emsp;&emsp; {phase.phase_name} ({phase.begin_deadline} - {phase.end_deadline})</h4>
            </div>
            <div>
                As admin you can have full control over everything. Take a look at "Maintenance".
            </div>
        </div>
    )
}
