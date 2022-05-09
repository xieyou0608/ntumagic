import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import UserInfo from "../components/profile/UserInfo";
import SeatsTable from "../components/profile/SeatsTable";
import FriendsTable from "../components/profile/FriendsTable";

const ProfilePage = ({ currentUser, setCurrentUser }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {!currentUser && <Alert severity="warning">請先登入帳號</Alert>}
        {currentUser && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              borderStyle: "solid",
              borderRadius: "1rem",
              padding: "2rem",
            }}
          >
            <UserInfo currentUser={currentUser} />
            <SeatsTable currentUser={currentUser} />
            <FriendsTable
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ProfilePage;
