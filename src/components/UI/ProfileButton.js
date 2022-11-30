import { styled, Button } from "@mui/material";

const EditButton = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.palette.secondary.main};
  }
`;

// mui v5 styled does not support .attrs
EditButton.defaultProps = {
  variant: "contained",
};

const CheckButton = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.palette.gentle.main};
    color: black;
  }
`;

CheckButton.defaultProps = {
  variant: "contained",
};

export { EditButton, CheckButton };
