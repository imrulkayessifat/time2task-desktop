import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, BarChart2, Table, MoreVertical } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts'

import { applyLeave } from './hooks/apply-leave'

interface LeaveData {
  type: string
  total: number
  used: number
  color: 'teal' | 'red'
  bgColor: string
  textColor: string
}

interface CircularProgressProps {
  total: number
  used: number
  color: 'teal' | 'red'
}

const leaveData = [
  {
    id: 1,
    leaveDate: '29 Jan 2025 -03 Feb 2025',
    reason: 'Younger Sister Weeding Ceremony Program...',
    leaveType: 'Casual',
    leaveTypeColor: 'blue',
    status: 'Approved',
    statusColor: 'green'
  },
  {
    id: 2,
    leaveDate: '22 Jan 2025',
    reason: 'Younger Sister Weeding Ceremony Program...',
    leaveType: 'Sick',
    leaveTypeColor: 'red',
    status: 'Requested',
    statusColor: 'blue'
  },
  {
    id: 3,
    leaveDate: '17 Jan 2025 -21 Jan 2025',
    reason: 'Younger Sister Weeding Ceremony Program...',
    leaveType: 'Casual',
    leaveTypeColor: 'blue',
    status: 'Denied',
    statusColor: 'red'
  },
  {
    id: 4,
    leaveDate: '22 Jan 2025',
    reason: 'Younger Sister Weeding Ceremony Program...',
    leaveType: 'Sick',
    leaveTypeColor: 'red',
    status: 'Approved',
    statusColor: 'green'
  }
]

