import React, { useEffect, useState, useCallback } from "react";
import { Box, Button, TextField, CircularProgress, SxProps, Typography, IconButton } from "@mui/material";
import { BLUE, GRAY, WHITE } from "../utils/constants";
import SearchIcon from "../assets/SearchIcon.svg";
import AddIcon from "@mui/icons-material/Add";
import CommDataGrid from "../components/CommDataGrid"; // Ensure you have the CommDataGrid component
import { getUsers, getUserMetrics } from "../api/requests/users"; // Import API functions
import { GridColDef } from "@mui/x-data-grid";

// Define User and UserMetrics interfaces
interface User {
  userId: string;
  name: string;
  mobile: string;
  email: string;
  dateOfBirth: string;
  policeStation: string;
  zone: string;
  location: string;
  rank: string;
  position: string;
  region: string;
  status: string;
}

interface UserMetrics {
  userId: string;
  messagesSent?: number;
  groupMessages?: number;
  groupsCreated?: number;
  groupsJoined?: number;
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userMetrics, setUserMetrics] = useState<UserMetrics[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchUser, setSearchUser] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch data from API
  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([fetchUsers(), fetchUserMetrics()]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch users and metrics
  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      if (response.status === 200) {
        const usersWithMappedFields = response.data.map((user: any) => ({
          name: user.fullName, // Mapping `fullName` to `name`
          id: user.userId, // Ensure `id` is set for DataGrid
          mobile: user.mobileNo, // Mapping `mobileNo` to `mobile`
          position: user.position || '', // Ensure `position` is available
          region: user.region || '', // Ensure `region` is available
          status: user.status || '', // Ensure `status` is available
          email: user.email,
          rank: user.rank,
        }));
        setUsers(usersWithMappedFields); // Update users state
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchUserMetrics = async () => {
    try {
      const response = await getUserMetrics();
      setUserMetrics(response.data);
    } catch (error) {
      console.error("Failed to fetch user metrics:", error);
    }
  };

  // Filter users based on search input
  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user?.name?.toLowerCase().includes(searchUser.toLowerCase())
      )
    );
  }, [searchUser, users]);

  // Fetch the data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);


  // Columns for the DataGrid
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      headerClassName: 'custom-header',
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold" sx={{ display: 'contents' }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'position',
      headerName: 'Position',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'mobile',
      headerName: 'Mobile',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'rank',
      headerName: 'Rank',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'region',
      headerName: 'Region',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      headerClassName: 'custom-header',
      renderCell: (params) => (
        <span
          style={{
            backgroundColor: params.value === 'Active' ? '#e0f7fa' : '#ffebee',
            color: params.value === 'Active' ? '#006064' : '#d32f2f',
            padding: '5px 10px',
            borderRadius: '15px',
            fontSize: '12px',
          }}
        >
          {params.value || ''}
        </span>
      ),
    },
    {
      field: 'actions',
      headerName: '',
      flex: 1,
      headerClassName: 'custom-header',
      renderCell: () => (
        <IconButton>
          <span style={{ color: '#64748B', fontSize: '14px' }}>...</span>
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={outerBoxStyles}>
      <Box sx={headerBoxStyles}>
        <TextField
          placeholder="Search Users"
          onChange={(e) => setSearchUser(e.target.value)}
          sx={searchFieldStyles}
          slotProps={{
            input: {
              startAdornment: (
                <img src={SearchIcon} style={{ marginRight: "12px" }} />
              ),
            },
          }}
        />
        <Button variant="contained" sx={addButtonStyles}>
          <AddIcon sx={{ mr: 1 }} /> Add User
        </Button>
      </Box>

      {loading ? (
        <Box sx={loadingBoxStyles}>
          <CircularProgress size={60} thickness={6} />
        </Box>
      ) : null}

      <Box sx={{ height: "100%" }}>
        {/* Conditionally render CommDataGrid only if filteredUsers has data */}
        {filteredUsers.length > 0 ? (
          <CommDataGrid
            title="User Management"
            description="View and manage all users in the system"
            rows={filteredUsers} // Pass filtered users as rows
            columns={columns}
            sx={{ height: "100%", width: "100%" }}
          />
        ) : (
          !loading && (
            <Typography variant="body2" color="textSecondary">
              No users found.
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
};

export default UserManagementPage;

// Styles for the component
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
  bgcolor: BLUE.dark,
  height: 40,
  borderRadius: "11px",
  p: 1,
  px: 2,
};

const loadingBoxStyles: SxProps = {
  display: "flex",
  justifyContent: "center",
  marginTop: "100px",
};
