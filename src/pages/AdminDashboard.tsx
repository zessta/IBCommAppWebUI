import React from "react";
import UserInvite from "../components/UserInvite";
import { Typography } from "@mui/material";
import UsersTable from "../components/UsersTable";
import Grid from "@mui/material/Grid2";

const AdminDashboard = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>AdminDashboard</Typography>
      <Grid container spacing={2}>
        <Grid size={{xs:12, md:4}}>
          <UserInvite />
        </Grid>
        <Grid size={{xs:12, md:8}}>
          <UsersTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
