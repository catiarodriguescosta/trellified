// Navbar.js

import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Logo from "./Logo"

const NavbarDiv = styled.nav`
  z-index: 2;
  background-color: white;
  position: ${ props => props.sticky ? "fixed" : "relative" };
  width: ${ props => props.sticky ? "100%" : "unset" };
  top: ${ props => props.sticky ? "0" : "unset" };
  transition: background 1s ease-in-out, color 0.25s;
  color: ${ props => props.sticky ? "var(--secondary-colour)" : "var(--tertiary-colour)" };

  @media (max-width: 960px) {
    position: sticky;
    height: 90px;
    top: ${ props => props.sticky ? "0" : "30px" };
    left: 0;
    right: 0;
    left: 0;
  }
`

const Navigation = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  padding: ${ props => props.sticky ? "5px 0" : "25px 0" };

  @media (max-width: 960px) {
    padding-top: 5px;
  }

`


const Navbar = () => {
  const [navbarSticky, setNavbarSticky] = useState(false);

  useEffect(() => {
    const changeNavbar = () => {
      let scrolled = document.documentElement.scrollTop;
      if (scrolled >= 1) {
        setNavbarSticky(true);
      } 
      else {
        setNavbarSticky(false);
      }
    }
    document.addEventListener('scroll', changeNavbar);

    return () => {
      document.removeEventListener('scroll', changeNavbar);
    }
  }, []);

  return (
    <NavbarDiv sticky={navbarSticky}>
      <div className="o-container">
        <Navigation >
          <Logo />
        </Navigation>
      </div>
    </NavbarDiv>
  )
}

export default Navbar