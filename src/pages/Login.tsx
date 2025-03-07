import React from "react";
import { Container, TextField, Button, Typography, Box, SxProps } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/ib/home");
  };
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
        <form onSubmit={handleLogin}>
          <TextField variant="outlined" margin="normal" id="email" label="Email Address" name="email" autoComplete="email" autoFocus required fullWidth />
          <TextField variant="outlined" margin="normal" id="password" label="Password" name="password" type="password" autoComplete="current-password" autoFocus required fullWidth/>
          <Button type="submit" variant="contained" color="primary" size="large"
            sx={{
              mt:2,
            }}
          >Sign In</Button>
        </form>
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
