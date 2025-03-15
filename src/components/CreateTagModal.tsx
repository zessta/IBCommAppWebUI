import React, { useState } from "react";
import { Modal, Box, Typography, Backdrop, TextField, Button } from "@mui/material";
import CloseIcon from "../assets/CloseIcon.svg";
import { GRAY, VIOLET, WHITE, RED } from "../utils/constants";
import { addEventTag, addTagStatus } from "../api/requests/events";

const CreateTagModal = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
  const [tagName, setTagName] = useState("");
  const [statusFields, setStatusFields] = useState<string[]>([]);

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
    const response = await addEventTag({ name: tagName, description: "" });
    if (response.status === 201) {
        const tagId = response.data.eventTagId;
        await Promise.all(
            statusFields.map(async (status) => {
                await addTagStatus({ eventTagId: tagId, status });
            })
        );
    }
    handleClose();
};

  return (
    <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: "blur(5px)" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-tag-modal-title"
        aria-describedby="create-tag-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins, sans-serif" }}
      >
        <Box sx={{display:"flex", flexDirection:"column", bgcolor: "background.paper", p: 4, borderRadius: "24px", boxShadow: 24, width: "50%", height: "70%" }}>
          <Box sx={{flexGrow:1}}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography id="create-tag-modal-title" variant="h6" component="h2" sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "30px",
            }}>
                Create Tag
            </Typography>
            <img src={CloseIcon} onClick={handleClose} style={{cursor:"pointer"}}/>
          </Box>
            <Typography id="create-tag-modal-description" variant="body1" sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "20px",
            }}>
                Tag Title
            </Typography>

            <TextField fullWidth  placeholder="Enter Tag"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                slotProps={{
                    input:{
                        endAdornment: <Button variant="contained" sx={{bgcolor:VIOLET.dark, width:"138px", height:"48px", borderRadius:"9px", color:WHITE.light}} onClick={handleAddStatusField}>Add Status</Button>
                    }
                }}
                sx={{
                    bgcolor: GRAY.light,
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "11px",
                        "& fieldset": {
                        borderColor: "transparent",
                        },
                    },
                    borderRadius: "11px",
                    my:2
                }}
            />

            <Box sx={{ display:"flex", flexDirection:"column", maxHeight:"200px", overflowY: "auto", "&::-webkit-scrollbar": { display: "none" }, msOverflowStyle: "none", scrollbarWidth: "none" }}>
              {statusFields.map((status, index) => (
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
                          sx={{ bgcolor: RED.main, width: "138px", height: "48px", borderRadius: "9px", color: WHITE.light }}
                          onClick={() => handleRemoveStatusField(index)}
                        >
                          Remove
                        </Button>
                      ),
                    },
                  }}
                  sx={{
                    bgcolor: GRAY.light,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "11px",
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                    },
                    borderRadius: "11px",
                    my: 2,
                  }}
                />
              ))}
            </Box>
          </Box>
            <Box display={"flex"} justifyContent={"flex-end"} sx={{height:"47px", mt:"auto"}}>
                <Button variant="outlined" sx={{color:VIOLET.dark, borderColor:VIOLET.dark, borderRadius:"9px", mr:2, width:"96px"}} onClick={handleReset}>Reset</Button>
                <Button variant="contained" sx={{bgcolor:VIOLET.dark, borderRadius:"9px", width:"96px"}} onClick={handleSubmit}>Submit</Button>
            </Box>
        </Box>
      </Modal>
    </Backdrop>
  );
};

export default CreateTagModal;
