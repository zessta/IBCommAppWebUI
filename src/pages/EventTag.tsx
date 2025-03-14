/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateTag from "../components/CreateTag";
import EventTagsList from "../components/EventTagsList";
import { getEventTags } from "../api/requests/events";
// import AddTagStatus from "../components/AddTagStatus";

const EventTag = () => {
    const [tags, setTags] = useState<any>([]);
    const [currentTag, setCurrentTag] = useState<any>(null);

    const fetchEventTags = async () => {
        const response = await getEventTags();
        if(response.status === 200){
            console.log(response.data);
            setTags(response.data);
        }
    }
    
    useEffect(() => {
        fetchEventTags();
    },[]);
  return (
    <Box>
      {/* <Typography variant="h5" mb={2} ml={2}>Event Tags</Typography> */}
      <Grid2 container spacing={2} sx={{display:"flex", p:2, justifyContent:"space-between"}}>
        <Grid2 size={4}>
            <CreateTag currentTag={currentTag} setCurrentTag={setCurrentTag} fetchEventTags={fetchEventTags}/>
        </Grid2>
        <Grid2 size={6}>
            <EventTagsList tags={tags} setCurrentTag={setCurrentTag}/>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default EventTag;
