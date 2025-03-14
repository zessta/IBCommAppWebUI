import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUsers } from "../api/requests/getUsers";
import useRoles from "../hooks/useRoles";
import { removeUserRole } from "../api/requests/removeUserRole";

type RowData = {
  userId: number;
  role: string
};

const UsersTable: React.FC = () => {
  const [data, setData] = useState<RowData[]>([]);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<RowData | null>(null);

  const {roles} = useRoles();

  const fetchUsers = async()=>{
    const response = await getUsers();
    setData(response.data)
  }

  const handleEdit = (row: RowData) => {
    setEditRowId(row.userId);
    setEditedData({ ...row });
  };

  const handleSave = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.userId === editRowId && editedData ? { ...editedData } : item
      )
    );
    setEditRowId(null);
    setEditedData(null);
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditedData(null);
  };

  const handleDelete = async ({userId, role}:{userId: number, role:string}) => {
    const response = await removeUserRole({userId, role});
    console.log(response)
    await fetchUsers();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement > | SelectChangeEvent, field: keyof RowData) => {
    setEditedData((prevData) => ({
      ...prevData!,
      [field]: e.target.value,
    }));
  };
  
  useEffect(()=>{
    fetchUsers();
  },[])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>User ID</strong></TableCell>
            <TableCell><strong>Role</strong></TableCell>
            <TableCell align="center" width={80}><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.userId}>

              <TableCell width={70}>
                { row.userId }
              </TableCell>
              <TableCell>
                {editRowId === row.userId ? (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      fullWidth
                      value={editedData?.role}
                      onChange={(e: SelectChangeEvent) => handleChange(e, "role")}
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
                  ) : (
                    row.role
                )}
              </TableCell>

              {/* Action Buttons */}
              <TableCell align="center" width={80}>
                {editRowId === row.userId ? (
                  <>
                    <IconButton color="success" onClick={handleSave}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton color="error" onClick={handleCancel}>
                      <CancelIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton color="primary" onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete({userId:row.userId, role:row.role})}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
