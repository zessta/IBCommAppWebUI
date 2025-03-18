import React, { useEffect, useRef, useState } from "react";
import { Container, TextField, Button, Typography, Box, CircularProgress, SxProps, Grid2 } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GRAY, VIOLET, WHITE } from "../utils/constants";
import { createPassword, isUserPasswordCreated } from "../api/requests/users";
import AppLogoViolet from "../assets/AppLogoViolet.svg"

const SignUp = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [isPasswordCreated, setIsPasswordCreated] = useState(false);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();
  const userKey = searchParams.get("token");
  const [errors, setErrors] = useState({ newPassword: "", confirmPassword: "" });
  const [statusText, setStatusText] = useState("");


  useEffect(() => {
    setTimeout(async () => {
      const userStatus = await isUserPasswordCreated({ token: userKey ?? "" });
      if(userStatus.data){
        setStatusText("Password Already Created, Redirecting to Sign in...");
        setIsPasswordCreated(userStatus.data);
      }
      setLoader(false);
    }, 2000);
  }, []);

  if (loader) {
    return (
      <Container
        maxWidth="sm"
        sx={loaderContainerStyles}
      >
        <CircularProgress size={60} thickness={6} />
      </Container>
    );
  }

  const RedirecToLogin = () => {
    setTimeout(() => navigate("/login"), 2000);
    return (
      <Box sx={redirectionBoxStyles}>
        <Typography variant="h5" color="green">{statusText}</Typography>
      </Box>
    );
  };

  
  const validatePasswords = () => {
    const newPassword = newPasswordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    let valid = true;
    const newErrors = { newPassword: "", confirmPassword: "" };

    if (!newPassword) {
      newErrors.newPassword = "Enter new password";
      valid = false;
    }

    if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const handlePasswordCreation = async () => {
    if(validatePasswords()){
      const response = await createPassword({token:userKey!, newPassword:newPasswordRef.current?.value??""});
      if(response.status === 200){
        setStatusText("Password Created Successfully, You will be re-directed to Sign in...");
        setIsPasswordCreated(true);
      }
    }
  };

  if(isPasswordCreated){
    return(
      <RedirecToLogin/>
    )
  }

  return (
      <Box sx={outerBoxStyles}>
      <Box sx={innerBoxStyles}>
        <Grid2 container>
          <Grid2 size={6} sx={leftGridStyles}>
            <Box sx={leftBoxStyles}>
              <img src={AppLogoViolet} alt="App Logo" />
              <Typography variant="h5" sx={titleStyles}>Sign up</Typography>
              <Typography variant="body1" sx={subtitleStyles}>Sign up to continue to Chat.</Typography>
            </Box>
          </Grid2>
          <Grid2 size={6}>
            <Box sx={BoxContainer}>
              <Typography variant="body1" sx={{ ...labelStyles, mt: 4 }}>Create Your Password</Typography>
              <TextField
                fullWidth
                placeholder="Enter your new password"
                inputRef={newPasswordRef}
                type={'password'}
                sx={textFieldStyles}
                error={!!errors.newPassword}
                helperText={errors.newPassword}
              />
              <Typography variant="body1" sx={{ ...labelStyles, mt: 4 }}>Re-enter Your Password</Typography>
              <TextField
                fullWidth
                placeholder="Re-enter new password"
                inputRef={confirmPasswordRef}
                type={'password'}
                sx={textFieldStyles}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
              <Button onClick={handlePasswordCreation} fullWidth variant="contained" sx={buttonStyles}>Create Password</Button>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
    )
    }  
    
export default SignUp;

const redirectionBoxStyles:SxProps = {
  height:"100vh",
  width:"100vw",
  display:"flex",
  alignItems:"center",
  justifyContent:"center"
};

const loaderContainerStyles: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "inherit",
};


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
  textTransform:"none"
};

export const BoxContainer: SxProps = {
  width: "510px",
  minHeight: "300px",
  p: 4,
  m: 8,
  borderRadius: "20px",
  justifyContent: "space-evenly",
};
