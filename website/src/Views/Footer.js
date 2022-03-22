import React from "react";
import {FaRegCopyright} from "react-icons/all";
import '../Styles/Footer.css';
import KULeuvenLogo from '../assets/KULeuvenLogo.png'
import {Facebook, Instagram, Twitter} from "react-bootstrap-icons";
export default function Footer(){
    return(
        <div className={"footer"}>
            <img className={"logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
            <FaRegCopyright className={"icon"}/>
            <Facebook className={"icon"}/>
            <Twitter className={"icon"}/>
            <Instagram className={"icon"}/>
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
