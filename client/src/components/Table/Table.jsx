import React, { useEffect, useMemo, useCallback, useState } from 'react'
import moment from 'moment'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import CircleIcon from '@mui/icons-material/Circle'
import { Box } from '@mui/material'
import { colors } from '../colors'
import { openTaskForEdit } from '../../services/editTaskService'
import { filterContent } from '../../services/DBService'
import NoTasks from './slots/NoTasks'

const TasksTable = ({
  tasks,
  loading,
  onUpdated,
  onEdit,
  setChosenCells,
  setSnackbar,
  mode
}) => {

  useEffect(() => {
    onUpdated(false)
  }, [loading, onUpdated])

  const getRowClassName = useCallback((params) => {
    const dueDate = params.row.dueDate ? moment(params.row.dueDate, 'DD/MM/YYYY HH:mm') : '';
    const completeDate = params.row.status.completeDate ? moment(params.row.status.completeDate, 'DD/MM/YYYY HH:mm') : '';
    const today = moment()
    return completeDate !== '' && dueDate
      ? dueDate.isSameOrAfter(completeDate) ? '' : 'row-overdue'
      : !dueDate
        ? ''
        : dueDate.isSameOrAfter(today) ? '' : 'row-overdue';
  }, [])

  const renderPriorityCell = useCallback((params) => (
    <Box sx={{ height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
      <WhatshotIcon sx={{ color: params.row.priority.color }} />
      {params.row.priority.label}
    </Box>
  ), [])

  const renderStatusCell = useCallback((params) => (
    <Box sx={{ height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
      <CircleIcon sx={{ color: params.row.status === null ? 'white' : params.row.status.color }} />
      {params.row.status === null ? 'Not started' : params.row.status.label}
    </Box>
  ), [])

  const renderCompletedDate = useCallback((params) => (
    <>
      {params.row.status.completeDate}
    </>
  ), [])

  const tableHeaders = useMemo(() => [
    { field: 'title', headerName: 'TITLE', flex: 4, editable: false },
    { field: 'priority', headerName: 'PRIORITY', flex: 2, editable: false, renderCell: renderPriorityCell },
    { field: 'createdDate', headerName: "CREATED DATE", flex: 2, editable: false },
    { field: 'dueDate', headerName: 'END DATE', flex: 2, editable: false },
    { field: 'status', headerName: 'STATUS', flex: 2, editable: true, renderCell: renderStatusCell },
  ], [renderPriorityCell, renderStatusCell])

  const tableHeaderCompletedDate = useMemo(() => [
    { field: 'completedDate', headerName: 'COMPLETED AT', flex: 2, renderCell: renderCompletedDate },
  ], [renderCompletedDate])

  const headers = useMemo(() => mode === 'completed'
    ? [...tableHeaders, ...tableHeaderCompletedDate]
    : tableHeaders, [mode, tableHeaders, tableHeaderCompletedDate])

  return (
    <DataGrid
      loading={loading}
      sx={{
        height: '82vh',
        bgcolor: colors.componentBg,
        outline: 'none',
        '.MuiDataGrid-columnHeader': {
          bgcolor: colors.componentBg,
        },
        '& .row-overdue': {
          bgcolor: 'rgba(255, 0, 0, 0.3)',
        },
      }}
      slots={{
        noRowsOverlay: NoTasks,
        toolbar: GridToolbar
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        }
      }}
      rows={mode === 'main' ? filterContent(tasks) : filterContent(tasks, 'Complete' ,'include')}
      columns={headers}
      getRowId={(row) => row._id}
      getRowClassName={getRowClassName}
      onRowClick={(params) => {
        openTaskForEdit(params.id, onEdit, setSnackbar)
      }}
      onRowSelectionModelChange={(model) => {
        setChosenCells(model)
      }}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 15,
          },
        },
      }}
      rowHeight={35}
      pageSizeOptions={[5, 10, 15, 50, 100]}
      checkboxSelection
      disableRowSelectionOnClick
      hideFooterSelectedRowCount
      disableColumnFilter
      disableColumnSelector
      disableColumnMenu
      disableColumnSorting
      autosizeOnMount
    />
  );
};

export default TasksTable
