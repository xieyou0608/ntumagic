import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Typography, Button, styled, CircularProgress } from "@mui/material";
import AuthService from "../services/auth.service";

const Layout = styled("div")`
  display: flex;
  justify-content: center;
`;
const StyledBox = styled("div")`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: #540b0e solid 0.5vmin;
  border-radius: 3vmin;
  padding: 5vh;
`;

const VerifyPage = () => {
  const [status, setStatus] = useState("pending");

  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  console.log(email);
  const verifyToken = params.get("verifyToken");
  console.log(verifyToken);
  const verify = async () => {
    try {
      await AuthService.verify(verifyToken);
      setStatus("success");
    } catch (e) {
      setStatus("fail");
    }
  };

  useEffect(() => {
    verify();
  }, []);

  const handleRetry = () => {
    setStatus("pending");
    verify();
  };
  return (
    <Layout>
      {status === "pending" && (
        <StyledBox>
          <CircularProgress size={100} sx={{ m: 1 }} />
          <Typography variant="h5">請稍等...</Typography>
        </StyledBox>
      )}
      {status === "success" && (
        <StyledBox>
          <Typography variant="h5">驗證成功!</Typography>
          <br />
          <p>{email}</p>
          <br />
          <Button component={Link} to="/" variant="contained">
            回首頁
          </Button>
        </StyledBox>
      )}
      {status === "fail" && (
        <StyledBox>
          <Typography variant="h5">驗證失敗!</Typography>
          <br />
          <p>{email}</p>
          <br />
          <Button onClick={handleRetry} variant="contained">
            重試一下
          </Button>
        </StyledBox>
      )}
    </Layout>
  );
};

export default VerifyPage;
