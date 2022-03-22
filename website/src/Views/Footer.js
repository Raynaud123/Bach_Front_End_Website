import React from "react";
import { AiOutlineCopyright} from "react-icons/all";
import '../Styles/Footer.css';
import KULeuvenLogo from '../assets/KULeuvenLogo.png'
export default function Footer(){
    return(
        <div className={"footer"}>
            <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
            <AiOutlineCopyright />
        </div>
    )
}

/*import React from "react";
//import {FaBeer, FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube} from 'react-icons/fa';
import {
    FooterBar, HR, BottomBar, MobileSocialList, Twitter, Facebook, Instagram
} from "../Styles/FooterStyles";

const Footer = () => {
    return (
        <FooterBar>
            <HR />
            <BottomBar>
                <MobileSocialList>
                    <Twitter />
                    <Facebook />
                    <Instagram />
                </MobileSocialList>
            </BottomBar>
        </FooterBar>
    );
};
export default Footer;*/
