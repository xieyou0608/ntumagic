import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadProfile } from "../store/user-actions";

import UserInfo from "../components/Profile/UserInfo";
import SeatsTable from "../components/Profile/SeatsTable";
import { Box, CircularProgress, styled } from "@mui/material";

const Layout = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3vh;
`;
const ProfileBox = styled("div")`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: #540b0e solid 0.5vmin;
  border-radius: 3vmin;
  row-gap: 3vh;
  padding: 7vmin;

  min-width: 55vw;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 5vw;
    max-width: 95vw;
  }
`;

const ProfilePage = () => {
  const { currentUser, profileApi } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProfile());
  }, [dispatch]);

  return (
    <Layout>
      <ProfileBox>
        {profileApi.loading && (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress size={100} sx={{ my: 10 }} />
          </Box>
        )}
        {currentUser && (
          <>
            <UserInfo />
            <SeatsTable />
          </>
        )}
      </ProfileBox>
    </Layout>
  );
};

export default ProfilePage;
