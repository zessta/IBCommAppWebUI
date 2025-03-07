import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Typography, Box, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {encodedString} = params;
  const [loader, setLoader] = useState(true);
  const [isPasswordCreated, setIsPasswordCreated] = useState(true);


  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/login");
  };

  
  const GetUserStatus = ({encodedString}:{encodedString:string}) => {
      console.log(encodedString);
      return false;
  }
  
  useEffect(()=>{
    setTimeout(()=>{
        const userStatus = GetUserStatus({encodedString: encodedString??""})
        setIsPasswordCreated(userStatus)
        setLoader(false)
    }, 2000)
  },[])

 if(loader){
    return(
        <Container
            maxWidth="sm"
            sx={{
            display: "flex",
            alignItems: "center",
            justifyContent:"center",
            height: "inherit",
            }}
        >
            <CircularProgress size={60} thickness={6}/>
        </Container>
    )
 }

 const RedirecToLogin = () => {
    setTimeout(()=>navigate("/login"),2000)
    return (
        <Typography variant="h5" color="green">User Already Created, Redirecting...</Typography>
    )
 }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        height: "inherit",
      }}
    >
        {
            isPasswordCreated?<RedirecToLogin/>:
        
            <Box
                display="flex" flexDirection="column" alignItems="center"
                sx={{
                boxShadow: 3,
                width: "600px",
                minHeight: "300px",
                p: 4,
                borderRadius: "20px",
                gap:2
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>Password Creation</Typography>
                <form onSubmit={handleSignUp}>
                <Typography variant="h6" sx={{bgcolor:"#dde6ed", p:1, mb:2}}>User Name</Typography>
                <Typography variant="h6" sx={{bgcolor:"#dde6ed", p:1}}>Badge ID</Typography>
                <TextField variant="outlined" margin="normal" id="password" label="Password" name="password" type="password" autoComplete="current-password" autoFocus required fullWidth/>
                <Button type="submit" variant="contained" color="primary" size="large"
                    sx={{
                    mt: 2,
                    }}
                >Create</Button>
                </form>
            </Box>
      }
    </Container>
  );
};

export default SignUp;
