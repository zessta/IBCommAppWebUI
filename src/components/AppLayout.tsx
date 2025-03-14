import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, Drawer, ListItemIcon, ListItemButton, Typography, Button } from "@mui/material";
import { Outlet, Link, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import WindowIcon from '@mui/icons-material/Window';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EventIcon from '@mui/icons-material/Event';
import { EVENTTAG } from "../routes/routePaths";

const menuItems = [
    { id: 1, to : "/", text: "Home", icon: <HomeIcon /> },
    { id: 3, to : EVENTTAG, text: "Event Tag", icon: <EventIcon/> },
    { id: 2, to : "/admin", text: "Admin", icon: <AdminPanelSettingsIcon/> },
  ];


const Sidebar = () => {
    const [selectedMenu, setSelectedMenu] = useState(0);
    const navigate = useNavigate();


    const handleSelect = (id:number) => {
        setSelectedMenu(id);
      };

  return (
    <Drawer variant="permanent" anchor="left" sx={{
        "& .MuiDrawer-paper": {
            position: "relative",
            bgcolor:"#d1e8ed", 
          },
          "&.Mui-selected": {
            bgcolor: "#1976d2", // Highlight color
            }
    }}>
      <Box sx={{ width: 200, height:"100vh", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
        <List sx={{paddingY:"0px"}}>
            <ListItem sx={{
                bgcolor:"#06345c",
                height:"80px"
            }}>
                <ListItemIcon sx={{
                    width:"fullWidth",
                }}><WindowIcon fontSize="large" sx={{color:"white"}}/></ListItemIcon>
                <Typography variant="h4" color="white">IB</Typography>
            </ListItem>
          {
            menuItems.map(({id, to, text,icon }) =>(
                <ListItem key={id} component={Link} to={to} sx={{
                    p:0 
                }}>
                    <ListItemButton
                        selected={selectedMenu === id} // Highlight active selection
                        onClick={() => handleSelect(id)}
                        sx={{
                        // borderRadius:"10px",
                        "&.Mui-selected": {
                            bgcolor: "#77abd9", // Highlight color
                            color: "#fff",
                            "& .MuiListItemIcon-root": { color: "#fff", },
                        },
                        }}>
                            <ListItemIcon sx={{minWidth:"35px"}}>{icon}</ListItemIcon>
                            <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))
          }
        </List>
        <Button variant="contained" sx={{m:2}} onClick={() => {navigate("/signout")}}>Logout</Button>
      </Box>
    </Drawer>
  );
};

const AppLayout = () => {
  return (
    <Box sx={{ display: "flex"}}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
