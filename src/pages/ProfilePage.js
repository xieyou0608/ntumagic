import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadProfile } from "../store/user-actions";

import UserInfo from "../components/Profile/UserInfo";
import SeatsTable from "../components/Profile/SeatsTable";
import FriendsTable from "../components/Profile/FriendsTable";
import { Alert, styled } from "@mui/material";

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
      {profileApi.loading && <Alert>請稍候...</Alert>}
      {currentUser && (
        <ProfileBox>
          <UserInfo />
          <SeatsTable />
          <FriendsTable />
        </ProfileBox>
      )}
    </Layout>
  );
};

export default ProfilePage;
