import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from "@mui/material";

const roles = [
  {
    id: 1,
    label: "Admin",
    value: "admin",
  },
  {
    id: 2,
    label: "User",
    value: "user",
  },
];

const UserInvite = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [badgeId, setBadgeId] = useState("");
  const [role, setRole] = useState("");

  const handleInvite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add invite logic here
    // console.log("Invited:", email, username, badgeId);

    setEmail("");
    setUsername("");
    setBadgeId("");
    setRole("");
  };

  return (
    <Box
      sx={{
        width: "500px",
        p: 2,
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Invite User
      </Typography>
      <form onSubmit={handleInvite}>
        <TextField
          variant="outlined"
          margin="normal"
          id="username"
          label="User Name"
          name="username"
          required
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          id="badgeId"
          label="Badge Id"
          name="badgeId"
          required
          fullWidth
          value={badgeId}
          onChange={(e) => setBadgeId(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            value={role}
            onChange={(e: SelectChangeEvent) => setRole(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {roles.map(({ id, label, value }) => (
              <MenuItem key={id} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            mt: 2,
          }}
        >
          Invite
        </Button>
      </form>
    </Box>
  );
};

export default UserInvite;
