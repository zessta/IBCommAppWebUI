/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Box, Card, Typography, SxProps } from "@mui/material";
import React from "react";
import { BLUE, BROWN, GRAY, WHITE } from "../utils/constants";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const RecentEventTags = ({eventTagData}:{eventTagData:any}) => {
  return (
    eventTagData.length>0? 
    <Box sx={outerBoxStyles}>
        {
            eventTagData.map((eventTag:any) => (
                <Card key={eventTag.eventTagId} sx={cardStyles}>
                <Typography sx={cardTitleStyles}>#{eventTag.eventTagName}</Typography>
                {eventTag.userTagData.map((userTag:any) => (
                    <Box key={userTag.userId} sx={avatarBoxStyles}>
                    <Avatar>{userTag.userId}</Avatar>
                    <Box>
                        <Typography sx={nameTextStyles}>{userTag.userId}</Typography>
                        <Typography sx={statusTextStyles}>{userTag.eventTagStatusName}</Typography>
                    </Box>
                    </Box>
                ))}
                </Card>
            ))
        }
    </Box>
    :
    <Box sx={emptyBoxStyles}>
        <HourglassEmptyIcon sx={{color:GRAY.dark, fontSize:40}}/>
        <Typography variant="subtitle2" color={GRAY.dark} mt={4}>No responses for Event Tags</Typography>
    </Box>
    // <Box sx={outerBoxStyles}>
    //   {Array.from({ length: 7 }, (_, index) => (
    //     <Card key={index} sx={cardStyles}>
    //       <Typography sx={cardTitleStyles}>#todaymeeting</Typography>
    //       {Array.from({ length: 3 }, (_, index) => (
    //         <Box key={index} sx={avatarBoxStyles}>
    //           <Avatar>AJ</Avatar>
    //           <Box>
    //             <Typography sx={nameTextStyles}>name</Typography>
    //             <Typography sx={statusTextStyles}>status</Typography>
    //           </Box>
    //         </Box>
    //       ))}
    //     </Card>
    //   ))}
    // </Box>
  );
};

export default RecentEventTags;

const emptyBoxStyles: SxProps = {
    p: 1,
    boxShadow: "-2px 4px 12.2px 0px #00000040",
    flexGrow:1,
    borderRadius:"11px",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column"
};

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
