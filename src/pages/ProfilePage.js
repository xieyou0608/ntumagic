import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadProfile } from "../store/user-actions";

import UserInfo from "../components/profile/UserInfo";
import SeatsTable from "../components/profile/SeatsTable";
import FriendsTable from "../components/profile/FriendsTable";
import { Box, Alert, Grid } from "@mui/material";

const ProfilePage = () => {
  const { currentUser, profileApi } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProfile());
  }, [dispatch]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        {profileApi.loading && <Alert>請稍候...</Alert>}
        {!currentUser && <Alert severity="warning">請先登入帳號</Alert>}
        {currentUser && (
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                borderStyle: "solid",
                borderRadius: "1rem",
                padding: "1rem",
                margin: "2rem",
              }}
            >
              <UserInfo />
              <SeatsTable />
              <FriendsTable />
            </Box>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
