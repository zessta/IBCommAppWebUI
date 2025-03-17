/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Modal, Box, Typography, Backdrop, TextField, Button, Grid2, MenuItem } from "@mui/material";
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

    console.log(newUser)

    try {
      const response = await registerUser({newUser});
      console.log('User registered successfully:', response.data);
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
    <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: "blur(5px)" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-user-modal-title"
        aria-describedby="add-user-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins, sans-serif" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", bgcolor: "background.paper", p: 4, borderRadius: "24px", boxShadow: 24, width: "50%", height: "75%" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Typography id="add-user-modal-title" variant="h6" component="h2" sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "30px",
              }}>
                Add User
              </Typography>
              <img src={CloseIcon} onClick={handleClose} style={{ cursor: "pointer" }} />
            </Box>
            <Grid2 container spacing={2} sx={{ justifyContent: "space-evenly" }}>
              <Grid2 size={5}>
                <Typography variant="body1" sx={{ fontFamily: "Poppins, sans-serif", fontSize: "20px" }}>
                  Full Name
                </Typography>
                <TextField fullWidth placeholder="Enter Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)}
                  sx={{
                    bgcolor: GRAY.light,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "11px",
                      fontFamily: "Poppins, sans-serif",
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                    },
                    borderRadius: "11px",
                  }}
                />
              </Grid2>
              <Grid2 size={5}>
                <Typography variant="body1" sx={{ fontFamily: "Poppins, sans-serif", fontSize: "20px" }}>
                  Police Station
                </Typography>
                <TextField fullWidth placeholder="Enter Police Station" value={policeStation} onChange={(e) => setPoliceStation(e.target.value)}
                  sx={{
                    bgcolor: GRAY.light,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "11px",
                      fontFamily: "Poppins, sans-serif",
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                    },
                    borderRadius: "11px",
                  }}
                />
              </Grid2>
              <Grid2 size={5}>
                <Typography variant="body1" sx={{ fontFamily: "Poppins, sans-serif", fontSize: "20px" }}>
                  Mobile No.
                </Typography>
                <TextField fullWidth placeholder="Enter Mobile No." value={mobileNo} onChange={(e) => setMobileNo(e.target.value)}
                  sx={{
                    bgcolor: GRAY.light,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "11px",
                      fontFamily: "Poppins, sans-serif",
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                    },
                    borderRadius: "11px",
                  }}
                />
              </Grid2>
              <Grid2 size={5}>
                <Typography variant="body1" sx={{ fontFamily: "Poppins, sans-serif", fontSize: "20px" }}>
                  Zone
                </Typography>
                <TextField fullWidth placeholder="Enter Zone" value={zone} onChange={(e) => setZone(e.target.value)}
                  sx={{
                    bgcolor: GRAY.light,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "11px",
                      fontFamily: "Poppins, sans-serif",
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                    },
                    borderRadius: "11px",
                  }}
                />
              </Grid2>
              <Grid2 size={5}>
                <Typography variant="body1" sx={{ fontFamily: "Poppins, sans-serif", fontSize: "20px" }}>
                  Email
                </Typography>
                <TextField fullWidth placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    bgcolor: GRAY.light,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "11px",
                      fontFamily: "Poppins, sans-serif",
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                    },
                    borderRadius: "11px",
                  }}
                />
              </Grid2>
              <Grid2 size={5}>
                <Typography variant="body1" sx={{ fontFamily: "Poppins, sans-serif", fontSize: "20px" }}>
                  Location
                </Typography>
                <TextField fullWidth placeholder="Enter Location" value={location} onChange={(e) => setLocation(e.target.value)}
                  sx={{
                    bgcolor: GRAY.light,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "11px",
                      fontFamily: "Poppins, sans-serif",
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                    },
                    borderRadius: "11px",
                  }}
                />
              </Grid2>
              <Grid2 size={5}>
                <Typography variant="body1" sx={{ fontFamily: "Poppins, sans-serif", fontSize: "20px" }}>
                  Rank
                </Typography>
                <TextField
                  select
                  fullWidth
                  placeholder="Select Role"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  sx={{
                    bgcolor: GRAY.light,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "11px",
                      fontFamily: "Poppins, sans-serif",
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                    },
                    borderRadius: "11px",
                  }}
                >
                  {roles.map((role) => (
                    <MenuItem key={role.roleId} value={role.roleName}>
                      {role.roleName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>
              <Grid2 size={5}>
                <Typography variant="body1" sx={{ fontFamily: "Poppins, sans-serif", fontSize: "20px" }}>
                  Date of Birth
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  value={dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : ''}
                  onChange={(e) => setDateOfBirth(e.target.value ? new Date(e.target.value) : null)}
                  sx={{
                    bgcolor: GRAY.light,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "11px",
                      fontFamily: "Poppins, sans-serif",
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                    },
                    borderRadius: "11px",
                  }}
                />
              </Grid2>
            </Grid2>
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"} sx={{ height: "47px", mt: 2 }}>
            <Button variant="outlined" sx={{ color: VIOLET.dark, borderColor: VIOLET.dark, borderRadius: "9px", mr: 2, width: "96px" }} onClick={handleReset}>Reset</Button>
            <Button variant="contained" sx={{ bgcolor: VIOLET.dark, borderRadius: "9px", width: "96px" }} onClick={handleSubmit}>Submit</Button>
          </Box>
        </Box>
      </Modal>
    </Backdrop>
  );
};

export default CreateUserModal;
