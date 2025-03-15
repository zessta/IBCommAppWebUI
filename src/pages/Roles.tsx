/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { getRoles } from "../api/requests/roles";
import { GRAY, VIOLET, WHITE } from "../utils/constants";
import SearchIcon from "../assets/SearchIcon.svg";
import AddIcon from "@mui/icons-material/Add";
import RolesList from "../components/RolesList";
import CreateRoleModal from "../components/CreateRoleModal";

const Roles = () => {
  const [roles, setRoles] = useState<any>([]);
  const [currentEditingRole, setCurrentEditingRole] = useState<any>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
    const [searchRole, setSearchRole] = useState('');
    const [filteredRoles, setFilteredRoles] = useState([]);

  const handleCloseRoleCreation = () => {
    setShowRoleModal(false);
    fetchRoles();
  }

  const fetchRoles = async () => {
    const response = await getRoles();
    if (response.status === 200) {
      // setRoles(response.data);
      setRoles([{
        roleId:1,
        name:"IG",
        description:"(Rank 2) Assistant Commissioner of Police",
      },
      {
        roleId:1,
        name:"ACP",
        description:"(Rank 2) Assistant Commissioner of Police",
      },
      {
        roleId:1,
        name:"DCP",
        description:"(Rank 2) Assistant Commissioner of Police",
      },
      {
        roleId:1,
        name:"SI",
        description:"(Rank 2) Assistant Commissioner of Police",
      },
      {
        roleId:1,
        name:"SP",
        description:"(Rank 2) Assistant Commissioner of Police",
      },
      {
        roleId:1,
        name:"CI",
        description:"(Rank 2) Assistant Commissioner of Police",
      },
      {
        roleId:1,
        name:"ACP",
        description:"(Rank 2) Assistant Commissioner of Police",
      },
      {
        roleId:1,
        name:"ACP",
        description:"(Rank 2) Assistant Commissioner of Police",
      },
      {
        roleId:1,
        name:"ACP",
        description:"(Rank 2) Assistant Commissioner of Police",
      },
      {
        roleId:1,
        name:"ACP",
        description:"(Rank 2) Assistant Commissioner of Police",
      },
      {
        roleId:1,
        name:"ACP",
        description:"(Rank 2) Assistant Commissioner of Police",
      },
      {
        roleId:1,
        name:"ACP",
        description:"(Rank 2) Assistant Commissioner of Police",
      },
      {
        roleId:1,
        name:"ACP",
        description:"(Rank 2) Assistant Commissioner of Police",
      },
      {
        roleId:1,
        name:"ACP",
        description:"(Rank 2) Assistant Commissioner of Police",
      }])
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  
    useEffect(() => {
      const filtered = roles.filter((tag:any) => tag.name.toLowerCase().includes(searchRole.toLowerCase()));
      setFilteredRoles(filtered);
    }, [searchRole, roles]);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: WHITE.main, borderRadius:"18px"}}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
        p={1}
      >
        <TextField
          placeholder="Search Roles"
          onChange={(e) => setSearchRole(e.target.value)}
          sx={{
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
          }}
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
          sx={{
            bgcolor: VIOLET.dark,
            height: 40,
            borderRadius: "11px",
            p: 1,
            px: 2,
          }}
          onClick={() => setShowRoleModal(true)}
        >
          <AddIcon sx={{ mr: 1 }} /> Add Role
        </Button>
      </Box>
      <RolesList roles={filteredRoles} setCurrentEditingRole={setCurrentEditingRole} />
      {
        showRoleModal && <CreateRoleModal open={showRoleModal} handleClose={handleCloseRoleCreation} />
      }
    </Box>
  );
};

export default Roles;
