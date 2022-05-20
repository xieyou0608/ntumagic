import React, { useEffect, useState } from "react";
import UserInfo from "../components/profile/UserInfo";
import SeatsTable from "../components/profile/SeatsTable";
import FriendsTable from "../components/profile/FriendsTable";
import { Box, Alert, Grid } from "@mui/material";

const ProfilePage = ({ currentUser, setCurrentUser }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        {!currentUser && <Alert severity="warning">請先登入帳號</Alert>}
        {currentUser && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              borderStyle: "solid",
              borderRadius: "1rem",
              padding: "2rem",
              margin: "2rem",
            }}
          >
            <UserInfo
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
            <SeatsTable currentUser={currentUser} />
            <FriendsTable
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
