import React from "react";
import { styled } from "@mui/material";

const Layout = styled("div")`
  display: flex;
  justify-content: center;
`;

const StyledBox = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  background-color: white;
  border: #540b0e solid 0.5vmin;
  border-radius: 3vmin;
  padding: 5vh;
  width: 20rem;
  height: 20rem;

  a {
    font-size: 1.5rem;
    color: rgb(82, 82, 161);
  }
`;

const AboutPage = () => {
  return (
    <Layout>
      <StyledBox>
        <h2>台大魔術社</h2>
        <a href="https://www.facebook.com/NTUMAGIC/" target="_blank">
          <i className="fa-brands fa-facebook"></i> Facebook
        </a>

        <a href="https://www.instagram.com/ntu_magic/" target="_blank">
          <i className="fa-brands fa-instagram"></i> Instagram
        </a>
      </StyledBox>
    </Layout>
  );
};

export default AboutPage;
