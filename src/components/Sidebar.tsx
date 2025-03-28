import React, { useState } from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Button,
  SxProps,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AppLogo from "../assets/AppLogoWhite.svg";
import DashboardIcon from "../assets/DashboardIcon.svg";
import TagsIcon from "../assets/TagsIcon.svg";
import RolesIcon from "../assets/RolesIcon.svg";
import UsersIcon from "../assets/UsersIcon.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";
import { BLUE, BROWN } from "../utils/constants";
import { BASE, EVENTTAGPATH, ROLESPATH, USERSPATH } from "../routes/routePaths";

interface MenuItem {
  id: number;
  to: string;
  text: string;
  icon: JSX.Element;
}

const menuItems: MenuItem[] = [
  { id: 1, to: BASE, text: "Dashboard", icon: <img src={DashboardIcon} /> },
  { id: 2, to: EVENTTAGPATH, text: "Tags", icon: <img src={TagsIcon} /> },
  { id: 3, to: ROLESPATH, text: "Roles", icon: <img src={RolesIcon} /> },
  { id: 4, to: USERSPATH, text: "Users", icon: <img src={UsersIcon} /> },
];

const Sidebar: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  const navigate = useNavigate();

  const handleSelect = (id: number) => {
    setSelectedMenu(id);
  };

  return (
    <Drawer variant="permanent" anchor="left" sx={drawerStyles}>
      <Box sx={logoBoxStyles}>
        <img src={AppLogo} alt="App Logo" style={logoStyles} />
      </Box>
      <List sx={menuListStyles}>
        {menuItems.map(({ id, to, text, icon }) => (
          <ListItem component={Link} to={to} key={id} sx={listItemStyles}>
            <ListItemButton
              selected={selectedMenu === id}
              onClick={() => handleSelect(id)}
              sx={listItemButtonStyles}
            >
              <ListItemIcon sx={listItemIconStyles}>{icon}</ListItemIcon>
              <ListItemText primary={text} sx={listItemTextStyles} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        sx={logoutButtonStyles}
        onClick={() => {
          navigate("/signout");
        }}
      >
        <img src={LogoutIcon} />
        Logout
      </Button>
    </Drawer>
  );
};

export default Sidebar;

const drawerStyles: SxProps = {
  "& .MuiDrawer-paper": {
    width: 200,
    bgcolor: BLUE.dark,
    height: "100%",
    position: "relative",
    borderRadius: "24px",
  },
};

const logoBoxStyles: SxProps = {
  p: 2,
  textAlign: "center",
};

const logoStyles: React.CSSProperties = {
  width: "60.62px",
  height: "70px",
  marginBottom: "16px",
};

const menuListStyles: SxProps = {
  mt: "35%",
};

const listItemStyles: SxProps = {
  "&.MuiListItem-root": {
    p: 0,
    mb: 1,
  },
};

const listItemButtonStyles: SxProps = {
  "&.Mui-selected": {
    bgcolor: BROWN.dark,
    color: "#fff",
    "& .MuiListItemIcon-root": { color: "#fff" },
  },
};

const listItemIconStyles: SxProps = {
  color: "white",
};

const listItemTextStyles: SxProps = {
  color: "white",
};

const logoutButtonStyles: SxProps = {
  m: 2,
  mt: "auto",
  bgcolor: BLUE.dark,
  textTransform: "none",
  gap: 2,
};
