/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Button, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { getEventTags } from "../api/requests/events";

const AddTagStatus = ({ refreshTags }: { refreshTags: boolean }) => {
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState("");
    const statusRef = useRef<HTMLInputElement|null>(null);

    const fetchEventTags = async () => {
        const response = await getEventTags();
        setTags(response.data);
    };

    useEffect(() => {
        fetchEventTags();
    }, [refreshTags]);

  return (
    <Container sx={{gap:2, display:"flex", flexDirection:"column"}}>
      <FormControl sx={{ width: 250 }}>
        <InputLabel size="small" id="demo-simple-select-label">Tags</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedTag}
          onChange={(e: SelectChangeEvent) => setSelectedTag(e.target.value)}
          size="small"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {tags.map(({ eventTagId, name }:any) => (
            <MenuItem key={eventTagId} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <TextField sx={{width:250}} placeholder="Status Name" size="small" inputRef={statusRef} />
        <Button variant="contained" sx={{width:"fit-content"}} size="small">Add Status</Button>
    </Container>
  );
};

export default AddTagStatus;
