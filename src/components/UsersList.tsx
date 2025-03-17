/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Card, Avatar, Grid2, Typography, Divider } from "@mui/material";
import { GRAY, VIOLET, WHITE } from "../utils/constants";
import Profile from "../assets/Profile.svg";
import EditOutlinedIcon from "../assets/EditOutlinedIcon.svg";

const UsersList = ({ users, setCurrentEditingUser }: { users: any, setCurrentEditingUser: any }) => {
    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent:"space-evenly", overflowY: "scroll", maxHeight: "80vh", "&::-webkit-scrollbar": { display: "none" }, msOverflowStyle: "none", scrollbarWidth: "none", bgcolor: WHITE.main, borderRadius: "25px" }}>
            {users.map((user: any) => (
                <Card key={user.userId} sx={{ width: 'calc(50% - 40px)', margin: '8px', minHeight: "400px", bgcolor: GRAY.light, borderRadius: "25px", boxShadow: "none", fontSize:"10.74px" }}>
                    <Box bgcolor={VIOLET.moderate} sx={{ display: "flex", flexDirection: "row", gap: 2, p: 2, height: "150px" }}>
                        <Avatar alt="User Avatar" src={Profile} sx={{ width: "150px", height: "150px", mr:2 }} />
                        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                            <Grid2 container spacing={3}>
                                <Grid2 size={6} >
                                    <Typography variant="body2" sx={{ mb: 1 }}>Name : {user.fullName}</Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Contact no : {user.mobileNo}</Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Email : {user.email}</Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>DOB : {new Date(user.dateOfBirth).toLocaleDateString()}</Typography>
                                </Grid2>
                                <Divider orientation="vertical" flexItem sx={{borderColor:WHITE.light}}/>
                                <Grid2 size={4}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>PS : {user.policeStation}</Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Zone : {user.zone}</Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Location : {user.location}</Typography>
                                </Grid2>
                            </Grid2>
                        </Box>
                    </Box>
                    <Box p={4}>
                        <Grid2 container spacing={3}>
                            <Grid2 container size={8} direction={"row"}>
                                <Grid2 size={6}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Role : {user.rank
                                    }</Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Message Sent : 5</Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Group Messages : 0</Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Group Created : 1</Typography>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Group Joined : 2</Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Responses : 0</Typography>
                                </Grid2>
                            </Grid2>
                            <Grid2 size={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <img src={EditOutlinedIcon} style={{height:"22.55916404724121px", cursor:"pointer"}} alt="Edit Icon"/>
                            </Grid2>
                        </Grid2>
                    </Box>
                    <Box p={2}>
                        <Grid2 container sx={{textAlign:"center"}}>
                            <Grid2 size={4}>
                                <Typography color={VIOLET.dark} fontWeight={700} fontSize={"25.78px"}>5</Typography>
                                <Typography fontSize={"12.89px"}>Message</Typography>
                            </Grid2>
                            <Grid2 size={4}>
                                <Typography color={VIOLET.dark} fontWeight={700} fontSize={"25.78px"}>5</Typography>
                                <Typography fontSize={"12.89px"}>Groups</Typography>
                            </Grid2>
                            <Grid2 size={4}>
                                <Typography color={VIOLET.dark} fontWeight={700} fontSize={"25.78px"}>5</Typography>
                                <Typography fontSize={"12.89px"}>Created</Typography>
                            </Grid2>
                        </Grid2>
                    </Box>
                </Card>
            ))}
        </Box>
    );
};

export default UsersList;
