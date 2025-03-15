import React, { useState } from "react";
import { Modal, Box, Typography, Backdrop, TextField, Button } from "@mui/material";
import CloseIcon from "../assets/CloseIcon.svg";
import { GRAY, VIOLET } from "../utils/constants";
import { addRole } from "../api/requests/roles";

const CreateRoleModal = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
  const [roleTitle, setRoleTitle] = useState("");
  const [roleDescription, setRoleDescription] = useState("");


  const handleSubmit = async () => {
    await addRole({ name: roleTitle, description: roleDescription });
    handleClose();
  };

  return (
    <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: "blur(5px)" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-role-modal-title"
        aria-describedby="add-role-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins, sans-serif" }}
      >
        <Box sx={{display:"flex", flexDirection:"column", bgcolor: "background.paper", p: 4, borderRadius: "24px", boxShadow: 24, width: "50%", height: "70%" }}>
          <Box sx={{flexGrow:1}}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography id="add-role-modal-title" variant="h6" component="h2" sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "30px",
            }}>
                Add Role
            </Typography>
            <img src={CloseIcon} onClick={handleClose} style={{cursor:"pointer"}}/>
          </Box>
            <Typography id="add-role-modal-description" variant="body1" sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "20px",
            }}>
                Role Title
            </Typography>

            <TextField fullWidth  placeholder="Enter Role Title"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
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
                    my:2
                }}
            />

            <Typography id="add-role-modal-description" variant="body1" sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "20px",
            }}>
                Role Description
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={6}
              placeholder="Enter Role Description"
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
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
                my: 2,
              }}
            />
          </Box>
            <Box display={"flex"} justifyContent={"flex-end"} sx={{height:"47px", mt:"auto"}}>
                <Button variant="contained" sx={{bgcolor:VIOLET.dark, borderRadius:"9px", width:"96px"}} onClick={handleSubmit}>Submit</Button>
            </Box>
        </Box>
      </Modal>
    </Backdrop>
  );
};

export default CreateRoleModal;
