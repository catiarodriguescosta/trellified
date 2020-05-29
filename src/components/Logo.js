// Logo.js
import React from "react"
import styled from "styled-components"
import Logo from "../images/trellified.png"

const LogoWrap = styled.div`
  margin: auto 0;
  flex: 0 1 140px;

  @media (max-width: 768px) and (orientation: landscape) {
    
    flex: 0 1 150px;
  }
`
const logo = () => {
  return (
    <LogoWrap>
      <a href="/">
        <img src={Logo} alt="logo" />
      </a>
    </LogoWrap>
  )
}

export default logo