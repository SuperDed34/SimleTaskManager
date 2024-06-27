import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import CircleIcon from '@mui/icons-material/Circle';
import { Box } from '@mui/material';
import { colors } from '../colors';
import { deleteTaskHandler } from '../../services/DBService';

const TasksTable = ({ tasks, loading, onLoading, onUpdated }) => {
  useEffect(() => {
    onUpdated(false)
  }, [loading])

  const tableHeaders = [
    { field: 'title', headerName: 'TITLE', flex: 4, editable: true },
    {
      field: 'priority',
      headerName: 'PRIORITY',
      flex: 2,
      editable: true,
      renderCell: (params) => (
        <Box sx={{ height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
          {<WhatshotIcon sx={params.row.priority.icon.props.sx } />}
          {params.row.priority.label}
        </Box>
      ),
    },
    { field: 'createdDate', headerName: "CREATED DATE", flex: 2, editable: false },
    { field: 'dueDate', headerName: 'END DATE', flex: 2, editable: true },
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 2,
      editable: true,
      renderCell: (params) => (
        <Box sx={{ height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
          {<CircleIcon sx={params.row.status.icon.props.sx } />}
          {params.row.status.label}
        </Box>
      ),
    },
    {
      field: 'edit',
      headerName: 'EDIT',
      flex: 1,
      renderCell: (params) => (
        <SmallButton
          mode='edit'
          onClick={() => console.log(params)}
        />
      ),
    },
    {
      field: 'delete',
      headerName: 'DELETE',
      flex: 1,
      renderCell: (params) => (
        <SmallButton
          mode='delete'
          onClick={() => deleteTaskHandler(params.id, onUpdated, onLoading)}
        />
      ),
    },
  ]

  return (
    <DataGrid
      loading={loading}
      sx={{
        height: '82vh',
        bgcolor: colors.componentBg,
        '.MuiDataGrid-columnHeader': {
          bgcolor: colors.componentBg,
        },
      }}
      rows={tasks}
      columns={tableHeaders}
      getRowId={(row) => row._id}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 15,
          },
        },
      }}
      rowHeight={35}
      pageSizeOptions={[15]}
      checkboxSelection
      disableRowSelectionOnClick
      hideFooterSelectedRowCount
    />
  );
};

export default TasksTable;

const SmallButton = ({ onClick, mode }) => {
  return (
    <IconButton
      sx={{
        color: mode === 'delete' ? 'red' : 'green',
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
      }}
      onClick={onClick}
    >
      {mode === 'delete' ? <DeleteIcon /> : <EditIcon />}
    </IconButton>
  );
};
