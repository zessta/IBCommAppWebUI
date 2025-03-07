import React from "react";
import UserInvite from "../components/UserInvite";
import { Typography } from "@mui/material";

const AdminDashboard = () => {
  return (
    <div>
      <Typography variant="h4">AdminDashboard</Typography>
      <UserInvite />
    </div>
  );
};

export default AdminDashboard;
