import React from "react";

export default function Home_Standaard(){
    return(
        <div className={"standaard"}>
            <div className={"titel"}>
                <h1 className={"topicTitle titel"}>Home</h1>
                <div>
                    This tool is for students/companies/researchgroups/promotors/ThesisCoordinators.
                    <br/>
                    <br/>
                    <div>
                        <b>Students</b> can (depending on the current phase):
                        <ul>
                            <li>Submit Possible Thesis topics</li>
                            <li>Like Thesis topics</li>
                            <li>Choose Top3 Thesis topics from preferred topics</li>
                            <li>View Top3</li>
                        </ul>
                    </div>
                    <div>
                        <b>Companies</b> or <b>researchgroups</b> can (depending on the current phase):
                        <ul>
                            <li>Submit Possible Thesis topics</li>
                            <li>View added Thesis topics</li>
                        </ul>
                    </div>
                    <div>
                        <b>Promotors</b> can (depending on the current phase):
                        <ul>
                            <li>Submit Possible Thesis topics</li>
                            <li>View added Thesis topics</li>
                            <li>Boost Students for each Thesis topic</li>
                        </ul>
                    </div>
                    <div>
                        <b>ThesisCoordinators</b> can (depending on the current phase):
                        <ul>
                            <li>Submit Possible Thesis topics</li>
                            <li>View added Thesis topics</li>
                            <li>Approve Promotors/Companies/ResearchGroups</li>
                            <li>Assign Promotors</li>
                            <li>Assign Students to their Thesis topic</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}