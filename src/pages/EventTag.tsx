/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box, Button, TextField, SxProps } from "@mui/material";
import EventTagsList from "../components/EventTagsList";
import { getEventTags } from "../api/requests/events";
import { GRAY, VIOLET, WHITE } from "../utils/constants";
import SearchIcon from "../assets/SearchIcon.svg";
import AddIcon from "@mui/icons-material/Add";
import CreateTagModal from "../components/CreateTagModal";

const EventTag = () => {
  const [tags, setTags] = useState<any[]>([]);
  const [currentTag, setCurrentTag] = useState<any>(null);
  const [showCreateTag, setShowCreateTag] = useState(false);
  const [searchTag, setSearchTag] = useState('');
  const [filteredTags, setFilteredTags] = useState<any[]>([]);

  const handleCloseTagCreation = () => {
    setShowCreateTag(false);
    fetchEventTags();
  }

  const fetchEventTags = async () => {
    const response = await getEventTags();
    if (response.status === 200) {
      setTags(response.data);
    }
  };

  useEffect(() => {
    fetchEventTags();
  }, []);

  useEffect(() => {
    const filtered = tags.filter((tag: any) => tag.name.toLowerCase().includes(searchTag.toLowerCase()));
    setFilteredTags(filtered);
  }, [searchTag, tags]);

  return (
    <Box sx={outerBoxStyles}>
      <Box sx={headerBoxStyles}>
        <TextField
          placeholder="Search Tag list"
          onChange={(e) => setSearchTag(e.target.value)}
          sx={searchFieldStyles}
          slotProps={{
            input: {
              startAdornment: (
                <img src={SearchIcon} style={{ marginRight: "12px" }} />
              ),
            },
          }}
        />
        <Button
          variant="contained"
          sx={addButtonStyles}
          onClick={() => setShowCreateTag(true)}
        >
          <AddIcon sx={{ mr: 1 }} /> Create Tag
        </Button>
      </Box>
      <EventTagsList tags={filteredTags} setCurrentTag={setCurrentTag} />
      {showCreateTag && <CreateTagModal open={showCreateTag} handleClose={handleCloseTagCreation} />}
    </Box>
  );
};

export default EventTag;

const outerBoxStyles: SxProps = {
  flexGrow: 1,
  bgcolor: WHITE.main,
  borderRadius: "18px",
  height: "100%",
};

const headerBoxStyles: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 2,
  p: 1,
};

const searchFieldStyles: SxProps = {
  bgcolor: GRAY.light,
  "& .MuiOutlinedInput-root": {
    borderRadius: "11px",
    "& fieldset": {
      borderColor: "transparent",
    },
  },
  borderRadius: "11px",
  flexGrow: 1,
  mr: 16,
};

const addButtonStyles: SxProps = {
  bgcolor: VIOLET.dark,
  height: 40,
  borderRadius: "11px",
  p: 1,
  px: 2,
};
