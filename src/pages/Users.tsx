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
import UsersList from "../components/UsersList";
import CreateUserModal from "../components/CreateUserModal";
import { getUsers } from "../api/requests/users";

const Users = () => {
  const [currentEditingUser, setCurrentEditingUser] = useState<any>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCloseUserCreation = () => {
    setShowUserModal(false);
    fetchUsers();
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user: any) =>
      user.fullName.toLowerCase().includes(searchUser.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchUser, users]);

  return (
    <Box sx={outerBoxStyles}>
      <Box sx={headerBoxStyles}>
        <TextField
          placeholder="Search Users"
          onChange={(e) => setSearchUser(e.target.value)}
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
          onClick={() => setShowUserModal(true)}
        >
          <AddIcon sx={{ mr: 1 }} /> Add User
        </Button>
      </Box>
      {loading ? (
        <Box sx={loadingBoxStyles}>
          <CircularProgress />
        </Box>
      ) : (
        <UsersList
          users={filteredUsers}
          setCurrentEditingUser={setCurrentEditingUser}
        />
      )}
      {showUserModal && (
        <CreateUserModal
          open={showUserModal}
          handleClose={handleCloseUserCreation}
        />
      )}
    </Box>
  );
};

export default Users;

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
