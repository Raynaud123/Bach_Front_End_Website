import React, {useEffect, useState} from "react";
import '../Styles/Header.css';
import NormalHeader from "./NormalHeader";
import MobileHeader from "./MobileHeader";


export default function Header(props){

    //states
    //props
    const role = props.roles;
    const isLoggedIn = props.isLoggedIn;

    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 620;

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);

        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);


    return width < breakpoint ? <MobileHeader
        isLoggedIn={isLoggedIn}
        roles={role}
    /> : <NormalHeader
        isLoggedIn={isLoggedIn}
        roles={role}
    />;

}