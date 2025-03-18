import React, { useEffect } from "react";
import { Box, CircularProgress, Typography, SxProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeItem } from "../utils/utils";
import { VIOLET } from "../utils/constants";

const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      removeItem("token");
      navigate("/login");
    }, 2000);
  }, [navigate]);

  return (
    <Box sx={outerBoxStyles}>
      <CircularProgress size={60} thickness={6} sx={progressStyles} />
      <Typography variant="h5" sx={textStyles}>
        Signing out...
      </Typography>
    </Box>
  );
};

export default SignOut;

const outerBoxStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  bgcolor: VIOLET.light,
};

const progressStyles: SxProps = {
  mb: 2,
};

const textStyles: SxProps = {
  color: "white",
};