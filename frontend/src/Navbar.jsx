import React, { useState } from "react";

export default function Navbar() {
    const [isLoggedOut, setIsLoggedOut] = useState(true);
    const [isStudent, setIsStudent] = useState(false);
    const [isEducator, setIsEducator] = useState(false);

    return (
        { isLoggedOut && <NavbarLoggedOut />}
        { isStudent && <NavbarStudent /> }
        { isEducator && <NavbarEducator/> }
    )
}