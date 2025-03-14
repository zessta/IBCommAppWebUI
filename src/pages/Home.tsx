import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

const Home = () => {
  return (
    <div>
      {/* <Typography variant="h4" gutterBottom>Home Page</Typography> */}
      <Box mt={2} display={"flex"} gap={8}>
        <Card sx={{width:300, height:200, boxShadow:4}}>
          <CardContent>
            <Typography variant="h5" component="div" marginBottom={2}>
              Pending Invitations
            </Typography>
            <Box display={"flex"} alignItems={"center"} gap={8}>
              <Typography sx={{ fontWeight:20 }} fontSize={70} color="text.secondary">
                4
              </Typography>
              <Typography variant="body2" fontSize={30} color="warning">
                Active
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{width:300, height:200, boxShadow:4}}>
          <CardContent>
            <Typography variant="h5" component="div" marginBottom={2}>
              Recently Onboarded
            </Typography>
            <Box display={"flex"} alignItems={"center"} gap={8}>
              <Typography sx={{ fontWeight:20 }} fontSize={70} color="text.secondary">
                10
              </Typography>
              <Typography variant="body2" fontSize={30} color="success">
                Zone
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{width:300, height:200, boxShadow:4}}>
          <CardContent>
            <Typography variant="h5" component="div" marginBottom={2}>
              {"Today's Interaction"}
            </Typography>
            <Box display={"flex"} alignItems={"center"} gap={8}>
              <Typography sx={{ fontWeight:20 }} fontSize={70} color="text.secondary">
                28
              </Typography>
              <Typography variant="body2" fontSize={30} color="info">
                Chat
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Home;
