import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import 'moment/locale/en-gb'


import TaskDashboard from './pages/Main/TaskDashboard'
import ErrorPage from './pages/Error/ErrorPage'

import './main.css'

const router = createBrowserRouter([
    {
        path: ('/' || '/uncompleted'),
        element: <TaskDashboard mode='main'/>,
        errorElement: <ErrorPage/>
    },
    {
        path: '/completed',
        element: <TaskDashboard mode='completed'/>,
        errorElement: <ErrorPage/>
    },
])

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='en-gb'>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </LocalizationProvider>
)
