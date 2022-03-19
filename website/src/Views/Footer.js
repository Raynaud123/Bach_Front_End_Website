import React from "react";
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
export default Footer;
