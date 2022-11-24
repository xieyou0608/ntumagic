import { styled } from "@mui/material";

const StyledFooter = styled("footer")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  fontFamily: "Roboto",
  padding: "1rem",
});

const Footer = () => {
  return <StyledFooter>Copyright © 2022 NTU magic club.</StyledFooter>;
};

export default Footer;
