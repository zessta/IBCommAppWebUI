import React, { useState } from "react";
import { Box, MenuItem, Typography, SxProps } from "@mui/material";
import { BLUE, GRAY, WHITE } from "../utils/constants";
import ActiveIcon from "../assets/ActiveIcon.svg";
import EditIcon from "../assets/brownTheme/EditIcon.svg";
import MenuDotsIcon from "../assets/brownTheme/MenuDotsIcon.svg";
import UserRoleModal from "./UserRoleModal";

interface Role {
  roleId: number;
  roleName: string;
  description: string;
}

interface RolesListProps {
  roles: Role[];
  setCurrentEditingRole: (role: Role) => void;
}

const RolesList: React.FC<RolesListProps> = ({ roles, setCurrentEditingRole }) => {
  const [selectedRank, setSelectedRank] = useState<Role | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleRankView = (role: Role) => {
    setSelectedRank(role);
    setShowModal(true);
  };

  const handleCloseRankView = () => {
    setShowModal(false);
    setSelectedRank(null);
  };

  return (
    <Box sx={outerBoxStyles}>
      {roles.map((role) => (
        <Box key={role.roleId} sx={cardStyles} onClick={() => handleRankView(role)}>
          <Box sx={headerBoxStyles}>
            <MenuItem key={role.roleId} value={role.roleName} sx={menuItemStyles}>
              {role.roleName}
              <img src={ActiveIcon} style={{ marginLeft: 8 }} />
            </MenuItem>
            <Box sx={iconBoxStyles}>
              <img
                src={EditIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentEditingRole(role);
                }}
                style={{ cursor: "pointer" }}
              />
              <img src={MenuDotsIcon} />
            </Box>
          </Box>
          <Box sx={descriptionBoxStyles}>
            <Typography variant="body1" sx={descriptionTextStyles}>
              {role.description}
            </Typography>
          </Box>
        </Box>
      ))}
      {showModal && selectedRank && (
        <UserRoleModal open={showModal} rank={selectedRank} handleClose={handleCloseRankView} />
      )}
    </Box>
  );
};

export default RolesList;

const outerBoxStyles: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  overflowY: "scroll",
  maxHeight: "80vh",
  "&::-webkit-scrollbar": { display: "none" },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  bgcolor: WHITE.main,
  borderRadius: "25px",
};

const cardStyles: SxProps = {
  width: "calc(33.33% - 40px)",
  margin: "8px",
  minHeight: "139px",
  bgcolor: GRAY.light,
  borderRadius: "25px",
  p: "12px",
  boxShadow: "none",
  cursor: "pointer",
};

const headerBoxStyles: SxProps = {
  display: "flex",
  flexDirection: "row",
  gap: 2,
};

const menuItemStyles: SxProps = {
  color: BLUE.dark,
  fontWeight: 600,
  fontSize: "20px",
  p: "8px",
  fontFamily: "Poppins, sans-serif",
  cursor: "default",
};

const iconBoxStyles: SxProps = {
  marginLeft: "auto",
  display: "flex",
  gap: 1,
  alignItems: "center",
};

const descriptionBoxStyles: SxProps = {
  mt: 1,
  p: 1,
  wordWrap: "break-word",
};

const descriptionTextStyles: SxProps = {
  color: GRAY.dark,
  fontSize: "14px",
  fontFamily: "Poppins, sans-serif",
  wordWrap: "break-word",
};
