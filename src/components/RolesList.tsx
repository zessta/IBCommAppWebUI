/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Card, MenuItem, Typography } from "@mui/material";
import { GRAY, VIOLET, WHITE } from "../utils/constants";
import ActiveIcon from "../assets/ActiveIcon.svg";
import EditIcon from "../assets/EditIcon.svg";
import MenuDotsIcon from "../assets/MenuDotsIcon.svg";


const RolesList = ({roles, setCurrentEditingRole}:{roles:any, setCurrentEditingRole:any}) => {
    return (
    <Box sx={{ display: "flex", flexWrap: "wrap", overflowY: "scroll", maxHeight: "80vh", "&::-webkit-scrollbar": { display: "none" }, msOverflowStyle: "none", scrollbarWidth: "none", bgcolor:WHITE.main, borderRadius:"25px"}}>
        {roles.map((role:any) => (
            <Card key={role.roleId} sx={{ width: 'calc(33.33% - 40px)', margin: '8px', minHeight:"139px", bgcolor:GRAY.light, borderRadius:"25px", p:"12px", boxShadow: "none" }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    <MenuItem key={role.roleId} value={role.name} sx={{color:VIOLET.dark, fontWeight: 600, fontSize: "20px", fontFamily:"Poppins, sans-serif", cursor:"default"}}>
                        {role.name}<img src={ActiveIcon} style={{marginLeft:8}}/>
                    </MenuItem>
                    <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1, alignItems: "center" }}>
                        <img src={EditIcon} onClick={() => setCurrentEditingRole(role)} style={{cursor:"pointer"}}/>
                        <img src={MenuDotsIcon}/>
                    </Box>
                </Box>
                <Box sx={{ mt: 1, p: 1, wordWrap: "break-word" }}>
                    <Typography variant="body1" sx={{color:GRAY.dark, fontSize: "14px", fontFamily:"Poppins, sans-serif", wordWrap: "break-word"}}>
                        {role.description}
                    </Typography>
                </Box>
            </Card>
        ))}
    </Box>
    );
};

export default RolesList;
