import React, { useEffect, useState } from "react";
import CommDataGrid from "./CommDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { Box, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { removeRankFromUser } from "../api/requests/ranks";
import { useAlert } from "../context/AlertContext";


const UsersByRankId = (props:any) => {
    const {users, rank, setSelectedRank} = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const [usersByRank, setUsersByRank] = useState([]);
    const {showAlert} = useAlert();
    
    // Columns for the DataGrid
    const columns: GridColDef[] = [
        {
        field: "name",
        headerName: "Name",
        flex: 1.5,
        headerClassName: "custom-header",
        width: 200,
        renderCell: (params) => {
            return params.value;
        },
        },
        {
        field: "policeStation",
        headerName: "Police Station",
        flex: 1,
        headerClassName: "custom-header",
        renderCell: (params) => {return params.value;}
        },
        {
        field: "location",
        headerName: "Location",
        flex: 1,
        headerClassName: "custom-header",
        renderCell: (params) => {return params.value;}
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
                {/* <MenuItem onClick={()=>handleEdit(params.row.id)}>Edit</MenuItem> */}
                <MenuItem onClick={()=>handleDelete(params.row.id)}>Delete</MenuItem>
            </Menu>
            </>
        ),
        },
    ];


    // const handleEdit = (rowId:any) => {
    //     console.log("Edit clicked for rank:", selectedRank);
    //     handleMenuClose();
    // };


    const handleDelete = async (userId:number) => {
        try{
            const response = await removeRankFromUser(userId);
            if(response.status===200){
                showAlert(userId + "deleted successfully", "success")
                // setSelectedRank(null)
            }
        }
        catch{
            showAlert("An error occurred", "error");
        }
        handleMenuClose();
    };
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, rank: string, rowId: number) => {
        setAnchorEl(event.currentTarget);
        setSelectedRank(rank);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRank(null);
        // setEditRowId(null); // Reset the edit row ID
    };

    useEffect(() =>{
        setUsersByRank(users?.map((user:any) => ({id:user.userId, name:user.fullName, policeStation: user.policeStation, location:user.location})));
    }, [users]);

  return (
    <Box sx={{width:"48%", height:"auto"}}>
        <CommDataGrid key={usersByRank.length} pageSize={7} columns={columns} rows={usersByRank} title={`Users with ${rank}`} description="Manage users under this rank" sx={{fontFamily: "Poppins, sans-serif",}}/>
    </Box>
  );
};

export default UsersByRankId;
