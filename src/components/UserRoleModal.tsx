/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
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
import { getUserForRole } from "../api/requests/users";

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
                <TextField size="small" placeholder="Enter Group Name" />
                <Button variant="contained">Create Group</Button>
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
