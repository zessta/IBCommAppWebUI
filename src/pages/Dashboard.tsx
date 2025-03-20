/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box, SxProps, Card, Typography, CircularProgress } from "@mui/material";
import { BROWN, GRAY, WHITE } from "../utils/constants";
import RecentEventTags from "../components/RecentEventTags";
import { getTagDataForDashboard } from "../api/requests/dashboard";


const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>({
    numberOfEventTags:0,
    numberOfUsers:0,
    numberOfGroups:0,
    eventTagData:[]
  });
  const [loader, setLoader] = useState(false);

  useEffect(()=>{
    setLoader(true);
    const fetchDashboardData = async () =>{
      try{
        const response = await getTagDataForDashboard();
        if(response.status === 200){
          setDashboardData(response.data);
        }
      }
      catch(error){
        console.log(error);
      }
      finally{
        setLoader(false);
      }
    }
    setTimeout(() => {
      fetchDashboardData();
    }, 500)
  },[]);

  if(loader){
    return (
      <Box sx={{height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <CircularProgress size={60} thickness={6} />
      </Box>
    )
  }

  return (
    <Box sx={outerBoxStyles}>
      <Box sx={cardBoxStyles}>
          <Card sx={cardStyles}>
            <Typography sx={cardCountStyles}>{dashboardData.numberOfEventTags}</Typography>
            <Typography sx={cardTextStyles}>Tags</Typography>
          </Card>
          <Card sx={cardStyles}>
            <Typography sx={cardCountStyles}>{dashboardData.numberOfUsers}</Typography>
            <Typography sx={cardTextStyles}>Roles</Typography>
          </Card>
          <Card sx={cardStyles}>
            <Typography sx={cardCountStyles}>{dashboardData.numberOfGroups}</Typography>
            <Typography sx={cardTextStyles}>Users</Typography>
          </Card>
      </Box>
      <RecentEventTags eventTagData = {dashboardData.eventTagData}/>
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
