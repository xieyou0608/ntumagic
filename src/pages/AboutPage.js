import React from "react";
import { styled } from "@mui/material";

const AboutLayout = styled("section")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "3rem 0rem",
  minHeight: "95vh",
});

const About = styled("div")({
  width: "20rem",
  height: "20rem",
  border: "solid 0.1em black",
  borderRadius: "1rem",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  padding: "1rem",

  "& a": {
    fontSize: "1.5rem",
    color: "rgb(82, 82, 161)",
  },
});

const AboutPage = () => {
  return (
    <AboutLayout>
      <About>
        <h2>台大魔術社</h2>
        <a href="https://www.facebook.com/NTUMAGIC/" target="_blank">
          <i className="fa-brands fa-facebook"></i> Facebook
        </a>

        <a href="https://www.instagram.com/ntu_magic/" target="_blank">
          <i className="fa-brands fa-instagram"></i> Instagram
        </a>
      </About>
    </AboutLayout>
  );
};

export default AboutPage;
