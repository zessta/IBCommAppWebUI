/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Card, MenuItem, Stack, SxProps } from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { GRAY, VIOLET, WHITE } from "../utils/constants";
import ActiveIcon from "../assets/ActiveIcon.svg";
import EditIcon from "../assets/EditIcon.svg";
import PieIcon from "../assets/PieIcon.svg";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: VIOLET.light,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: WHITE.light,
  fontSize: "15.61px",
  borderRadius: "7.78px"
}));

const EventTagsList = ({ tags, setCurrentTag }: { tags: any, setCurrentTag: any }) => {
  return (
    <Box sx={outerBoxStyles}>
      {tags.map((tag: any) => (
        <Card key={tag.eventTagId} sx={cardStyles}>
          <Box sx={headerBoxStyles}>
            <MenuItem key={tag.eventTagId} value={tag.name} sx={menuItemStyles}>
              {tag.name}<img src={ActiveIcon} style={{ marginLeft: 8 }} />
            </MenuItem>
            <Box sx={iconBoxStyles}>
              <img src={EditIcon} onClick={() => setCurrentTag(tag)} style={{ cursor: "pointer" }} />
              <img src={PieIcon} />
            </Box>
          </Box>
          {tag.statuses.length > 0 && (
            <Box sx={statusBoxStyles}>
              <Stack direction="row" spacing={2} sx={stackStyles} useFlexGap>
                {tag.statuses?.map((status: any) => (
                  <Item key={status.eventTagStatusId}>{status.statusName}</Item>
                ))}
              </Stack>
            </Box>
          )}
        </Card>
      ))}
    </Box>
  );
};

export default EventTagsList;

const outerBoxStyles: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  overflowY: "scroll",
  maxHeight: "80vh",
  "&::-webkit-scrollbar": { display: "none" },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  bgcolor: WHITE.main,
  borderRadius: "25px",
};

const cardStyles: SxProps = {
  width: 'calc(33.33% - 40px)',
  margin: '8px',
  minHeight: "190px",
  bgcolor: GRAY.light,
  borderRadius: "25px",
  p: "12px",
  boxShadow: "none",
};

const headerBoxStyles: SxProps = {
  display: "flex",
  flexDirection: "row",
  gap: 2,
};

const menuItemStyles: SxProps = {
  color: VIOLET.dark,
  fontWeight: 600,
  fontSize: "20px",
  fontFamily: "Poppins, sans-serif",
  cursor: "default",
};

const iconBoxStyles: SxProps = {
  marginLeft: 'auto',
  display: 'flex',
  gap: 1,
  alignItems: "center",
};

const statusBoxStyles: SxProps = {
  mt: 1,
  p: 1,
};

const stackStyles: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  maxHeight: "150px",
  overflowY: "auto",
  "&::-webkit-scrollbar": { display: "none" },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
};
