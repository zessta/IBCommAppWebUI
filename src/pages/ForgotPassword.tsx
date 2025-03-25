import React, { useRef, useState } from "react";
import { Box, TextField, Button, Typography, SxProps, CircularProgress } from "@mui/material";
import { useAlert } from "../context/AlertContext";
import { sendResetPasswordEmail } from "../api/requests/resetPassword";
import { BLUE, GRAY, WHITE } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { LOGINPATH } from "../routes/routePaths";

const ForgotPassword: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [loader, setLoader] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleSendEmail = async () => {
    const email = emailRef.current?.value || "";
    if (!email) {
      showAlert("Email cannot be empty.", "error");
      return;
    }

    setLoader(true);
    try {
      const response = await sendResetPasswordEmail({ email });
      if (response?.status === 200) {
        showAlert("Reset password email sent successfully!", "success");
        navigate(LOGINPATH)
      } else {
        showAlert(response?.data?.message || "Failed to send email.", "error");
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
          Forgot Password
        </Typography>
        <Typography variant="body1" sx={subtitleStyles}>
          Enter your email to receive a password reset link.
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter your email"
          inputRef={emailRef}
          sx={textFieldStyles}
        />
        <Button
          onClick={handleSendEmail}
          fullWidth
          variant="contained"
          sx={buttonStyles}
          disabled={loader}
        >
          {loader ? <CircularProgress size={24} color="inherit" /> : "Send Email"}
        </Button>
      </Box>
    </Box>
  );
};

export default ForgotPassword;

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
};

const buttonStyles: SxProps = {
  bgcolor: BLUE.dark,
  mt: 4,
  height: "55px",
  borderRadius: "13.33px",
  fontSize: "22px",
  textTransform: "none",
};