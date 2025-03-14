/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Box, Button, Card, Container, List, ListItem, ListItemText, TextareaAutosize, TextField, Typography, IconButton } from "@mui/material";
import { styled } from '@mui/system';
import { addEventTag, addTagStatus, getEventTagById } from "../api/requests/events";
import DeleteIcon from '@mui/icons-material/Delete';

const Textarea = styled(TextareaAutosize)(
    () => `
    box-sizing: border-box;
    max-width: 300px;
    font:inherit;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    // color: #C7D0DD;

    border: 1px solid #C7D0DD;

    &:hover {
      border-color:  #434D5B;
    }

    &:focus {
    border: 2px solid #3399FF;
    }

    /* firefox */
    &:focus-visible {
      outline: 0;
    }
  `,
  );

const CreateTag = (props: any) => {
    const [tagName, setTagName] = useState('');
    const [description, setDescription] = useState('');
    const [tagId, setTagId] = useState('');
    const [status, setStatus] = useState('');
    const { currentTag, setCurrentTag, fetchEventTags } = props;

    const handleCreateTag = async () => {
        if (tagName !== "" && description !== "") {
            const response = await addEventTag({name: tagName, description});
            setTagId(response.data.eventTagId);
            const resp = await getEventTagById(response.data.eventTagId);
                if(resp.status === 200){
                    setCurrentTag(resp.data);
                }
        }
    };

    const handleAddStatus = async () => {
        if (status !== "") {
            console.log(tagId)
           const response = await addTagStatus({eventTagId: currentTag?.eventTagId, status});
            if(response.status === 200){
                const response = await getEventTagById(currentTag?.eventTagId);
                if(response.status === 200){
                    setCurrentTag(response.data);
                }
                fetchEventTags();
            }
            setStatus('');
        }
    }

    const handleRemoveStatus = async (statusId: string) => {
        // const response = await removeTagStatus(statusId);
        // if(response.status === 200){
        //     const resp = await getEventTagById(tagId);
        //     if(resp.status === 200){
        //         setCurrentTag(resp.data);
        //     }
        // }

        console.log("Status removed:", statusId);
    }

  return (
    <Container>
      {
        currentTag?
        <Box sx={{ display: "flex", flexDirection:"column", gap: 2, width:300 }}>
            <Button variant="contained" onClick={() => setCurrentTag(null)}>New Tag</Button>
            {currentTag && 
            <Card sx={{padding:1}}>
                <Box bgcolor={"#f0f0f0"} p={1}>
                    <Typography variant="h6">{currentTag.name}</Typography>
                    <Typography variant="caption" color="#434D5B">{currentTag.description}</Typography>
                </Box>
                <Box p={1} mb={1}>
                    <List>
                    {
                        currentTag?.statuses?.map((status: any) => (
                            <ListItem key={status.eventTagStatusId} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                                <ListItemText secondary={`• ${status.statusName}`}/>
                                <IconButton size="small" edge="end" aria-label="delete" onClick={() => handleRemoveStatus(status.eventTagStatusId)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </ListItem>
                        ))
                    }
                    </List>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                    <TextField sx={{width:"auto"}} placeholder="Add new status" size="small" value={status} onChange={(e) => setStatus(e.target.value)} />
                    <Button variant="contained" sx={{width:"fit-content"}} size="small" onClick={handleAddStatus}>Add</Button>
                </Box>
            </Card>
            }   
        </Box>
        :
        <Box sx={{ display: "flex", flexDirection:"column", gap: 2, width:300 }}>
        <TextField value={tagName} onChange={(e)=> setTagName(e.target.value)} placeholder="Tag Name" size={"small"} />
        <Textarea value={description} onChange={(e)=> setDescription(e.target.value)} aria-label="description" minRows={5} placeholder="Description" />
        <Button variant="contained" color="primary" sx={{width:"fit-content"}} size="small" onClick={handleCreateTag}>
          Create
        </Button>
      </Box>
      }
    </Container>
  );
};

export default CreateTag;
