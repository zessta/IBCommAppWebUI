/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import EventTagsList from "../components/EventTagsList";
import { getEventTags } from "../api/requests/events";
import { GRAY, VIOLET, WHITE } from "../utils/constants";
import SearchIcon from "../assets/SearchIcon.svg";
import AddIcon from "@mui/icons-material/Add";
import CreateTagModal from "../components/CreateTagModal";

const EventTag = () => {
  const [tags, setTags] = useState<any>([]);
  const [currentTag, setCurrentTag] = useState<any>(null);
  const [showCreateTag, setShowCreateTag] = useState(false);

  const handleCloseTagCreation = () => {
    setShowCreateTag(false);
    fetchEventTags();
  }

  const fetchEventTags = async () => {
    const response = await getEventTags();
    if (response.status === 200) {
      console.log(response.data);
      setTags(response.data);
    }
  };

  useEffect(() => {
    fetchEventTags();
  }, []);
  return (
    <Box sx={{ flexGrow: 1, bgcolor: WHITE.main, borderRadius:"18px"}}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
        p={1}
      >
        <TextField
          placeholder="Search Tag list"
          sx={{
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
          }}
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
          sx={{
            bgcolor: VIOLET.dark,
            height: 40,
            borderRadius: "11px",
            p: 1,
            px: 2,
          }}
          onClick={() => setShowCreateTag(true)}
        >
          <AddIcon sx={{ mr: 1 }} /> Create Tag
        </Button>
      </Box>
      <EventTagsList tags={tags} setCurrentTag={setCurrentTag} />
      {
        showCreateTag && <CreateTagModal open={showCreateTag} handleClose={handleCloseTagCreation} />
      }
    </Box>
  );
};

export default EventTag;