const Leave: React.FC = () => {
  const { onOpen } = applyLeave()
  const [activeView, setActiveView] = useState('table')
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0)

  const data = [
    {
      name: 'Casual',
      used: 3,
      remaining: 7
    },
    {
      name: 'Sick',
      used: 4,
      remaining: 6
    }
  ]

  const colors = {
    casualUsed: '#7DD3FC',
    casualRemaining: '#DBEAFE',
    sickUsed: '#FCA5A5',
    sickRemaining: '#D1D5DB'
  }

  const getCurrentWeek = () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const daysToSaturday = dayOfWeek === 6 ? 0 : dayOfWeek + 1
    const saturday = new Date(today)
    saturday.setDate(today.getDate() - daysToSaturday)
    saturday.setHours(0, 0, 0, 0)
    const friday = new Date(saturday)
    friday.setDate(saturday.getDate() + 6)
    return { saturday, friday }
  }

  const getWeekRange = () => {
    const { saturday } = getCurrentWeek()
    const weekStart = new Date(saturday)
    weekStart.setDate(saturday.getDate() + currentWeekOffset * 7)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    return { weekStart, weekEnd }
  }

  const { weekStart, weekEnd } = getWeekRange()

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }
    return date.toLocaleDateString('en-US', options)
  }

  const formatDateShort = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  const handlePreviousWeek = () => setCurrentWeekOffset(currentWeekOffset - 1)
  const handleNextWeek = () => setCurrentWeekOffset(currentWeekOffset + 1)

  const getWeekLabel = () => {
    if (currentWeekOffset === 0) return 'This Week'
    if (currentWeekOffset === -1) return 'Last Week'
    if (currentWeekOffset === 1) return 'Next Week'
    return currentWeekOffset < 0
      ? `${Math.abs(currentWeekOffset)} Weeks Ago`
      : `In ${currentWeekOffset} Weeks`
  }

  const leaves: LeaveData[] = [
    {
      type: 'Casual Leave',
      total: 12,
      used: 5,
      color: 'teal',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-700'
    },
    {
      type: 'Sick Leave',
      total: 15,
      used: 10,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    }
  ]

  const getStrokeColor = (color: 'teal' | 'red'): string =>
    color === 'teal' ? '#14b8a6' : '#ef4444'

  const CircularProgress: React.FC<CircularProgressProps> = ({ total, used, color }) => {
    const percentage = (used / total) * 100
    const circumference = 2 * Math.PI * 45
    const strokeDashoffset = circumference - (percentage / 100) * circumference
    return (
      <svg className="w-28 sm:w-36 h-28 sm:h-36 transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={getStrokeColor(color)}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
    )
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="m-2 border rounded-md border-gray-300 flex-shrink-0">
        <div className="flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <div className="flex flex-row gap-4 sm:gap-6 mb-8 justify-center">
              {leaves.map((leave, index) => (
                <div
                  key={index}
                  className={`${leave.bgColor} flex-1 min-w-0 max-h-[208px] max-w-[208px] rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-center items-center`}
                >
                  <h3
                    className={`${leave.textColor} text-sm sm:text-base font-medium mb-3 sm:mb-4 text-center`}
                  >
                    {leave.type}
                  </h3>
                  <div className="relative">
                    <CircularProgress total={leave.total} used={leave.used} color={leave.color} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl sm:text-4xl font-bold text-gray-800">
                        {leave.total}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 mt-1">
                        {String(leave.used).padStart(2, '0')} days used
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={onOpen}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg active:scale-95"
              >
                Apply Leave
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-2 flex-1 min-h-0">
        <div className="w-full border border-gray-300 mx-auto rounded-[6px] h-full flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between p-2 border-b gap-4 flex-shrink-0">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveView('graph')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeView === 'graph'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <BarChart2 size={18} />
                <span className="hidden sm:inline">Graph</span>
              </button>
              <button
                onClick={() => setActiveView('table')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeView === 'table'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Table size={18} />
                <span className="hidden sm:inline">Table</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">{getWeekLabel()}</span>
              <div className="flex items-center gap-2">
                <button onClick={handlePreviousWeek} className="p-1 hover:bg-gray-100 rounded">
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <button onClick={handleNextWeek} className="p-1 hover:bg-gray-100 rounded">
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>
              <span className="text-sm text-gray-600 hidden md:inline">
                {formatDate(weekStart)} - {formatDate(weekEnd)}
              </span>
              <span className="text-sm text-gray-600 md:hidden">
                {formatDateShort(weekStart)} - {formatDateShort(weekEnd)}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {activeView === 'table' && (
              <>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-gray-50 z-10">
                      <tr className="border-b">
                        <th className="text-left p-4 text-sm font-medium text-gray-600">
                          Leave Date
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Reason</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-600">
                          Leave Type
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Status</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveData.map((leave) => (
                        <tr key={leave.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="p-4 text-sm text-gray-900">{leave.leaveDate}</td>
                          <td className="p-4 text-sm text-gray-900">{leave.reason}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-900">{leave.leaveType}</span>
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  leave.leaveTypeColor === 'blue' ? 'bg-blue-500' : 'bg-red-500'
                                }`}
                              ></span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  leave.statusColor === 'green'
                                    ? 'bg-green-500'
                                    : leave.statusColor === 'blue'
                                      ? 'bg-blue-500'
                                      : 'bg-red-500'
                                }`}
                              ></span>
                              <span className="text-sm text-gray-900">{leave.status}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <MoreVertical size={20} className="text-gray-600" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="md:hidden divide-y">
                  {leaveData.map((leave) => (
                    <div key={leave.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {leave.leaveDate}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">{leave.reason}</div>
                        </div>
                        <button className="p-1 hover:bg-gray-100 rounded ml-2">
                          <MoreVertical size={20} className="text-gray-600" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Type:</span>
                          <span className="text-sm font-medium text-gray-900">
                            {leave.leaveType}
                          </span>
                          <span
                            className={`w-2 h-2 rounded-full ${
                              leave.leaveTypeColor === 'blue' ? 'bg-blue-500' : 'bg-red-500'
                            }`}
                          ></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              leave.statusColor === 'green'
                                ? 'bg-green-500'
                                : leave.statusColor === 'blue'
                                  ? 'bg-blue-500'
                                  : 'bg-red-500'
                            }`}
                          ></span>
                          <span className="text-sm font-medium text-gray-900">{leave.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeView === 'graph' && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-[6px] px-4 py-[10px]">
                  <h1 className="text-[18px] leading-[100%]">Leave Balance</h1>
                  <p className="font-light text-[12px] text-[#7C7C7C] leading-[100%]">
                    Track your remaining leave days easily
                  </p>
                </div>
                <div className="flex items-center justify-center w-full">
                  <div className="bg-white rounded-lg">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        barGap={8}
                        barCategoryGap="20%"
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#374151', fontSize: 14 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#6B7280', fontSize: 12 }}
                          domain={[0, 10]}
                          ticks={[0, 2, 4, 6, 8, 10]}
                        />

                        {/* Used bars */}
                        <Bar
                          dataKey="used"
                          fill={colors.casualUsed}
                          radius={[8, 8, 0, 0]}
                          barSize={60}
                        >
                          {data.map((_entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={index === 0 ? colors.casualUsed : colors.sickUsed}
                            />
                          ))}
                        </Bar>

                        {/* Remaining bars */}
                        <Bar
                          dataKey="remaining"
                          fill={colors.casualRemaining}
                          radius={[8, 8, 0, 0]}
                          barSize={60}
                        >
                          {data.map((_entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={index === 0 ? colors.casualRemaining : colors.sickRemaining}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>

                    {/* Custom Legend */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 my-6 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: colors.casualUsed }}
                        ></div>
                        <span className="text-sm md:text-base text-gray-700">
                          Casual Leaves Used
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: colors.casualRemaining }}
                        ></div>
                        <span className="text-sm md:text-base text-gray-700">
                          Casual Leaves Remaining
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: colors.sickUsed }}
                        ></div>
                        <span className="text-sm md:text-base text-gray-700">Sick Leaves Used</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: colors.sickRemaining }}
                        ></div>
                        <span className="text-sm md:text-base text-gray-700">
                          Sick Leaves Remaining
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leave
