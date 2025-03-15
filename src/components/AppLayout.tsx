import React from "react";
import { Box} from "@mui/material";
import { Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import { WHITE } from "../utils/constants";


const AppLayout = () => {
  return (
    <Box sx={{ display: "flex", bgcolor:WHITE.moderate}}>
      <Sidebar/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
