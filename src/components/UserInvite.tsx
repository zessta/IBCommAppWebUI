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
import useRoles from "../hooks/useRoles";
import { inviteUser } from "../api/requests/inviteUser";

const UserInvite = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [badgeId, setBadgeId] = useState("");
  const [role, setRole] = useState("");
  const {roles} = useRoles();

  const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const response = await inviteUser({name, email, role, badgeId});
    console.log(response);
    setEmail("");
    setName("");
    setBadgeId("");
    setRole("");
  };

  return (
    <Box
      sx={{
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
            {roles.map(({ id, role }) => (
              <MenuItem key={id} value={role}>
                {role}
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
