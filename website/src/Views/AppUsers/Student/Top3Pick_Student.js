import React, {useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";

export default function Top3Pick_Student(props) {
    const studentid = props.studentid;
    const [Preferred] = useState(props.preferred);
    const [FirstChoice, setFirstChoice] = useState(0);
    const [SecondChoice, setSecondChoice] = useState(0);
    const [ThirdChoice, setThirdChoice] = useState(0);
    const [Show, setShow] = useState(true);
    const [Requirement, setRequirement] = useState("");
    let from = "/choice";

    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();


    async function handleSubmit() {
        try {
            const response = await axiosPrivate({
                method: "put",
                url: "http://localhost:8080/student/" + studentid + "/updatetop3/" + FirstChoice +"/" + SecondChoice + "/" +ThirdChoice,
            });
            console.log(response)
            navigate(from, {replace: false});
            setShow(false);
        } catch (error) {
            console.log(error)
        }
    }

    function checkSubmit() {
        if(FirstChoice > 0 && SecondChoice > 0 && ThirdChoice > 0)
            return FirstChoice !== SecondChoice && FirstChoice !== ThirdChoice && SecondChoice !== ThirdChoice;
    }

    function submitTop3() {
        if(checkSubmit()) {
            setRequirement("");
            handleSubmit();
        }
        else {
            setRequirement("3 unique topics required!");
        }
    }

    const onFirstChoiceChange = (e) => {
        setFirstChoice(parseInt(e.target.value));
    };
    const onSecondChoiceChange = (e) => {
        setSecondChoice(parseInt(e.target.value));
    };
    const onThirdChoiceChange = (e) => {
        setThirdChoice(parseInt(e.target.value));
    };

    return(
        <div>
            {Show?
                <div>
                    <form id={"formtop3"}>
                        <div>
                            <label>1st choice:</label>
                            <select id="firstchoice" onChange={(e) => onFirstChoiceChange(e)}>
                                <option>--None--</option>
                                {Preferred.map((topic) => (
                                    <option value={topic.topic_id} key={topic.topic_id} data-key={topic.topic_id}>{topic.topicName}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>2nd choice:</label>
                            <select id="secondchoice" onChange={(e) => onSecondChoiceChange(e)}>
                                <option>--None--</option>
                                {Preferred.map((topic) => (
                                    <option value={topic.topic_id} key={topic.topic_id} data-key={topic.topic_id}>{topic.topicName}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>3rd choice:</label>
                            <select id="thirdchoice" onChange={(e) => onThirdChoiceChange(e)}>
                                <option>--None--</option>
                                {Preferred.map((topic) => (
                                    <option value={topic.topic_id} key={topic.topic_id} data-key={topic.topic_id}>{topic.topicName}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                    <div>
                        <button onClick={submitTop3}> Save Choice </button>
                        &emsp;&emsp;<b>{Requirement}</b>
                    </div>
                </div>:""}
        </div>
    )
}