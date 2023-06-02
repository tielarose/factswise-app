import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  // const [isLoggedOut, setIsLoggedOut] = useState(true);
  // const [isStudent, setIsStudent] = useState(false);
  // const [isEducator, setIsEducator] = useState(false);

  return (
    // { isLoggedOut && <NavbarLoggedOut />}
    // { isStudent && <NavbarStudent /> }
    // { isEducator && <NavbarEducator/> }
    <div className="Navbar">
      <a href="/">MathFacts Home</a>
      <a href="/">Log In</a>
    </div>
  );
}
