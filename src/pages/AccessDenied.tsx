import React from "react";
import { Container, Typography, Box } from "@mui/material";

const AccessDenied = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1">
          You do not have permission to view this page. Please contact your
          administrator.
        </Typography>
      </Box>
    </Container>
  );
};

export default AccessDenied;
