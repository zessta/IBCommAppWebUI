import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Typography, Box, SxProps, CircularProgress, Grid2, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInApi } from "../api/requests/signIn";
import { getItem, setItem } from "../utils/utils";
import { GRAY, VIOLET, WHITE } from "../utils/constants";
import AppLogoViolet from "../assets/AppLogoViolet.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = () => {
    setLoader(true);
    if (!emailRef.current?.value || !passwordRef.current?.value) {
      console.log("Email or password is empty");
      setLoader(false);
      return;
    }

    setTimeout(async () => {
      const response = await signInApi({ email: emailRef.current?.value || '', password: passwordRef.current?.value || '' });
      if (response?.status === 200) {
        setItem({ key: "token", value: response?.data?.token });
        navigate("/");
      } else {
        console.log(response?.data);
      }
      setLoader(false);
    }, 2000);
  };

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <Box sx={outerBoxStyles}>
      <Box sx={innerBoxStyles}>
        <Grid2 container>
          <Grid2 size={6} sx={leftGridStyles}>
            <Box sx={leftBoxStyles}>
              <img src={AppLogoViolet} alt="App Logo" />
              <Typography variant="h5" sx={titleStyles}>Sign in</Typography>
              <Typography variant="body1" sx={subtitleStyles}>Sign in to continue to Chat.</Typography>
            </Box>
          </Grid2>
          <Grid2 size={6}>
            <Box sx={BoxContainer}>
              <Typography variant="body1" sx={labelStyles}>Email id</Typography>
              <TextField fullWidth placeholder="Enter your email id" inputRef={emailRef} sx={textFieldStyles} />
              <Typography variant="body1" sx={{ ...labelStyles, mt: 4 }}>Password</Typography>
              <TextField
                fullWidth
                placeholder="Enter your password"
                inputRef={passwordRef}
                type={showPassword ? 'text' : 'password'}
                slotProps={{
                  input:{
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
                  }
                }}
                sx={textFieldStyles}
              />
              <Button onClick={handleLogin} variant="contained" sx={buttonStyles}>Sign in</Button>
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
  bgcolor: VIOLET.dark,
  mt: 6,
  height: "69.70000457763672px",
  borderRadius: "13.33px",
  fontSize: "27.2px",
};

export const BoxContainer: SxProps = {
  width: "510px",
  minHeight: "300px",
  p: 4,
  m: 8,
  borderRadius: "20px",
  justifyContent: "space-evenly",
};
