import React, { useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  SxProps,
  CircularProgress,
} from "@mui/material";
import { useAlert } from "../context/AlertContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updatePasswordApi } from "../api/requests/resetPassword";
import { BLUE, GRAY, WHITE } from "../utils/constants";
import { LOGINPATH } from "../routes/routePaths";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [loader, setLoader] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    const newPassword = newPasswordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    if (!newPassword || !confirmPassword) {
      showAlert("Both password fields are required.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert("Passwords do not match.", "error");
      return;
    }

    if (!token) {
      showAlert("Invalid or missing token.", "error");
      return;
    }

    setLoader(true);
    try {
      const response = await updatePasswordApi({ token, newPassword });
      if (response?.status === 200) {
        showAlert("Password updated successfully!", "success");
        navigate(LOGINPATH)
      } else {
        showAlert(
          response?.data?.message || "Failed to update password.",
          "error"
        );
      }
    } catch {
      showAlert("An error occurred. Please try again.", "error");
    } finally {
      setLoader(false);
    }
  };

  return (
    <Box sx={outerBoxStyles}>
      <Box sx={innerBoxStyles}>
        <Typography variant="h5" sx={titleStyles}>
          Update Password
        </Typography>
        <Typography variant="body1" sx={subtitleStyles}>
          Enter your new password below.
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter new password"
          inputRef={newPasswordRef}
          type="password"
          sx={textFieldStyles}
        />
        <TextField
          fullWidth
          placeholder="Confirm new password"
          inputRef={confirmPasswordRef}
          type="password"
          sx={textFieldStyles}
        />
        <Button
          onClick={handleUpdatePassword}
          fullWidth
          variant="contained"
          sx={buttonStyles}
          disabled={loader}
        >
          {loader ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Update Password"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
const outerBoxStyles: SxProps = {
  flexGrow: 1,
  height: "100%",
  bgcolor: WHITE.moderate,
  borderRadius: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const innerBoxStyles: SxProps = {
  bgcolor: WHITE.main,
  width: "510px",
  minHeight: "300px",
  p: 4,
  m: 8,
  borderRadius: "20px",
  justifyContent: "space-evenly",
};

const titleStyles: SxProps = {
  fontSize:  "23.8px",
  fontFamily: "Poppins, sans-serif",
  mb:2
};

const subtitleStyles: SxProps = {
  color: GRAY.dark,
  fontSize: "16px",
  fontFamily: "Poppins, sans-serif",
  mb:4
};

const textFieldStyles: SxProps = {
  height: "69.69999694824219px",
  bgcolor: GRAY.light,
  "& .MuiOutlinedInput-root": {
    borderRadius: "11px",
    fontFamily: "Poppins, sans-serif",
    height: "69.69999694824219px",
    "& fieldset": {
      borderColor: "transparent",
    },
  },
  borderRadius: "11px",
  mb:2
};

const buttonStyles: SxProps = {
  bgcolor: BLUE.dark,
  mt: 2,
  height: "55px",
  borderRadius: "13.33px",
  fontSize: "22px",
  textTransform: "none",
};