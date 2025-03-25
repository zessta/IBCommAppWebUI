/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Backdrop,
  TextField,
  Button,
  Grid2,
  MenuItem,
  SxProps,
  Theme,
} from "@mui/material";
import CloseIcon from "../assets/CloseIcon.svg";
import { BLUE, GRAY } from "../utils/constants";
import useRoles from "../hooks/useRoles";
import { registerUser } from "../api/requests/users";

interface CreateUserModalProps {
  open: boolean;
  handleClose: () => void;
}

interface NewUser {
  fullName: string;
  policeStation: string;
  mobileNo: string;
  zone: string;
  email: string;
  location: string;
  rank: string;
  dateOfBirth: Date | null;
}

interface ErrorState {
  fullName: string;
  email: string;
  dateOfBirth: string;
  rank: string;
  mobileNo: string;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  open,
  handleClose,
}) => {
  const [newUser, setNewUser] = useState<NewUser>({
    fullName: "",
    policeStation: "",
    mobileNo: "",
    zone: "",
    email: "",
    location: "",
    rank: "",
    dateOfBirth: null,
  });
  const [errors, setErrors] = useState<ErrorState>({
    fullName: "",
    email: "",
    dateOfBirth: "",
    rank: "",
    mobileNo: "",
  });
  const { roles, loading, error } = useRoles();

  const handleChange = (field: keyof NewUser, value: string | Date | null) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error on change
  };

  const validateForm = (): boolean => {
    const newErrors: ErrorState = {
      fullName: "",
      email: "",
      dateOfBirth: "",
      rank: "",
      mobileNo: "",
    };
    let isValid = true;

    if (!newUser.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
      isValid = false;
    }

    if (!newUser.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      newErrors.email = "Valid Email is required.";
      isValid = false;
    }

    if (!newUser.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required.";
      isValid = false;
    }

    if (!newUser.rank.trim()) {
      newErrors.rank = "Rank is required.";
      isValid = false;
    }

    if (!newUser.mobileNo.trim() || !/^\d{10}$/.test(newUser.mobileNo)) {
      newErrors.mobileNo = "Valid 10-digit Mobile No. is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await registerUser({ newUser });
        handleClose();
      } catch (error) {
        console.error("Error registering user:", error);
      }
    }
  };

  const handleReset = () => {
    setNewUser({
      fullName: "",
      policeStation: "",
      mobileNo: "",
      zone: "",
      email: "",
      location: "",
      rank: "",
      dateOfBirth: null,
    });
  };

  return (
    <Backdrop open={open} sx={backdropStyles}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-user-modal-title"
        aria-describedby="add-user-modal-description"
        sx={modalStyles}
      >
        <Box sx={boxStyles}>
          <Box sx={headerStyles}>
            <Typography
              id="add-user-modal-title"
              variant="h6"
              component="h2"
              sx={titleStyles}
            >
              Add User
            </Typography>
            <img
              src={CloseIcon}
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </Box>
          <Grid2 container spacing={2} sx={{ justifyContent: "space-evenly" }}>
            <Grid2 size={5}>
              <Typography variant="body1" sx={labelStyles}>
                Full Name
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Full Name"
                value={newUser.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                error={!!errors.fullName}
                helperText={errors.fullName}
                sx={textFieldStyles}
              />
            </Grid2>
            <Grid2 size={5}>
              <Typography variant="body1" sx={labelStyles}>
                Police Station
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Police Station"
                value={newUser.policeStation}
                onChange={(e) => handleChange("policeStation", e.target.value)}
                sx={textFieldStyles}
              />
            </Grid2>
            <Grid2 size={5}>
              <Typography variant="body1" sx={labelStyles}>
                Mobile No.
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Mobile No."
                value={newUser.mobileNo}
                onChange={(e) => handleChange("mobileNo", e.target.value)}
                error={!!errors.mobileNo}
                helperText={errors.mobileNo}
                sx={textFieldStyles}
              />
            </Grid2>
            <Grid2 size={5}>
              <Typography variant="body1" sx={labelStyles}>
                Zone
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Zone"
                value={newUser.zone}
                onChange={(e) => handleChange("zone", e.target.value)}
                sx={textFieldStyles}
              />
            </Grid2>
            <Grid2 size={5}>
              <Typography variant="body1" sx={labelStyles}>
                Email
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Email"
                value={newUser.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                sx={textFieldStyles}
              />
            </Grid2>
            <Grid2 size={5}>
              <Typography variant="body1" sx={labelStyles}>
                Location
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Location"
                value={newUser.location}
                onChange={(e) => handleChange("location", e.target.value)}
                sx={textFieldStyles}
              />
            </Grid2>
            <Grid2 size={5}>
              <Typography variant="body1" sx={labelStyles}>
                Rank
              </Typography>
              <TextField
                select
                fullWidth
                placeholder="Select Role"
                value={newUser.rank}
                onChange={(e) => handleChange("rank", e.target.value)}
                error={!!errors.rank}
                helperText={errors.rank}
                sx={textFieldStyles}
              >
                {roles && roles.map((role) => (
                  <MenuItem key={role.roleId} value={role.roleName}>
                    {role.roleName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 size={5}>
              <Typography variant="body1" sx={labelStyles}>
                Date of Birth
              </Typography>
              <TextField
                fullWidth
                type="date"
                value={
                  newUser.dateOfBirth
                    ? newUser.dateOfBirth.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleChange(
                    "dateOfBirth",
                    e.target.value ? new Date(e.target.value) : null
                  )
                }
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
                sx={textFieldStyles}
              />
            </Grid2>
          </Grid2>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            sx={{ height: "47px", mt: "auto" }}
          >
            <Button
              variant="outlined"
              sx={resetButtonStyles}
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              sx={submitButtonStyles}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Backdrop>
  );
};

export default CreateUserModal;

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
  height: "75%",
};

const headerStyles: SxProps = {
  // flexGrow: 1,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 4,
};

const titleStyles: SxProps = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "30px",
};

const labelStyles: SxProps = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "20px",
};

const textFieldStyles: SxProps = {
  bgcolor: GRAY.light,
  "& .MuiOutlinedInput-root": {
    borderRadius: "11px",
    fontFamily: "Poppins, sans-serif",
    "& fieldset": {
      borderColor: "transparent",
    },
  },
  borderRadius: "11px",
};

const resetButtonStyles: SxProps = {
  color: BLUE.dark,
  borderColor: BLUE.dark,
  borderRadius: "9px",
  mr: 2,
  width: "96px",
};

const submitButtonStyles: SxProps = {
  bgcolor: BLUE.dark,
  borderRadius: "9px",
  width: "96px",
};
