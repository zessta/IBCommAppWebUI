/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "../assets/CloseIcon.svg";
import { BLUE, GRAY } from "../utils/constants";
import { createRank } from "../api/requests/roles";
import useModuleActions from "../hooks/useModuleActions";

interface ModuleAction {
  module: string;
  actions: string[];
}

interface CreateRoleModalProps {
  open: boolean;
  handleClose: () => void;
}

interface SelectedValue {
  module: string;
  actions: string[];
}

interface ErrorState {
  rank: string;
  modules: string;
}

const CreateRoleModal: React.FC<CreateRoleModalProps> = ({
  open,
  handleClose,
}) => {
  const [roleTitle, setRoleTitle] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState<SelectedValue[]>([]);
  const [errors, setErrors] = useState<ErrorState>({ rank: "", modules: "" });
  const { moduleActions }: { moduleActions: ModuleAction[] } = useModuleActions();

  const handleChange = (event: SelectChangeEvent<string[]>, index: number) => {
    const value = event.target.value as string[];
    const selectedActions = value;

    const existingModuleIndex = selectedValues.findIndex(
      (item) => item.module === moduleActions[index].module
    );

    if (selectedActions.length > 0) {
      if (existingModuleIndex !== -1) {
        // Update existing module's actions
        const updatedValues = [...selectedValues];
        updatedValues[existingModuleIndex].actions = selectedActions;
        setSelectedValues(updatedValues);
      } else {
        // Add new module with actions
        setSelectedValues([
          ...selectedValues,
          { module: moduleActions[index].module, actions: selectedActions },
        ]);
      }
    } else if (existingModuleIndex !== -1) {
      // Remove module if no actions are selected
      const updatedValues = [...selectedValues];
      updatedValues.splice(existingModuleIndex, 1);
      setSelectedValues(updatedValues);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ErrorState = { rank: "", modules: "" };
    let isValid = true;

    if (!roleTitle.trim()) {
      newErrors.rank = "Rank is required";
      isValid = false;
    }

    if (selectedValues.length === 0) {
      newErrors.modules = "At least one module must be selected";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      await createRank({ rank: roleTitle, moduleActions: selectedValues });
      handleClose();
    }
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
            <Typography
              id="add-role-modal-title"
              variant="h6"
              component="h2"
              sx={titleStyles}
            >
              Add Rank
            </Typography>
            <img
              src={CloseIcon}
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </Box>
          <Typography variant="body1" sx={labelStyles}>
            Rank
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter Rank"
            value={roleTitle}
            onChange={(e) => setRoleTitle(e.target.value)}
            error={!!errors.rank}
            helperText={errors.rank}
            sx={textFieldStyles}
          />
          <Typography variant="body1" sx={labelStyles}>
            Modules
          </Typography>
          <Box sx={{ maxHeight: "300px", overflowY: "auto" }}>
            {moduleActions &&
              moduleActions.map((module, index) => (
                <Box key={index} sx={moduleBoxStyles}>
                  <Typography variant="body2" sx={moduleLabelStyles}>
                    {module.module}
                  </Typography>
                  <Select
                    multiple
                    value={
                      selectedValues?.find(
                        (item) => item?.module === module.module
                      )?.actions || []
                    }
                    onChange={(event) => handleChange(event, index)}
                    input={<OutlinedInput />}
                    renderValue={(selected) => (
                      <Box sx={chipContainerStyles}>
                        {(selected as string[]).map((value) => (
                          <Chip key={value} label={value} sx={chipStyles} />
                        ))}
                      </Box>
                    )}
                    fullWidth
                    sx={selectStyles}
                  >
                    {module.actions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              ))}
          </Box>
          {errors.modules && (
            <Typography color="error" sx={{ mt: 1 }}>
              {errors.modules}
            </Typography>
          )}
          <Box sx={footerStyles}>
            <Button
              variant="contained"
              sx={buttonStyles}
              onClick={handleSubmit}
            >
              Create
            </Button>
          </Box>
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

const moduleBoxStyles: SxProps = {
  mb: 2,
  display: "flex",
  alignItems: "center",
  gap: 2,
};

const moduleLabelStyles: SxProps = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "16px",
  width: "150px", // Fixed width for alignment
};

const selectStyles: SxProps = {
  bgcolor: GRAY.light,
  borderRadius: "11px",
  mr: 2,
  flexGrow: 1, // Ensures the select box occupies the remaining space
};

const chipContainerStyles: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  gap: 0.5,
};

const chipStyles: SxProps = {
  bgcolor: BLUE.dark,
  color: "white",
};

const footerStyles: SxProps = {
  display: "flex",
  justifyContent: "flex-end",
  height: "47px",
  mt: 2,
};

const buttonStyles: SxProps = {
  bgcolor: BLUE.dark,
  borderRadius: "9px",
  width: "96px",
  textTransform: "none",
};

