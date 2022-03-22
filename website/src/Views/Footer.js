import React from "react";
import '../Styles/Footer.css';
import {Facebook, Instagram, Twitter} from "react-bootstrap-icons";
export default function Footer(){
    return(
        <div className={"footer"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className="col-md-6 widget">
                            <p>
                                <Facebook />
                                <Twitter />
                                <Instagram />
                            </p>
                    </div>

                    <div className="col-md-6 widget">
                            <p className="text-right">
                                Copyright &copy; 2022
                            </p>
                    </div>
                </div>
            </div>
        </div>
    )
}