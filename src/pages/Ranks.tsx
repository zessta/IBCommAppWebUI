import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CommDataGrid from "../components/CommDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Modal, TextField } from "@mui/material";
import { useAlert } from "../context/AlertContext";
import { Menu, MenuItem } from "@mui/material";
import { createRank, getAllRanks } from "../api/requests/ranks";
import { GRAY } from "../utils/constants";
import newStyled from "@emotion/styled";

const Ranks = () => {
  const [open, setOpen] = useState(false);
  const [ranks, setRanks] = useState<any[]>([]); // Initialize with an empty array
  const [rankName, setRankName] = useState("");
  const [error, setError] = useState("");
  const { showAlert } = useAlert();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRank, setSelectedRank] = useState<string | null>(null);
  const [editRowId, setEditRowId] = useState<number | null>(null); // Track the row being edited
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, rank: string, rowId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedRank(rank);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRank(null);
    // setEditRowId(null); // Reset the edit row ID
  };

  const handleEdit = (rowId:any) => {
    console.log("Edit clicked for rank:", selectedRank);
    setEditRowId(rowId); // Set the row ID for editing

    handleMenuClose();
  };

  const handleSaveEdit = async (id: number, newRankName: string) => {
    try {
      // Call API to update the rank name
    //   const response = await createRank(newRankName); // Replace with actual update API
    //   if (response.status === 200) {
        showAlert(`Rank updated successfully! ${id} , ${newRankName}`, "success");
    //     setRanks((prevRanks) =>
    //       prevRanks.map((rank) =>
    //         rank.id === id ? { ...rank, rankName: newRankName } : rank
    //       )
    //     );
    //   } else {
    //     showAlert("Failed to update rank.", "error");
    //   }
    } catch {
      showAlert("An error occurred while updating the rank.", "error");
    } finally {
      setEditRowId(null); // Exit edit mode
    }
  };

  const handleDelete = () => {
    console.log("Delete clicked for rank:", selectedRank);
    handleMenuClose();
  };

  // Columns for the DataGrid
  const columns: GridColDef[] = [
    {
      field: "rankName",
      headerName: "Rank",
      flex: 3,
      headerClassName: "custom-header",
      width: 200,
      editable: true, // Make the column editable
      renderCell: (params) => {
        if (editRowId === params.row.id) {
          return (
            <TextField
              defaultValue={params.value}
              onBlur={(e) => handleSaveEdit(params.row.id, e.target.value)}
              autoFocus
              size="small"
            />
          );
        }
        return params.value;
      },
    },
    {
      field: "count",
      headerName: "Count",
      flex: 1,
      headerClassName: "custom-header",
      renderCell: (params) => (
        <span
          style={{
            backgroundColor: GRAY.moderate,
            color: "#000000",
            padding: "5px 10px",
            borderRadius: "15px",
            fontSize: "12px",
          }}
        >
          {params.value || ""}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "",
      flex: 0.5,
      headerClassName: "custom-header",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(event) => handleMenuOpen(event, params.row.rankName, params.row.id)}
          >
            <span style={{ color: "#64748B", fontSize: "14px", fontWeight: 900 }}>...</span>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={()=>handleEdit(params.row.id)}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setRankName("");
    setError("");
  };

  const handleSave = async () => {
    if (!rankName.trim()) {
      setError("Rank name is required.");
      return;
    }

    try {
      const response = await createRank(rankName);
      if (response.status === 200) {
        showAlert("Rank added successfully!", "success");
        handleClose();
        fetchAllRanks(); // Fetch updated ranks after adding a new rank
      } else {
        showAlert("Failed to add rank.", "error");
      }
    } catch {
      showAlert("An error occurred while adding the rank.", "error");
    }
  };

  const fetchAllRanks = useCallback( async () => {
    try {
      const response = await getAllRanks();
      if (response.status === 200) {
        const updatedRanks = response.data.map((rank: any) => ({
          id: rank.rankId,
          rankName: rank.rankName,
          count: rank.usersCount,
        }));
        setRanks(updatedRanks); // Update the ranks state
      } else {
        showAlert("Failed to fetch ranks.", "error");
      }
    } catch {
      showAlert("An error occurred while fetching ranks.", "error");
    }
  },[ranks]
)
  useEffect(() => {
    fetchAllRanks(); // Initial fetch of ranks
  }, []);


//   console.log(ranks)

  return (
    <Container sx={{ "&.MuiContainer-root":{
        maxWidth:"100%",
        height:"100%",
        bgcolor:"#fff",
        borderRadius:"14px"
    }}}>
        <Box sx={{display:"flex", justifyContent:"space-between", py:"30px", pt:"50px",}}>
            <Typography variant="h5" fontWeight={"bold"} sx={{fontFamily: "Poppins, sans-serif",}}>Rank Management</Typography>
            <Button variant="contained" sx={{bgcolor:"#000000", textTransform:"none", gap:1 }} onClick={handleOpen}><AddOutlinedIcon/> Add Rank</Button>
        </Box>
        <Box sx={{width:"50%", height:"80%"}}>
            <CommDataGrid key={ranks.length} pageSize={7} columns={columns} rows={ranks} title="Rank Master" description="Manage all ranks in the system" sx={{fontFamily: "Poppins, sans-serif",}}/>
        </Box>

        {/* Add Rank Modal */}
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              width: "400px",
              bgcolor: "white",
              p: 4,
              borderRadius: "12px",
              boxShadow: 24,
              mx: "auto",
              mt: "10%",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontFamily: "Poppins, sans-serif" }}>
              Add Rank
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter Rank Name"
              value={rankName}
              onChange={(e) => {
                setRankName(e.target.value);
                setError("");
              }}
              error={!!error}
              helperText={error}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="outlined" color="warning" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSave} sx={{ bgcolor: "#000000" }}>
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
    </Container>
  )
};

export default Ranks;

