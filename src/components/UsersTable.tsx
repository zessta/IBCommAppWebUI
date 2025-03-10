import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

type RowData = {
  id: number;
  name: string;
  email: string;
  age: number;
};

const initialData: RowData[] = [
  { id: 1, name: "John Doe", email: "john@gmail.com", age: 25 },
  { id: 2, name: "Alice Smith", email: "alice@gmail.com", age: 30 },
  { id: 3, name: "Bob Johnson", email: "bob@gmail.com", age: 35 },
];

const UsersTable: React.FC = () => {
  const [data, setData] = useState<RowData[]>(initialData);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<RowData | null>(null);

  const handleEdit = (row: RowData) => {
    setEditRowId(row.id);
    setEditedData({ ...row });
  };

  const handleSave = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === editRowId && editedData ? { ...editedData } : item
      )
    );
    setEditRowId(null);
    setEditedData(null);
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditedData(null);
  };

  const handleDelete = (id: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof RowData) => {
    setEditedData((prevData) => ({
      ...prevData!,
      [field]: e.target.value,
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Age</strong></TableCell>
            <TableCell align="center" width={80}><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {/* Name Field */}
              <TableCell>
                {editRowId === row.id ? (
                  <TextField
                    value={editedData?.name}
                    onChange={(e) => handleChange(e, "name")}
                    size="small"
                  />
                ) : (
                  row.name
                )}
              </TableCell>

              {/* Email Field */}
              <TableCell>
                {editRowId === row.id ? (
                  <TextField
                    value={editedData?.email}
                    onChange={(e) => handleChange(e, "email")}
                    size="small"
                  />
                ) : (
                  row.email
                )}
              </TableCell>

              {/* Age Field */}
              <TableCell>
                {editRowId === row.id ? (
                  <TextField
                    value={editedData?.age}
                    onChange={(e) => handleChange(e, "age")}
                    size="small"
                    type="number"
                  />
                ) : (
                  row.age
                )}
              </TableCell>

              {/* Action Buttons */}
              <TableCell align="center" width={80}>
                {editRowId === row.id ? (
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
                    <IconButton color="error" onClick={() => handleDelete(row.id)}>
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
