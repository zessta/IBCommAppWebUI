/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Modal,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import CloseIcon from "../assets/CloseIcon.svg";
import { createGroupForUsers, getUserForRole } from "../api/requests/users";
// import { getHubConnection } from "../utils/hubConnection";
import { useAlert } from "../context/AlertContext";

interface Role {
  roleId: number;
  roleName: string;
  description: string;
}

interface UserRoleModalProps {
  open: boolean;
  rank: Role;
  handleClose: () => void;
}

const UserRoleModal: React.FC<UserRoleModalProps> = ({
  open,
  rank,
  handleClose,
}) => {
  const [users, setUsers] = useState([]);
  const groupName = useRef<HTMLInputElement>(null);
  const {showAlert} = useAlert();

  const handleCreateGroup = async () => {
    const userIds = users?.map((user: any) => user?.userId);
    const groupNameValue = groupName.current?.value?.trim();

    if (!groupNameValue) {
      showAlert("Group name cannot be empty.", "error");
      return;
    }

    if (userIds.length === 0) {
      showAlert("No users available to create a group.", "error");
      return;
    }

    try {
      const response = await createGroupForUsers({
        groupName: groupNameValue,
        memberUserIds: userIds,
      });
      if (response.status === 200) {
        showAlert("Group created successfully", "success");
      }
    } catch {
      showAlert("Failed to create group", "error");
    } finally {
      handleClose();
    }
  };

  const fetchUsersForRank = async () => {
    const response = await getUserForRole(rank.roleName);
    if (response.status === 200) {
      setUsers(response.data.users);
    }
  };

  useEffect(() => {
    fetchUsersForRank();
  }, []);

  return (
    <Backdrop open={open} sx={backdropStyles}>
      <Modal open={open} sx={modalStyles}>
        <Box sx={boxStyles}>
          <Box sx={headerStyles}>
            <Typography
              id="add-role-modal-title"
              variant="h6"
              component="h2"
              sx={titleStyles}
            >
              {rank?.roleName}
            </Typography>
            <img
              src={CloseIcon}
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </Box>
          {users && users.length > 0 ? (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                {users.map((user: any) => (
                  <Box
                    key={user.userId}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      p: 2,
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {user.fullname}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      {user.email}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "flex-end", mt: "auto", gap: 2 }}
              >
                <TextField size="small" placeholder="Enter Group Name" inputRef={groupName}/>
                <Button variant="contained" onClick={handleCreateGroup}>Create Group</Button>
              </Box>
            </>
          ) : (
            <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
              No users assigned.
            </Typography>
          )}
        </Box>
      </Modal>
    </Backdrop>
  );
};

export default UserRoleModal;

const backdropStyles: SxProps<Theme> = {
  zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
  backdropFilter: "blur(5px)",
};

const modalStyles: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Poppins, sans-serif",
};

const boxStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  bgcolor: "background.paper",
  p: 4,
  borderRadius: "24px",
  boxShadow: 24,
  width: "50%",
  height: "70%",
};

const headerStyles: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 2,
};

const titleStyles: SxProps = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "30px",
};
