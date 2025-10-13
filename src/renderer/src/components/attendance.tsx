import React, { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const Attendance: React.FC = () => {
  const [weekOffset, setWeekOffset] = useState(0)
  const [activeView, setActiveView] = useState('table')

  // Get the start of week (Saturday) for a given date
  const getWeekStart = (date, offset = 0) => {
    const d = new Date(date)
    d.setDate(d.getDate() + offset * 7)
    const day = d.getDay()
    const diff = day === 6 ? 0 : (day + 1) % 7 // Saturday = 6
    d.setDate(d.getDate() - diff)
    d.setHours(0, 0, 0, 0)
    return d
  }

  // Get week range based on offset
  const weekRange = useMemo(() => {
    const today = new Date()
    const weekStart = getWeekStart(today, weekOffset)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6) // Saturday to Friday

    const formatDate = (date) => {
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
      return date.toLocaleDateString('en-US', options)
    }

    return {
      start: weekStart,
      end: weekEnd,
      label: `${formatDate(weekStart).replace(',', '')} - ${formatDate(weekEnd).replace(',', '')}`
    }
  }, [weekOffset])

  // Get label for current week
  const getWeekLabel = () => {
    if (weekOffset === 0) return 'This Week'
    if (weekOffset === -1) return 'Last Week'
    if (weekOffset === 1) return 'Next Week'
    return weekOffset > 0 ? `${weekOffset} Weeks Ahead` : `${Math.abs(weekOffset)} Weeks Ago`
  }

  // Generate sample data for the current week
  const attendanceData = useMemo(() => {
    const data: {
      date: string
      checkIn: string
      isLate: boolean
      shift: string
      checkOut: string
      ip: string
    }[] = []
    const start = new Date(weekRange.start)

    for (let i = 0; i < 7; i++) {
      const date = new Date(start)
      date.setDate(start.getDate() + i)

      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
      const formattedDate = date.toLocaleDateString('en-US', options).replace(',', '')

      // Sample data - you can replace this with actual data
      const isLate = Math.random() > 0.6
      const shifts = ['Morning (9:00 AM-5:00 PM)', 'Night (6:00 AM-1:00 AM)']
      const checkOuts = ['7:00 pm', '6:49 am', '6:57 am', '----']

      data.push({
        date: formattedDate,
        checkIn: `10:${10 + Math.floor(Math.random() * 30)} am`,
        isLate: isLate,
        shift: shifts[Math.floor(Math.random() * shifts.length)],
        checkOut: checkOuts[Math.floor(Math.random() * checkOuts.length)],
        ip: '255.255.255.0'
      })
    }

    return data.reverse() // Show most recent first
  }, [weekRange])

  // Generate graph data
  const graphData = useMemo(() => {
    const data: { date: string; checkIn: number; checkOut: number }[] = []
    const start = new Date(weekRange.start)

    for (let i = 0; i < 7; i++) {
      const date = new Date(start)
      date.setDate(start.getDate() + i)

      const shortDate = `${date.toLocaleDateString('en-US', { month: 'short' })} ${date.getDate().toString().padStart(2, '0')}`

      // Generate sample check-in and check-out times (in hours)
      const checkInHour = 8 + Math.random() * 3 // 8-11 hours
      const checkOutHour = 14 + Math.random() * 3 // 14-17 hours

      data.push({
        date: shortDate,
        checkIn: parseFloat(checkInHour.toFixed(1)),
        checkOut: parseFloat(checkOutHour.toFixed(1))
      })
    }

    return data
  }, [weekRange])

  const stats = {
    totalWorkingDays: 24,
    totalPresentDays: 20,
    attendancePercentage: 92
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 min-h-screen">
      <div className="mx-auto">
        {/* Header with View Toggle and Week Navigation */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveView('graph')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeView === 'graph'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Graph
            </button>
            <button
              onClick={() => setActiveView('table')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeView === 'table'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Table
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{getWeekLabel()}</span>
            <button
              onClick={() => setWeekOffset(weekOffset - 1)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setWeekOffset(weekOffset + 1)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium">{weekRange.label}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Total Working Days</p>
            <p className="text-4xl font-bold text-gray-900">{stats.totalWorkingDays}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Total Present Days</p>
            <p className="text-4xl font-bold text-gray-900">{stats.totalPresentDays}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Attendance Percentage</p>
            <p className="text-4xl font-bold text-gray-900">{stats.attendancePercentage}%</p>
          </div>
        </div>

        {/* Graph View */}
        {activeView === 'graph' && (
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={graphData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: '#6b7280', fontSize: 11 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    label={{
                      value: 'Date',
                      position: 'insideBottom',
                      offset: -5,
                      fill: '#6b7280',
                      fontSize: 12
                    }}
                  />
                  <YAxis
                    domain={[0, 24]}
                    ticks={[0, 5, 10, 15, 20, 24]}
                    tick={{ fill: '#6b7280', fontSize: 11 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    label={{
                      value: 'Time',
                      angle: -90,
                      position: 'insideLeft',
                      fill: '#6b7280',
                      fontSize: 12
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '8px 12px'
                    }}
                    formatter={(value) => `${value} hours`}
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" />
                  <Line
                    type="monotone"
                    dataKey="checkIn"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                    name="Check In"
                  />
                  <Line
                    type="monotone"
                    dataKey="checkOut"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 5 }}
                    name="Check Out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeView === 'table' && (
          <>
            {/* Table - Desktop View */}
            <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto overflow-y-auto max-h-[350px]">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                        Check In
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                        Shift
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                        Check Out
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {attendanceData.map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{record.date}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-900">{record.checkIn}</span>
                              <span
                                className={`w-2 h-2 rounded-full ${record.isLate ? 'bg-red-500' : 'bg-green-500'}`}
                              ></span>
                              {record.isLate && (
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                                  Late In
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                />
                              </svg>
                              {record.ip}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{record.shift}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-900">{record.checkOut}</span>
                            {record.checkOut !== '----' && (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                  />
                                </svg>
                                {record.ip}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table - Mobile/Tablet View */}
            <div className="lg:hidden space-y-4 max-h-[300px] overflow-y-auto">
              {attendanceData.map((record, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-medium text-gray-900">{record.date}</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Check In</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900">{record.checkIn}</span>
                        <span
                          className={`w-2 h-2 rounded-full ${record.isLate ? 'bg-red-500' : 'bg-green-500'}`}
                        ></span>
                        {record.isLate && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                            Late In
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                        {record.ip}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Shift</p>
                      <p className="text-sm text-gray-900">{record.shift}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Check Out</p>
                      <div>
                        <span className="text-sm text-gray-900">{record.checkOut}</span>
                        {record.checkOut !== '----' && (
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                              />
                            </svg>
                            {record.ip}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Attendance
