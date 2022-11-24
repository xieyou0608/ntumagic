import { styled } from "@mui/material";

const SquareButton = styled("button")`
  display: inline-block;
  font-weight: bold;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  color: #fff;
  background-color: ${(props) => (props.color ? props.color : "#e6bb6f")};
  border-color: ${(props) => (props.color ? props.color : "#e6bb6f")};

  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  &:hover {
    box-shadow: 0 0 5px ${(props) => (props.color ? props.color : "#e6bb6f")};
  }
  box-shadow: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;

  margin-top: 2rem;
`;

export default SquareButton;
