/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Modal, Box, Typography, Backdrop, TextField, Button, Grid2, MenuItem, SxProps, Theme } from "@mui/material";
import CloseIcon from "../assets/CloseIcon.svg";
import { GRAY, VIOLET } from "../utils/constants";
import useRoles from "../hooks/useRoles";
import { registerUser } from "../api/requests/users";

const CreateUserModal = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
  const [fullName, setFullName] = useState("");
  const [policeStation, setPoliceStation] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [zone, setZone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [rank, setRank] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const { roles, loading, error } = useRoles();

  const handleSubmit = async () => {
    const newUser:any = {
      fullName,
      policeStation,
      mobileNo,
      zone,
      email,
      location,
      rank,
      dateOfBirth,
    };

    try {
      await registerUser(newUser);
      handleClose();
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleReset = () => {
    setFullName("");
    setPoliceStation("");
    setMobileNo("");
    setZone("");
    setEmail("");
    setLocation("");
    setRank("");
    setDateOfBirth(null);
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
            <Typography id="add-user-modal-title" variant="h6" component="h2" sx={titleStyles}>
              Add User
            </Typography>
            <img src={CloseIcon} onClick={handleClose} style={{ cursor: "pointer" }} />
          </Box>
          <Grid2 container spacing={2} sx={{ justifyContent: "space-evenly" }}>
            <Grid2 size={5}>
              <Typography variant="body1" sx={labelStyles}>
                Full Name
              </Typography>
              <TextField fullWidth placeholder="Enter Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} sx={textFieldStyles} />
            </Grid2>
            <Grid2 size={5}>
              <Typography variant="body1" sx={labelStyles}>
                Police Station
              </Typography>
              <TextField fullWidth placeholder="Enter Police Station" value={policeStation} onChange={(e) => setPoliceStation(e.target.value)} sx={textFieldStyles} />
            </Grid2>
            <Grid2 size={5}>
              <Typography variant="body1" sx={labelStyles}>
                Mobile No.
              </Typography>
              <TextField fullWidth placeholder="Enter Mobile No." value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} sx={textFieldStyles} />
            </Grid2>
            <Grid2 size={5}>
              <Typography variant="body1" sx={labelStyles}>
                Zone
              </Typography>
              <TextField fullWidth placeholder="Enter Zone" value={zone} onChange={(e) => setZone(e.target.value)} sx={textFieldStyles} />
            </Grid2>
            <Grid2 size={5}>
              <Typography variant="body1" sx={labelStyles}>
                Email
              </Typography>
              <TextField fullWidth placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={textFieldStyles} />
            </Grid2>
            <Grid2 size={5}>
              <Typography variant="body1" sx={labelStyles}>
                Location
              </Typography>
              <TextField fullWidth placeholder="Enter Location" value={location} onChange={(e) => setLocation(e.target.value)} sx={textFieldStyles} />
            </Grid2>
            <Grid2 size={5}>
              <Typography variant="body1" sx={labelStyles}>
                Rank
              </Typography>
              <TextField
                select
                fullWidth
                placeholder="Select Role"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                sx={textFieldStyles}
              >
                {roles.map((role) => (
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
                value={dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : ''}
                onChange={(e) => setDateOfBirth(e.target.value ? new Date(e.target.value) : null)}
                sx={textFieldStyles}
              />
            </Grid2>
          </Grid2>
          <Box display={"flex"} justifyContent={"flex-end"} sx={{ height: "47px", mt: 2 }}>
            <Button variant="outlined" sx={resetButtonStyles} onClick={handleReset}>Reset</Button>
            <Button variant="contained" sx={submitButtonStyles} onClick={handleSubmit}>Submit</Button>
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
  flexGrow: 1,
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
  color: VIOLET.dark,
  borderColor: VIOLET.dark,
  borderRadius: "9px",
  mr: 2,
  width: "96px",
};

const submitButtonStyles: SxProps = {
  bgcolor: VIOLET.dark,
  borderRadius: "9px",
  width: "96px",
};
