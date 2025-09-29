import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Weekly = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

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

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const daysOfWeekShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Sample time data
  const timeData = {
    '2025-9-29': '8h 0m 0s',
    '2025-9-30': '7h 30m 0s',
    '2025-10-1': '6h 45m 0s',
    '2025-10-2': '5h 15m 0s',
    '2025-10-3': '4h 30m 0s',
    '2025-10-4': '3h 20m 0s',
    '2025-10-5': '2h 15m 0s'
  }

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)

    const weekDays: Array<{
      date: number
      month: number
      year: number
      fullDate: Date
      dayName: string
      dayNameShort: string
    }> = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      weekDays.push({
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        fullDate: date,
        dayName: daysOfWeek[date.getDay()],
        dayNameShort: daysOfWeekShort[date.getDay()]
      })
    }
    return weekDays
  }

  const getTimeForDay = (day) => {
    const key = `${day.year}-${day.month + 1}-${day.date}`
    return timeData[key] || ''
  }

  const prevWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const nextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const isCurrentOrFutureWeek = () => {
    const now = new Date()
    const endOfWeek = new Date(currentDate)
    endOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 6)
    endOfWeek.setHours(23, 59, 59, 999)
    return endOfWeek >= now
  }

  const getWeekRange = () => {
    const weekDays = getWeekDays()
    const start = weekDays[0]
    const end = weekDays[6]

    if (start.month === end.month) {
      return `${monthNames[start.month]} ${start.date}-${end.date}, ${start.year}`
    } else if (start.year === end.year) {
      return `${monthNames[start.month]} ${start.date} - ${monthNames[end.month]} ${end.date}, ${start.year}`
    } else {
      return `${monthNames[start.month]} ${start.date}, ${start.year} - ${monthNames[end.month]} ${end.date}, ${end.year}`
    }
  }

  const isToday = (day) => {
    const today = new Date()
    return (
      day.date === today.getDate() &&
      day.month === today.getMonth() &&
      day.year === today.getFullYear()
    )
  }

  const weekDays = getWeekDays()
  return (
    <div className="flex flex-col w-full h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <button
          onClick={prevWeek}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Previous week"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        <h2 className="text-xl font-semibold text-gray-800">{getWeekRange()}</h2>

        <button
          onClick={nextWeek}
          disabled={isCurrentOrFutureWeek()}
          className={`p-2 rounded-lg transition-colors ${
            isCurrentOrFutureWeek() ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'
          }`}
          aria-label="Next week"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto">
        {/* Desktop View */}
        <div className="hidden lg:block h-full">
          <div className="grid grid-cols-7 border-b border-gray-200">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`p-3 text-center border-r border-gray-200 last:border-r ${
                  isToday(day) ? 'bg-blue-50' : ''
                }`}
              >
                <div className="text-sm font-medium text-gray-500">{day.dayName}</div>
                <div
                  className={`text-2xl font-bold mt-1 ${
                    isToday(day) ? 'text-blue-600' : 'text-gray-900'
                  }`}
                >
                  {day.date}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 flex-1" style={{ minHeight: 'calc(100% - 200px)' }}>
            {weekDays.map((day, index) => {
              const time = getTimeForDay(day)
              return (
                <div
                  key={index}
                  className={`border-r border-b border-gray-200 last:border-r p-4 min-h-[400px] ${
                    isToday(day) ? 'bg-blue-50' : 'bg-white'
                  }`}
                >
                  {time && (
                    <div className="bg-blue-100 text-blue-700 text-sm p-2 rounded">{time}</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Tablet View */}
        <div className="hidden md:block lg:hidden h-full">
          <div className="grid grid-cols-7 border-b border-gray-200">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`p-2 text-center border-r border-gray-200 last:border-r ${
                  isToday(day) ? 'bg-blue-50' : ''
                }`}
              >
                <div className="text-xs font-medium text-gray-500">{day.dayNameShort}</div>
                <div
                  className={`text-lg font-bold mt-1 ${
                    isToday(day) ? 'text-blue-600' : 'text-gray-900'
                  }`}
                >
                  {day.date}
                </div>
              </div>
            ))}
          </div>

          <div
            className="grid grid-cols-7 auto-rows-fr overflow-y-auto"
            style={{ height: 'calc(100vh - 180px)' }}
          >
            {weekDays.map((day, index) => {
              const time = getTimeForDay(day)
              return (
                <div
                  key={index}
                  className={`border-r border-b border-gray-200 last:border-r p-2 min-h-[300px] ${
                    isToday(day) ? 'bg-blue-50' : 'bg-white'
                  }`}
                >
                  {time && (
                    <div className="bg-blue-100 text-blue-700 text-xs p-1.5 rounded">{time}</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <div className="divide-y divide-gray-200">
            {weekDays.map((day, index) => {
              const time = getTimeForDay(day)

              return (
                <div key={index} className={`p-4 ${isToday(day) ? 'bg-blue-50' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`text-3xl font-bold ${
                          isToday(day) ? 'text-blue-600' : 'text-gray-900'
                        }`}
                      >
                        {day.date}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{day.dayName}</div>
                        <div className="text-xs text-gray-500">
                          {monthNames[day.month]} {day.year}
                        </div>
                      </div>
                    </div>
                    {isToday(day) && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        Today
                      </span>
                    )}
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

export default Weekly
