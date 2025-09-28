import React, { useState } from 'react'

type CalendarTask = {
  id: number
  title: string
  progress: number
  date: number
}

const mockTasks: CalendarTask[] = [
  { id: 1, title: 'Nav Bar UI De...', progress: 100, date: 3 },
  { id: 2, title: 'User Authentica...', progress: 100, date: 3 },
  { id: 3, title: 'UserTesting', progress: 100, date: 5 },
  { id: 4, title: 'Nav Bar FR Dev...', progress: 50, date: 9 },
  { id: 5, title: 'Nav Bar API BR...', progress: 0, date: 11 },
  { id: 6, title: 'Full Website De...', progress: 0, date: 20 }
]

const LastMonth: React.FC = () => {
  const [currentDate] = useState(() => {
    const date = new Date()
    date.setMonth(date.getMonth() - 1)
    return date
  })

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (number | null)[] = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const getTasksForDay = (day: number | null) => {
    if (!day) return []
    return mockTasks.filter((task) => task.date === day)
  }

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500'
    if (progress > 50) return 'bg-blue-500'
    if (progress > 0) return 'bg-blue-500'
    return 'bg-red-500'
  }

  const getProgressBorderColor = (progress: number) => {
    if (progress === 100) return 'border-l-green-500'
    if (progress > 50) return 'border-l-blue-500'
    if (progress > 0) return 'border-l-blue-500'
    return 'border-l-red-500'
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div className="flex flex-col w-full h-full bg-white">
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

          <div className="grid grid-cols-7 flex-1" style={{ height: 'calc(100vh - 200px)' }}>
            {days.map((day, index) => {
              const tasksForDay = getTasksForDay(day)
              return (
                <div
                  key={index}
                  className="border-r border-b border-gray-200 last:border-r p-2 min-h-[120px] bg-white overflow-y-auto"
                >
                  {day && (
                    <>
                      <div className="text-sm font-medium text-gray-900 mb-2">{day}</div>
                      <div className="space-y-1">
                        {tasksForDay.map((task) => (
                          <div
                            key={task.id}
                            className={`text-xs p-1.5 rounded border-l-3 ${getProgressBorderColor(task.progress)} bg-gray-50`}
                          >
                            <div className="font-medium text-gray-700 truncate mb-1">
                              {task.title}
                            </div>
                            <div className="text-right text-gray-600">{task.progress}%</div>
                          </div>
                        ))}
                      </div>
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
              const tasksForDay = getTasksForDay(day)
              return (
                <div
                  key={index}
                  className="border-r border-b border-gray-200 last:border-r p-1.5 min-h-[100px] bg-white"
                >
                  {day && (
                    <>
                      <div className="text-xs font-medium text-gray-900 mb-1">{day}</div>
                      <div className="space-y-1">
                        {tasksForDay.slice(0, 2).map((task) => (
                          <div
                            key={task.id}
                            className={`text-xs p-1 rounded border-l-2 ${getProgressBorderColor(task.progress)} bg-gray-50`}
                          >
                            <div className="font-medium text-gray-700 truncate text-xs">
                              {task.title.substring(0, 8)}...
                            </div>
                            <div className="text-right text-gray-600 text-xs">{task.progress}%</div>
                          </div>
                        ))}
                        {tasksForDay.length > 2 && (
                          <div className="text-xs text-gray-500 text-center">
                            +{tasksForDay.length - 2} more
                          </div>
                        )}
                      </div>
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
                const tasksForDay = getTasksForDay(day)
                const dayName =
                  daysOfWeek[
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day as number
                    ).getDay()
                  ]

                return (
                  <div key={day} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-semibold text-gray-900">{day}</div>
                        <div className="text-sm text-gray-500">{dayName}</div>
                      </div>
                      {tasksForDay.length > 0 && (
                        <div className="text-xs text-gray-500">
                          {tasksForDay.length} task{tasksForDay.length !== 1 ? 's' : ''}
                        </div>
                      )}
                    </div>

                    {tasksForDay.length > 0 && (
                      <div className="space-y-2">
                        {tasksForDay.map((task) => (
                          <div
                            key={task.id}
                            className={`p-3 rounded-lg border-l-4 ${getProgressBorderColor(task.progress)} bg-gray-50`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-gray-700 text-sm">{task.title}</div>
                              <div className="flex items-center gap-2">
                                <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${getProgressColor(task.progress)}`}
                                    style={{ width: `${task.progress}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-600 font-medium">
                                  {task.progress}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
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

export default LastMonth
