/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  SxProps,
  Grid2,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { signInApi } from "../api/requests/signIn";
import { getItem, setItem } from "../utils/utils";
import { BLUE, GRAY, WHITE } from "../utils/constants";
import AppLogoViolet from "../assets/brownTheme/AppLogo.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FORGOTPASSWORD } from "../routes/routePaths";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = async () => {
    setLoader(true);
    setErrorMessage(null);

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    if (!email || !password) {
      setErrorMessage("Email or password cannot be empty.");
      setLoader(false);
      return;
    }

    try {
      const response = await signInApi({ email, password });
      if (response?.status === 200) {
        setItem({ key: "token", value: response?.data?.token });
        navigate("/");
      } else {
        setErrorMessage(response?.data?.message || "Login failed.");
      }
    } catch {
      setErrorMessage("An error occurred during login.");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Box sx={outerBoxStyles}>
      <Box sx={innerBoxStyles}>
        <Grid2 container>
          <Grid2 size={6} sx={leftGridStyles}>
            <Box sx={leftBoxStyles}>
              <img src={AppLogoViolet} alt="App Logo" />
              <Typography variant="h5" sx={titleStyles}>
                Sign in
              </Typography>
              <Typography variant="body1" sx={subtitleStyles}>
                Sign in to continue to Chat.
              </Typography>
            </Box>
          </Grid2>
          <Grid2 size={6}>
            <Box sx={BoxContainer}>
              <Typography variant="body1" sx={labelStyles}>
                Email id
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your email id"
                inputRef={emailRef}
                sx={textFieldStyles}
              />
              <Typography variant="body1" sx={{ ...labelStyles, mt: 4 }}>
                Password
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your password"
                inputRef={passwordRef}
                type={showPassword ? "text" : "password"}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={textFieldStyles}
              />
              <Box sx={{ mt: 2, textAlign: "right" }}>
                <Link to={FORGOTPASSWORD} style={{ textDecoration: "none", color: BLUE.dark }}>
                  <Typography variant="body2" sx={{ fontSize: "16px" }}>
                    Forgot Password?
                  </Typography>
                </Link>
              </Box>
              {errorMessage && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {errorMessage}
                </Typography>
              )}
              <Button
                onClick={handleLogin}
                fullWidth
                variant="contained"
                sx={buttonStyles}
                disabled={loader}
              >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Sign in"}
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default Login;

const outerBoxStyles: SxProps = {
  display: "flex",
  alignItems: "center",
  height: "inherit",
  width: "inherit",
  bgcolor: WHITE.moderate,
  p: 4,
  boxSizing: "border-box",
};

const innerBoxStyles: SxProps = {
  flexGrow: 1,
  height: "100%",
  bgcolor: WHITE.main,
  borderRadius: "24px",
  alignContent: "center",
};

const leftGridStyles: SxProps = {
  alignContent: "center",
};

const leftBoxStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  ml: "89px",
};

const titleStyles: SxProps = {
  fontSize: "58.45px",
  fontFamily: "Poppins, sans-serif",
};

const subtitleStyles: SxProps = {
  color: GRAY.dark,
  fontSize: "32.88px",
  fontFamily: "Poppins, sans-serif",
};

const labelStyles: SxProps = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "23.8px",
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
  height: "69.70000457763672px",
  borderRadius: "13.33px",
  fontSize: "27.2px",
  textTransform: "none",
};

export const BoxContainer: SxProps = {
  width: "510px",
  minHeight: "300px",
  p: 4,
  m: 8,
  borderRadius: "20px",
  justifyContent: "space-evenly",
};
