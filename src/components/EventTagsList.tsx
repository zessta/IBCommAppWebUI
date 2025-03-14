/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Button, Card, IconButton, MenuItem, Stack } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,

  }));

const EventTagsList = ({tags, setCurrentTag}:{tags:any, setCurrentTag:any}) => {
    return (
    <Box sx={{overflowY:"scroll", maxHeight:"85vh"}}>
        {tags.map((tag:any) => (
            <Card key={tag.eventTagId} sx={{p:1, m:2}}>
                <Box sx={{display:"flex", flexDirection:"row", gap:2}}>
                    <MenuItem key={tag.eventTagId} value={tag.name}>
                        {tag.name}
                    </MenuItem>
                    <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1, alignItems:"center" }}>
                        <Button variant="contained" size="small" sx={{ minWidth: 'auto', height: '24px', p: '2px 6px' }} color="success">Active</Button>
                        <IconButton onClick={()=>setCurrentTag(tag)}><EditNoteIcon /></IconButton>
                    </Box>
                </Box>
                {
                    tag.statuses.length > 0 && 
                    <Box sx={{mt:1, p:1}} bgcolor="#ededed">
                        <Stack direction="row" spacing={2}>
                            {
                                tag.statuses?.map((status: any) =>
                                    <Item key={status.eventTagStatusId}>{status.statusName}</Item> 
                                )
                            }
                        </Stack>
                    </Box>
                }
            </Card>
        ))}
    </Box>
    );
};

export default EventTagsList;
