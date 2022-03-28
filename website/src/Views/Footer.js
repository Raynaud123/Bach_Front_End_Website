import React from "react";
import '../Styles/Footer.css';
import KULeuvenLogo from "../assets/KULeuvenLogo.png";
import {faFacebook, faInstagram, faLinkedin, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Footer(){
    return(
        <div className={"footer"}>
            <div className={"footerbalk"}>
                <img className={"logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                <p>&copy; 2022</p>
                <p><a href="https://admin.kuleuven.be/privacy/" className="footertekst">Disclaimer</a></p>
                <p> <a href="https://admin.kuleuven.be/privacy/" className="footertekst">Privacy</a></p>
            </div>
            <div className="social-container">
                <a href="https://www.youtube.com/user/kuleuven/"
                   className="youtube social" target="_blank">
                    <FontAwesomeIcon icon={faYoutube} size="2x" />
                </a>
                <a href="https://www.facebook.com/KULeuven/"
                   className="facebook social" target="_blank">
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a href="https://www.twitter.com/KU_Leuven"
                   className="twitter social" target="_blank">
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a href="https://www.instagram.com/kuleuven"
                   className="instagram social" target="_blank">
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a href="https://www.linkedin.com/school/ku_leuven/"
                   className="linkedin social" target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
            </div>
        </div>
    )
}