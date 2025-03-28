import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridRowParams } from '@mui/x-data-grid';
import { Box, TextField, Button, Typography, IconButton, SxProps, Theme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface CommDataGridProps {
  title?: string;
  description?: string;
  rows: GridRowsProp;
  columns: GridColDef[];
  initialState?: any;
  pageSize?: number;
  onRowClick?: (params: GridRowParams) => void;
  sx?: SxProps<Theme>;
}

const CommDataGrid: React.FC<CommDataGridProps> = ({
  title = 'User Management',
  description = 'View and manage all users in the system',
  rows = [],
  columns = [],
  initialState = {},
  pageSize = 5,
  onRowClick = () => {},
  sx = {},
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredRows, setFilteredRows] = useState<GridRowsProp>(rows);
  const [selectionModel, setSelectionModel] = useState<number[]>([]); // To keep track of the selected row(s)

  // Handle search functionality
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = rows.filter((row) =>
      Object.values(row).some(
        (value) =>
          value && value.toString().toLowerCase().includes(searchValue)
      )
    );
    setFilteredRows(filtered);
  };

  // Handle export functionality
  const handleExport = () => {
    const csvRows: string[] = [];
    const headers = columns.map((col) => col.headerName).join(',');
    csvRows.push(headers);

    filteredRows.forEach((row) => {
      const values = columns.map((col) => row[col.field]).join(',');
      csvRows.push(values);
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `${title.replace(/\s+/g, '_').toLowerCase()}.csv`);
    a.click();
  };

  // Handle row double-click to unselect the row
  const handleRowDoubleClick = () => {
    setSelectionModel([]); // Set selectionModel to an empty array to unselect any row
  };

  return (
    <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
      {/* Header Section */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </Box>

      {/* Toolbar Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search users..."
          value={searchText}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'gray' }} />,
          }}
          sx={{ width: '300px' }}
        />
        <Box>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={handleExport}
            sx={{ mr: 1 }}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => alert('Filter functionality to be implemented')}
          >
            Filter
          </Button>
        </Box>
      </Box>

      {/* DataGrid Section */}
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            ...initialState,
            pagination: { paginationModel: { pageSize } },
          }}
          onRowClick={onRowClick}
          rowSelectionModel={selectionModel} // Use rowSelectionModel prop to control selection
          onRowSelectionModelChange={(newSelection) => setSelectionModel(newSelection as number[])} // Update selectionModel on change
          onRowDoubleClick={handleRowDoubleClick} // Unselect on double click
          disableColumnResize
          disableAutosize
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              fontWeight: '600',
              fontSize: '16px',
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: '600',
            },
            '& .MuiDataGrid-cell': {
              borderLeft: 'none',
              borderRight: 'none',
            },
            '& .MuiDataGrid-columnsContainer': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none',
            },
            ...sx,
          }}
        />
      </Box>
    </Box>
  );
};

export default CommDataGrid;
