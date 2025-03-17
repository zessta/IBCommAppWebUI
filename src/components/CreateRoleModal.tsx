import React, { useState } from "react";
import { Modal, Box, Typography, Backdrop, TextField, Button, SxProps, Theme } from "@mui/material";
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
    <Backdrop open={open} sx={backdropStyles}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-role-modal-title"
        aria-describedby="add-role-modal-description"
        sx={modalStyles}
      >
        <Box sx={boxStyles}>
          <Box sx={headerStyles}>
            <Typography id="add-role-modal-title" variant="h6" component="h2" sx={titleStyles}>
              Add Role
            </Typography>
            <img src={CloseIcon} onClick={handleClose} style={{ cursor: "pointer" }} />
          </Box>
          <Typography id="add-role-modal-description" variant="body1" sx={labelStyles}>
            Role Title
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter Role Title"
            value={roleTitle}
            onChange={(e) => setRoleTitle(e.target.value)}
            disabled
            sx={textFieldStyles}
          />
          <Typography id="add-role-modal-description" variant="body1" sx={labelStyles}>
            Role Description
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={6}
            placeholder="Enter Role Description"
            value={roleDescription}
            onChange={(e) => setRoleDescription(e.target.value)}
            disabled
            sx={textFieldStyles}
          />
          <Box sx={footerStyles}>
            <Button variant="contained" disabled sx={buttonStyles} onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
          <Typography variant="body2" sx={noteStyles}>
            Note: This feature is not enabled.
          </Typography>
        </Box>
      </Modal>
    </Backdrop>
  );
};

export default CreateRoleModal;

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
  flexGrow: 1,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 2,
};

const titleStyles: SxProps = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "30px",
};

const labelStyles: SxProps = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "20px",
  my: 2,
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

const footerStyles: SxProps = {
  display: "flex",
  justifyContent: "flex-end",
  height: "47px",
  mt: 2,
};

const buttonStyles: SxProps = {
  bgcolor: VIOLET.dark,
  borderRadius: "9px",
  width: "96px",
};

const noteStyles: SxProps = {
  my: 2,
  textAlign: "center",
  color: "red",
};
