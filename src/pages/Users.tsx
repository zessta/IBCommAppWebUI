/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { GRAY, VIOLET, WHITE } from "../utils/constants";
import SearchIcon from "../assets/SearchIcon.svg";
import AddIcon from "@mui/icons-material/Add";
import UsersList from "../components/UsersList";
import CreateUserModal from "../components/CreateUserModal";
import { getUsers } from "../api/requests/getUsers";

const Users = () => {
  const [users, setUsers] = useState<any>([]);
  const [currentEditingUser, setCurrentEditingUser] = useState<any>(null);
  const [showUserModal, setShowUserModal] = useState(false);
    const [searchUser, setSearchUser] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

  const handleCloseUserCreation = () => {
    setShowUserModal(false);
    fetchUsers();
  }

  const fetchUsers = async () => {
    const response = await getUsers();
    if (response.status === 200) {
      // setUsers(response.data);
      setUsers([{
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
    fetchUsers();
  }, []);

  
    useEffect(() => {
      const filtered = users.filter((tag:any) => tag.name.toLowerCase().includes(searchUser.toLowerCase()));
      setFilteredUsers(filtered);
    }, [searchUser, users]);

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
          placeholder="Search User"
          onChange={(e) => setSearchUser(e.target.value)}
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
          onClick={() => setShowUserModal(true)}
        >
          <AddIcon sx={{ mr: 1 }} /> Add User
        </Button>
      </Box>
      <UsersList users={filteredUsers} setCurrentEditingUser={setCurrentEditingUser} />
      {
        showUserModal && <CreateUserModal open={showUserModal} handleClose={handleCloseUserCreation} />
      }
    </Box>
  );
};

export default Users;
