import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Backdrop,
  TextField,
  Button,
  SxProps,
  Theme,
} from "@mui/material";
import CloseIcon from "../assets/CloseIcon.svg";
import { GRAY, WHITE, RED, BLUE } from "../utils/constants";
import { addEventTag, addTagStatus } from "../api/requests/events";
import { useAlert } from "../context/AlertContext";

interface CreateTagModalProps {
  open: boolean;
  handleClose: () => void;
}

const CreateTagModal: React.FC<CreateTagModalProps> = ({ open, handleClose }) => {
  const [tagName, setTagName] = useState<string>("");
  const [statusFields, setStatusFields] = useState<string[]>([]);
  const { showAlert } = useAlert();

  const handleAddStatusField = () => {
    setStatusFields([...statusFields, ""]);
  };

  const handleRemoveStatusField = (index: number) => {
    const newStatusFields = [...statusFields];
    newStatusFields.splice(index, 1);
    setStatusFields(newStatusFields);
  };

  const handleReset = () => {
    setTagName("");
    setStatusFields([]);
  };

  const handleSubmit = async () => {
    try{
      const response = await addEventTag({ name: tagName, description: "" });
      if (response.status === 201) {
        const tagId = response.data.eventTagId;
        await Promise.all(
          statusFields.map(async (status) => {
            await addTagStatus({ eventTagId: tagId, status });
          })
        );
      }
    }
    catch{
      showAlert("Unexpected error occured, please try again later", "error");
    }
    finally{
      handleClose();
    }
  };

  return (
    <Backdrop open={open} sx={backdropStyles}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-tag-modal-title"
        aria-describedby="create-tag-modal-description"
        sx={modalStyles}
      >
        <Box sx={boxStyles}>
          <Box sx={headerStyles}>
            <Typography
              id="create-tag-modal-title"
              variant="h6"
              component="h2"
              sx={titleStyles}
            >
              Create Tag
            </Typography>
            <img
              src={CloseIcon}
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </Box>
          <Typography
            id="create-tag-modal-description"
            variant="body1"
            sx={labelStyles}
          >
            Tag Title
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter Tag"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <Button
                    variant="contained"
                    sx={addButtonStyles}
                    onClick={handleAddStatusField}
                  >
                    Add Status
                  </Button>
                ),
              },
            }}
            sx={textFieldStyles}
          />
          <Box sx={statusBoxStyles}>
            {statusFields && statusFields.map((status, index) => (
              <TextField
                key={index}
                fullWidth
                placeholder="Add new status"
                value={status}
                onChange={(e) => {
                  const newStatusFields = [...statusFields];
                  newStatusFields[index] = e.target.value;
                  setStatusFields(newStatusFields);
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <Button
                        variant="contained"
                        sx={removeButtonStyles}
                        onClick={() => handleRemoveStatusField(index)}
                      >
                        Remove
                      </Button>
                    ),
                  },
                }}
                sx={textFieldStyles}
              />
            ))}
          </Box>
          <Box sx={footerStyles}>
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

export default CreateTagModal;

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

const labelStyles: SxProps = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "20px",
  my: 2,
};

const textFieldStyles: SxProps = {
  bgcolor: GRAY.light,
  "& .MuiOutlinedInput-root": {
    borderRadius: "11px",
    "& fieldset": {
      borderColor: "transparent",
    },
  },
  borderRadius: "11px",
  my: 2,
};

const addButtonStyles: SxProps = {
  bgcolor: BLUE.dark,
  width: "138px",
  height: "48px",
  borderRadius: "9px",
  color: WHITE.light,
};

const removeButtonStyles: SxProps = {
  bgcolor: RED.main,
  width: "138px",
  height: "48px",
  borderRadius: "9px",
  color: WHITE.light,
};

const statusBoxStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  maxHeight: "200px",
  overflowY: "auto",
  "&::-webkit-scrollbar": { display: "none" },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
};

const footerStyles: SxProps = {
  display: "flex",
  justifyContent: "flex-end",
  height: "47px",
  mt: "auto",
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
