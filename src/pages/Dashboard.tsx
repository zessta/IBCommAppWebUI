/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Box, TextField, SxProps, Card, Typography } from "@mui/material";
import { BROWN, GRAY, VIOLET, WHITE } from "../utils/constants";
import SearchIcon from "../assets/SearchIcon.svg";
import RecentEventTags from "../components/RecentEventTags";


const Dashboard = () => {
  const [searchRole, setSearchRole] = useState('');

  return (
    <Box sx={outerBoxStyles}>
      {/* <Box sx={headerBoxStyles}>
        <TextField
          placeholder="Search User"
          onChange={(e) => setSearchRole(e.target.value)}
          sx={searchFieldStyles}
          slotProps={{
            input: {
              startAdornment: (
                <img src={SearchIcon} style={{ marginRight: "12px" }} />
              ),
            },
          }}
        />
      </Box> */}
      <Box sx={cardBoxStyles}>
          <Card sx={cardStyles}>
            <Typography sx={cardCountStyles}>07</Typography>
            <Typography sx={cardTextStyles}>Tags</Typography>
          </Card>
          <Card sx={cardStyles}>
            <Typography sx={cardCountStyles}>04</Typography>
            <Typography sx={cardTextStyles}>Roles</Typography>
          </Card>
          <Card sx={cardStyles}>
            <Typography sx={cardCountStyles}>20</Typography>
            <Typography sx={cardTextStyles}>Users</Typography>
          </Card>
      </Box>
      <RecentEventTags/>
    </Box>
  );
};

export default Dashboard;

const outerBoxStyles: SxProps = {
  flexGrow: 1,
  bgcolor: WHITE.main,
  borderRadius: "18px",
  height:"100%",
  display:"flex",
  flexDirection:"column",
  p:2,
  boxSizing:"border-box"
};

// const headerBoxStyles: SxProps = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   mb: 2,
// };

// const searchFieldStyles: SxProps = {
//   bgcolor: GRAY.light,
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "11px",
//     "& fieldset": {
//       borderColor: "transparent",
//     },
//   },
//   borderRadius: "11px",
//   flexGrow: 1,
//   mr: 4,
// };

const cardBoxStyles: SxProps = {
  display:"flex",
  gap:2,
  mb:2
}

const cardStyles: SxProps = {
  width : "221px",
  height : "178px",
  borderRadius: "11px",
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  justifyContent:"center",
  boxShadow:"-2px 4px 12.2px 0px #00000040"
}

const cardCountStyles: SxProps = {
  fontFamily: "Poppins, sans-serif",
  color: BROWN.dark,
  fontSize:"65.92px",
  fontWeight:"700"
}

const cardTextStyles: SxProps = {
  fontFamily: "Poppins, sans-serif",
  color: GRAY.dark,
  fontSize:"16px",
}
