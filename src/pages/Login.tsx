import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Typography, Box, SxProps, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInApi } from "../api/requests/signIn";
import { getItem, setItem } from "../utils/utils";

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setTimeout(async()=>{
      const response = await signInApi({email, password})
      // eslint-disable-next-line no-constant-condition
      if(response?.status === 200){
        setItem({key:"token", value:response?.data?.token});
        navigate("/");
      }
      else{
        console.log(response?.data);
      }
      setLoader(false)
    }, 2000)
  };

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      navigate("/");
    }
  },[])
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "inherit",
      }}
    >
      <Box
        display="flex" flexDirection="column" alignItems="center"
        sx={BoxContainer}
      >
        <Typography variant="h4" component="h1" gutterBottom>Login</Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
          <TextField variant="outlined" margin="normal" id="email" label="Email Address" name="email" required fullWidth />
          <TextField variant="outlined" margin="normal" id="password" label="Password" name="password" type="password" required fullWidth/>
          <Box display={"flex"} alignItems={"center"} gap={2} justifyItems={"center"} marginTop={2}>
            <Button type="submit" variant="contained" color={loader?"success":"primary"} size="large"
              sx={{
                // mt:2,
              }}
            >Sign In</Button>
            {loader && <Typography variant="h6" marginLeft={"auto"}>Signing In ... <CircularProgress/></Typography>
            }
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

export const BoxContainer:SxProps = {
    boxShadow: 3,
    width: "600px",
    minHeight: "300px",
    p: 4,
    borderRadius: "20px",
}
