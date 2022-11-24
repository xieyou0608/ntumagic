import { styled } from "@mui/material";

const GuideButton = styled("button")`
  border-radius: 1rem;
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

  color: #234b88;
  border-color: #234b88;

  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  &:hover {
    color: #fff;
    background-color: #234b88;
    border-color: #234b88;
  }
`;

export default GuideButton;