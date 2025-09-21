import { Routes, Route } from 'react-router-dom'

import Login from './components/login'
import Dashboard from './components/dashboard'
import Workspace from './components/workspace'
import Timesheet from './components/timesheet'
import MainLayout from './components/mainlayout'
import Schedule from './components/schedule'
import Chat from './components/chat'
import Leave from './components/leave'
import Attendance from './components/attendance'

function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/attendance" element={<Attendance />} />
      </Route>
    </Routes>
  )
}

export default App
