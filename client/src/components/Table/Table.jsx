import { useEffect } from 'react'
import moment from 'moment'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import CircleIcon from '@mui/icons-material/Circle'
import { Box } from '@mui/material'
import { colors } from '../colors'
import { deleteTaskHandler } from '../../services/DBService'
import { openTaskForEdit } from '../../services/editTaskService'

const TasksTable = ({ tasks, loading, onLoading, onUpdated, onEdit, setSnackbar }) => {
  useEffect(() => {
    onUpdated(false)
  }, [loading])

  const getRowClassName = (params) => {
    const dueDate = moment(params.row.dueDate, 'DD/MM/YYYY HH:mm')
    const today = moment()
    return dueDate.isSameOrAfter(today)? '' : 'row-overdue'
  }

  const renderPriorityCell = (params) => (
    <Box sx={{ height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
      {<WhatshotIcon sx={{ color: params.row.priority.color }} />}
      {params.row.priority.label}
    </Box>
  )

  const renderStatusCell = (params) => (
    <Box sx={{ height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
      {<CircleIcon sx={{ color: params.row.status === null ? 'white' : params.row.status.color }} />}
      {params.row.status === null ? 'Not started':params.row.status.label}
    </Box>  
  )

  const renderEditButton = (params) => (
    <SmallButton
      mode='edit'
      onClick={() => openTaskForEdit(params.id, onEdit, setSnackbar)}
    />
  )

  const renderDeleteButton = (params) => (
    <SmallButton
      mode='delete'
      onClick={() => deleteTaskHandler(params.id, onUpdated, onLoading, setSnackbar)}
    />
  )

  const tableHeaders = [
    { field: 'title', headerName: 'TITLE', flex: 4, editable: false },
    { field: 'priority', headerName: 'PRIORITY', flex: 2, editable: false, renderCell: renderPriorityCell },
    { field: 'createdDate', headerName: "CREATED DATE", flex: 2, editable: false },
    { field: 'dueDate', headerName: 'END DATE', flex: 2, editable: false },
    { field: 'status', headerName: 'STATUS', flex: 2, editable: true, renderCell: renderStatusCell },
    { field: 'edit', headerName: 'EDIT', flex: 1, renderCell: renderEditButton },
    { field: 'delete', headerName: 'DELETE', flex: 1, renderCell: renderDeleteButton },
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
        '& .row-overdue': {
          bgcolor: 'rgba(255, 0, 0, 0.3)',
        },
      }}
      rows={tasks}
      columns={tableHeaders}
      getRowId={(row) => row._id}
      getRowClassName={getRowClassName}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 15,
          },
        },
      }}
      rowHeight={35}
      pageSizeOptions={[5, 10, 15]}
      checkboxSelection
      disableRowSelectionOnClick
      hideFooterSelectedRowCount
    />
  )
}

export default TasksTable;

const SmallButton = ({ onClick, mode }) => (
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
)
