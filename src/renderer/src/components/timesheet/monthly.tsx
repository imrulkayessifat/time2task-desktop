import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Monthly = () => {
  const [currentDate, setCurrentDate] = useState(new Date()) // Current month

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Time data for June 2025
  const timeData = {
    '2025-6-1': '4h 0m 0s',
    '2025-6-2': '2h 30m 0s',
    '2025-6-3': '6h 30m 0s',
    '2025-6-4': '5h 15m 0s',
    '2025-6-5': '8h 0m 0s',
    '2025-6-6': '7h 30m 15s',
    '2025-6-7': '6h 45m 30s',
    '2025-6-8': '5h 15m 45s',
    '2025-6-9': '4h 0m 10s',
    '2025-6-10': '3h 30m 20s',
    '2025-6-11': '2h 55m 5s',
    '2025-6-12': '8h 0m 0s',
    '2025-6-13': '7h 30m 15s',
    '2025-6-14': '6h 45m 30s',
    '2025-6-15': '5h 15m 45s',
    '2025-6-16': '4h 50m 10s',
    '2025-6-17': '3h 20m 25s',
    '2025-6-18': '2h 55m 35s',
    '2025-6-19': '8h 0m 0s',
    '2025-6-20': '7h 45m 0s',
    '2025-6-21': '7h 30m 0s',
    '2025-6-22': '7h 15m 0s',
    '2025-6-23': '7h 0m 0s',
    '2025-6-24': '6h 45m 0s',
    '2025-6-25': '6h 30m 0s',
    '2025-6-26': '8h 0m 0s',
    '2025-6-27': '7h 30m 0s',
    '2025-6-28': '6h 45m 0s',
    '2025-6-29': '5h 20m 0s',
    '2025-6-30': '4h 10m 0s'
  }

  const getCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startingDayOfWeek = firstDay.getDay()
    const daysInMonth = lastDay.getDate()

    const days: (number | null)[] = []

    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(null)
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    // Next month days to complete the grid
    const remainingDays = 35 - days.length
    for (let i = 0; i < remainingDays; i++) {
      days.push(null)
    }

    return days
  }

  const getTimeForDay = (day) => {
    if (!day) return ''
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`
    return timeData[key] || ''
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const days = getCalendarDays()

  const isCurrentOrFutureMonth = () => {
    const now = new Date()
    const current = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const today = new Date(now.getFullYear(), now.getMonth(), 1)
    return current >= today
  }

  return (
    <div className="flex flex-col w-full h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        <h2 className="text-xl font-semibold text-gray-800">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>

        <button
          onClick={nextMonth}
          disabled={isCurrentOrFutureMonth()}
          className={`p-2 rounded-lg transition-colors ${
            isCurrentOrFutureMonth() ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'
          }`}
          aria-label="Next month"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto">
        {/* Desktop View */}
        <div className="hidden lg:block h-full">
          <div className="grid grid-cols-7 border-b border-gray-200">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="p-3 text-sm font-medium text-gray-500 text-center border-r border-gray-200 last:border-r"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 flex-1" style={{ minHeight: 'calc(100% - 200px)' }}>
            {days.map((day, index) => {
              const time = getTimeForDay(day)
              return (
                <div
                  key={index}
                  className="border-r border-b border-gray-200 last:border-r p-2 min-h-[120px] bg-white"
                >
                  {day && (
                    <>
                      <div className="text-sm font-medium text-gray-900 mb-2">{day}</div>
                      {time && (
                        <div className="bg-blue-100 text-blue-700 text-xs p-1.5 rounded inline-block">
                          {time}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Tablet View */}
        <div className="hidden md:block lg:hidden h-full">
          <div className="grid grid-cols-7 border-b border-gray-200">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="p-2 text-xs font-medium text-gray-500 text-center border-r border-gray-200 last:border-r"
              >
                {day}
              </div>
            ))}
          </div>

          <div
            className="grid grid-cols-7 auto-rows-fr overflow-y-auto"
            style={{ height: 'calc(100vh - 180px)' }}
          >
            {days.map((day, index) => {
              const time = getTimeForDay(day)
              return (
                <div
                  key={index}
                  className="border-r border-b border-gray-200 last:border-r p-1.5 min-h-[100px] bg-white"
                >
                  {day && (
                    <>
                      <div className="text-xs font-medium text-gray-900 mb-1">{day}</div>
                      {time && (
                        <div className="bg-blue-100 text-blue-700 text-xs p-1 rounded inline-block">
                          {time}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <div className="divide-y divide-gray-200">
            {days
              .filter((day) => day !== null)
              .map((day) => {
                const time = getTimeForDay(day)
                const dayName =
                  daysOfWeek[
                    new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getDay()
                  ]

                return (
                  <div key={day} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-semibold text-gray-900">{day}</div>
                        <div className="text-sm text-gray-500">{dayName}</div>
                      </div>
                    </div>

                    {time && (
                      <div className="bg-blue-100 text-blue-700 p-3 rounded-lg border-l-4 border-blue-500">
                        <div className="font-medium text-sm">{time}</div>
                      </div>
                    )}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Monthly
