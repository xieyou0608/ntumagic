import { styled } from "@mui/material";
import theme from "../../styles/theme";

const StyledButton = styled("button")`
  font-weight: bold;
  line-height: 1.5;
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const gentleYellow = theme.palette.gentle.main;
const goldYellow = theme.palette.gold.main;
const darkBlue = theme.palette.darkBlue.main;

const GentleYellowButton = styled(StyledButton)`
  border-radius: 0.5rem;
  background-color: ${(props) => props.color || gentleYellow};
  border: 1px solid transparent;
  box-shadow: 1px 2px 3px gray;
  &:hover {
    box-shadow: 1px 2px 7px gray;
  }
  &:active {
    box-shadow: 1px 2px 10px gray;
  }
`;

const GoldButton = styled(StyledButton)`
  color: ${goldYellow};
  background-color: transparent;
  border: 1px solid ${goldYellow};
  &:hover {
    color: #fff;
    background-color: ${goldYellow};
  }
`;

const DarkBlueButton = styled(StyledButton)`
  border-radius: 1rem;
  border: 1px solid transparent;
  color: ${darkBlue};
  border-color: ${darkBlue};
  &:hover {
    color: #fff;
    background-color: ${darkBlue};
  }
`;

export { GentleYellowButton, GoldButton, DarkBlueButton };
