import { Avatar, Box, Card, Typography, SxProps } from "@mui/material";
import React from "react";
import { BLUE, BROWN, WHITE } from "../utils/constants";

const RecentEventTags = () => {
  return (
    <Box sx={outerBoxStyles}>
      {Array.from({ length: 7 }, (_, index) => (
        <Card key={index} sx={cardStyles}>
          <Typography sx={cardTitleStyles}>#todaymeeting</Typography>
          {Array.from({ length: 3 }, (_, index) => (
            <Box key={index} sx={avatarBoxStyles}>
              <Avatar>AJ</Avatar>
              <Box>
                <Typography sx={nameTextStyles}>name</Typography>
                <Typography sx={statusTextStyles}>status</Typography>
              </Box>
            </Box>
          ))}
        </Card>
      ))}
    </Box>
  );
};

export default RecentEventTags;

const outerBoxStyles: SxProps = {
  p: 1,
  display: "flex",
  overflowY: "auto",
  "&::-webkit-scrollbar": { display: "none" },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  boxShadow: "-2px 4px 12.2px 0px #00000040",
  flexGrow:1,
  borderRadius:"11px",
  flexWrap:"wrap"
};

const cardStyles: SxProps = {
  flex: "1 0 21%",
  height: "200px",
  minWidth: "200px",
  maxWidth: "22%",
  margin: "8px",
  p:1,
  boxShadow:"none",
  bgcolor: WHITE.moderate
};

const cardTitleStyles: SxProps = {
  color: BLUE.dark,
  fontSize: "15px",
  fontWeight:"600"
};

const avatarBoxStyles: SxProps = {
  display: "flex",
  alignItems: "center",
  mt: 1,
};

const nameTextStyles: SxProps = {
  color: BLUE.dark,
  fontSize: "12px",
  ml: 1,
  fontWeight:"600"
};

const statusTextStyles: SxProps = {
  color: BROWN.moderate,
  fontSize: "10px",
  ml: 1,
};
