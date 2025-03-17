import React from "react";
import { Box, SxProps } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { WHITE } from "../utils/constants";

const AppLayout = () => {
  return (
    <Box sx={outerBoxStyles}>
      <Sidebar />
      <Box component="main" sx={mainBoxStyles}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;

const outerBoxStyles: SxProps = {
  display: "flex",
  bgcolor: WHITE.moderate,
};

const mainBoxStyles: SxProps = {
  flexGrow: 1,
  p: 3,
};
