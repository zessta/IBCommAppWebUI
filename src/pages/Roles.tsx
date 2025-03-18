/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  SxProps,
} from "@mui/material";
import { BLUE, GRAY, VIOLET, WHITE } from "../utils/constants";
import SearchIcon from "../assets/SearchIcon.svg";
import AddIcon from "@mui/icons-material/Add";
import RolesList from "../components/RolesList";
import CreateRoleModal from "../components/CreateRoleModal";
import useRoles from "../hooks/useRoles";

const Roles = () => {
  const [currentEditingRole, setCurrentEditingRole] = useState<any>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [searchRole, setSearchRole] = useState("");
  const [filteredRoles, setFilteredRoles] = useState<any[]>([]);
  const { roles, loading, error } = useRoles();

  const handleCloseRoleCreation = () => {
    setShowRoleModal(false);
  };

  useEffect(() => {
    const filtered = roles.filter((role: any) =>
      role.roleName.toLowerCase().includes(searchRole.toLowerCase())
    );
    setFilteredRoles(filtered);
  }, [searchRole, roles]);

  return (
    <Box sx={outerBoxStyles}>
      <Box sx={headerBoxStyles}>
        <TextField
          placeholder="Search Roles"
          onChange={(e) => setSearchRole(e.target.value)}
          sx={searchFieldStyles}
          slotProps={{
            input: {
              startAdornment: (
                <img src={SearchIcon} style={{ marginRight: "12px" }} />
              ),
            },
          }}
        />
        <Button
          variant="contained"
          sx={addButtonStyles}
          onClick={() => setShowRoleModal(true)}
        >
          <AddIcon sx={{ mr: 1 }} /> Add Role
        </Button>
      </Box>
      {loading ? (
        <Box sx={loadingBoxStyles}>
          <CircularProgress />
        </Box>
      ) : (
        <RolesList
          roles={filteredRoles}
          setCurrentEditingRole={setCurrentEditingRole}
        />
      )}
      {showRoleModal && (
        <CreateRoleModal
          open={showRoleModal}
          handleClose={handleCloseRoleCreation}
        />
      )}
    </Box>
  );
};

export default Roles;

const outerBoxStyles: SxProps = {
  flexGrow: 1,
  bgcolor: WHITE.main,
  borderRadius: "18px",
  height: "100%",
};

const headerBoxStyles: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 2,
  p: 1,
};

const searchFieldStyles: SxProps = {
  bgcolor: GRAY.light,
  "& .MuiOutlinedInput-root": {
    borderRadius: "11px",
    "& fieldset": {
      borderColor: "transparent",
    },
  },
  borderRadius: "11px",
  flexGrow: 1,
  mr: 16,
};

const addButtonStyles: SxProps = {
  bgcolor: BLUE.dark,
  height: 40,
  borderRadius: "11px",
  p: 1,
  px: 2,
};

const loadingBoxStyles: SxProps = {
  display: "flex",
  justifyContent: "center",
  marginTop: "100px",
};
