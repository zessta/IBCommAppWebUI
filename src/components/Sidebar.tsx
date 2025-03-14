import React, { useState } from "react";
import { Drawer, Box,  List, ListItem, ListItemText, ListItemIcon, ListItemButton, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AppLogo from "../assets/AppLogoWhite.svg";
import DashboardIcon from "../assets/DashboardIcon.svg";
import TagsIcon from "../assets/TagsIcon.svg";
import RolesIcon from "../assets/RolesIcon.svg";
import { VIOLET } from "../utils/constants";
import { BASE, EVENTTAGPATH, ROLESPATH } from "../routes/routePaths";

const menuItems = [
  { id: 1, to: BASE, text: "Dashboard", icon: <img src={DashboardIcon}/> },
  { id: 2, to: EVENTTAGPATH, text: "Tags", icon: <img src={TagsIcon}/> },
  { id: 3, to: ROLESPATH, text: "Roles", icon: <img src={RolesIcon}/> },
];

const Sidebar = () => {
        const [selectedMenu, setSelectedMenu] = useState(0);
        const navigate = useNavigate();
    
    
        const handleSelect = (id:number) => {
            setSelectedMenu(id);
          };
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          width: 200,
          bgcolor: VIOLET.dark,
          height: "100vh",
          position: "relative",
          borderRadius: "24px",
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        <img src={AppLogo} alt="App Logo" style={{ width: "60.621788024902344px", height: "70px", marginBottom: "16px" }} />
      </Box>
      <List sx={{ mt: "35%" }}>
        {menuItems.map(({ id, to, text, icon }) => (
          <ListItem component={Link} to={to} key={id} sx={{
            "&.MuiListItem-root":{
                p:0,
                mb:1
            }
          }}>
            <ListItemButton 
             selected={selectedMenu === id}
             onClick={() => handleSelect(id)}
                sx={{
                    "&.Mui-selected": {
                        bgcolor: VIOLET.light,
                        color: "#fff",
                        "& .MuiListItemIcon-root": { color: "#fff", },
                    },
                }}>
                <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
                <ListItemText primary={text} sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    <Button variant="contained" sx={{m :2, mt:"auto", bgcolor:VIOLET.light}} onClick={() => {navigate("/signout")}}>Logout</Button>
    </Drawer>
  );
};

export default Sidebar;
