import React from "react";
import '../Styles/Footer.css';
import KULeuvenLogo from "../assets/KULeuvenLogo.png";
import {faYoutube,faFacebook,faTwitter,faInstagram,faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Footer(){
    return(
        <div className={"footer"}>
            <div className={"footerbalk"}>
                <img className={"logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                <p>&copy; 2022</p>
                <p><a href="https://admin.kuleuven.be/privacy/" target="_blank" className="footertekst">Disclaimer</a></p> {/*href="https://www.kuleuven.be/kuleuven/disclaimer.html"*/}
                <p> <a href="https://admin.kuleuven.be/privacy/" target="_blank" className="footertekst">Privacy</a></p>  {/*href="https://admin.kuleuven.be/privacy/"*/}
            </div>
            <div className="social-container">
                <a href="https://www.youtube.com/user/kuleuven/"
                   className="youtube social">
                    <FontAwesomeIcon icon={faYoutube} size="2x" />
                </a>
                <a href="https://www.facebook.com/KULeuven/"
                   className="facebook social">
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a href="https://www.twitter.com/KU_Leuven" className="twitter social">
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a href="https://www.instagram.com/kuleuven"
                   className="instagram social">
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a href="https://www.linkedin.com/school/ku_leuven/"
                   className="linkedin social">
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
            </div>
        </div>
    )
}