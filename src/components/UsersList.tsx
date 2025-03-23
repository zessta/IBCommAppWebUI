import React from "react";
import {
  Box,
  Card,
  Avatar,
  Grid2,
  Typography,
  Divider,
  SxProps,
} from "@mui/material";
import { BLUE, BROWN, GRAY, WHITE } from "../utils/constants";
import Profile from "../assets/Profile.svg";
import EditOutlinedIcon from "../assets/brownTheme/EditOutlinedIcon.svg";

interface User {
  userId: string;
  fullName: string;
  mobileNo: string;
  email: string;
  dateOfBirth: string;
  policeStation: string;
  zone: string;
  location: string;
  rank: string;
  messagesSent?: number;
  groupMessages?: number;
  groupsCreated?: number;
  groupsJoined?: number;
}

interface UserMetrics {
  userId: string;
  messagesSent?: number;
  groupMessages?: number;
  groupsCreated?: number;
  groupsJoined?: number;
}

interface UsersListProps {
  users: User[];
  userMetrics: UserMetrics[];
}

const UsersList: React.FC<UsersListProps> = ({ users, userMetrics }) => {
  const mergedData = users.map((user) => {
    const userMetric = userMetrics.find((u) => u.userId === user.userId) || {};
    return {
      ...user,
      ...userMetric,
    };
  });

  return (
    <Box sx={outerBoxStyles}>
      {mergedData.map((user) => (
        <Card key={user.userId} sx={cardStyles}>
          <Box sx={headerBoxStyles}>
            <Avatar alt="User Avatar" src={Profile} sx={avatarStyles} />
            <Box sx={userInfoBoxStyles}>
              <Grid2 container spacing={3}>
                <Grid2 size={6}>
                  <Typography variant="body2" sx={infoTextStyles}>
                    Name: {user.fullName}
                  </Typography>
                  <Typography variant="body2" sx={infoTextStyles}>
                    Contact no: {user.mobileNo}
                  </Typography>
                  <Typography variant="body2" sx={infoTextStyles}>
                    Email: {user.email}
                  </Typography>
                  <Typography variant="body2" sx={infoTextStyles}>
                    DOB: {new Date(user.dateOfBirth).toLocaleDateString()}
                  </Typography>
                </Grid2>
                <Divider orientation="vertical" flexItem sx={dividerStyles} />
                <Grid2 size={4}>
                  <Typography variant="body2" sx={infoTextStyles}>
                    PS: {user.policeStation}
                  </Typography>
                  <Typography variant="body2" sx={infoTextStyles}>
                    Zone: {user.zone}
                  </Typography>
                  <Typography variant="body2" sx={infoTextStyles}>
                    Location: {user.location}
                  </Typography>
                </Grid2>
              </Grid2>
            </Box>
          </Box>
          <Box p={4}>
            <Grid2 container spacing={3}>
              <Grid2 container size={8} direction={"row"}>
                <Grid2 size={6}>
                  <Typography variant="body2" sx={infoTextStyles}>
                    Role: {user.rank}
                  </Typography>
                  <Typography variant="body2" sx={infoTextStyles}>
                    Message Sent: {user.messagesSent ?? 0}
                  </Typography>
                  <Typography variant="body2" sx={infoTextStyles}>
                    Group Messages: {user.groupMessages ?? 0}
                  </Typography>
                  <Typography variant="body2" sx={infoTextStyles}>
                    Group Created: {user.groupsCreated ?? 0}
                  </Typography>
                </Grid2>
                <Grid2 size={6}>
                  <Typography variant="body2" sx={infoTextStyles}>
                    Group Joined: {user.groupsJoined ?? 0}
                  </Typography>
                  <Typography variant="body2" sx={infoTextStyles}>
                    Responses: {user.groupsJoined ?? 0}
                  </Typography>
                </Grid2>
              </Grid2>
              <Grid2 size={4} sx={editIconBoxStyles}>
                <img
                  src={EditOutlinedIcon}
                  style={editIconStyles}
                  alt="Edit Icon"
                />
              </Grid2>
            </Grid2>
          </Box>
          <Box p={2}>
            <Grid2 container sx={statsContainerStyles}>
              <Grid2 size={4}>
                <Typography
                  color={BLUE.dark}
                  fontWeight={700}
                  fontSize={"25.78px"}
                >
                  {(user.groupMessages ?? 0) + (user.messagesSent ?? 0)}
                </Typography>
                <Typography fontSize={"12.89px"}>Message</Typography>
              </Grid2>
              <Grid2 size={4}>
                <Typography
                  color={BLUE.dark}
                  fontWeight={700}
                  fontSize={"25.78px"}
                >
                  {user.groupsJoined ?? 0}
                </Typography>
                <Typography fontSize={"12.89px"}>Groups</Typography>
              </Grid2>
              <Grid2 size={4}>
                <Typography
                  color={BLUE.dark}
                  fontWeight={700}
                  fontSize={"25.78px"}
                >
                  {user.groupsCreated ?? 0}
                </Typography>
                <Typography fontSize={"12.89px"}>Created</Typography>
              </Grid2>
            </Grid2>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default UsersList;

const outerBoxStyles: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  overflowY: "scroll",
  maxHeight: "80vh",
  "&::-webkit-scrollbar": { display: "none" },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  bgcolor: WHITE.main,
  borderRadius: "25px",
};

const cardStyles: SxProps = {
  width: "calc(50% - 40px)",
  margin: "8px",
  minHeight: "400px",
  bgcolor: GRAY.light,
  borderRadius: "25px",
  boxShadow: "none",
  fontSize: "10.74px",
};

const headerBoxStyles: SxProps = {
  display: "flex",
  flexDirection: "row",
  gap: 2,
  p: 2,
  height: "150px",
  bgcolor: BROWN.light,
};

const avatarStyles: SxProps = {
  width: "150px",
  height: "150px",
  mr: 2,
};

const userInfoBoxStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
};

const infoTextStyles: SxProps = {
  mb: 1,
};

const dividerStyles: SxProps = {
  borderColor: WHITE.light,
};

const editIconBoxStyles: SxProps = {
  display: "flex",
  justifyContent: "flex-end",
};

const editIconStyles: React.CSSProperties = {
  height: "22.55916404724121px",
  cursor: "pointer",
};

const statsContainerStyles: SxProps = {
  textAlign: "center",
};
