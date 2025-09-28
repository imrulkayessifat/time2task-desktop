import React from 'react'

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

const LastWeek: React.FC = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getLastWeekDays = () => {
    const today = new Date()
    const currentDayOfWeek = today.getDay() // 0 = Sunday, 1 = Monday, etc.
    const daysToSubtract = currentDayOfWeek + 7 // Go back to last week's Sunday

    const lastWeekSunday = new Date(today)
    lastWeekSunday.setDate(today.getDate() - daysToSubtract)

    const days: { date: Date; dayNumber: number }[] = []

    for (let i = 0; i < 7; i++) {
      const day = new Date(lastWeekSunday)
      day.setDate(lastWeekSunday.getDate() + i)
      days.push({
        date: day,
        dayNumber: day.getDate()
      })
    }

    return days
  }

  const getTasksForDay = (dayNumber: number) => {
    return mockTasks.filter((task) => task.date === dayNumber)
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

  const lastWeekDays = getLastWeekDays()

  return (
    <div className="flex flex-col w-full h-full bg-white">
      <div className="flex-1 overflow-auto">
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

          <div
            className="grid grid-cols-7 flex-1 overflow-y-auto"
            style={{ minHeight: 'calc(100% - 60px)' }}
          >
            {lastWeekDays.map((dayInfo, index) => {
              const tasksForDay = getTasksForDay(dayInfo.dayNumber)
              return (
                <div
                  key={index}
                  className="border-r border-b border-gray-200 last:border-r p-2 min-h-[120px] bg-white"
                >
                  <div className="text-sm font-medium text-gray-900 mb-2">{dayInfo.dayNumber}</div>
                  <div className="space-y-1">
                    {tasksForDay.map((task) => (
                      <div
                        key={task.id}
                        className={`text-xs p-1.5 rounded border-l-3 ${getProgressBorderColor(task.progress)} bg-gray-50`}
                      >
                        <div className="font-medium text-gray-700 truncate mb-1">{task.title}</div>
                        <div className="text-right text-gray-600">{task.progress}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

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

          <div className="grid grid-cols-7 flex-1" style={{ minHeight: 'calc(100% - 48px)' }}>
            {lastWeekDays.map((dayInfo, index) => {
              const tasksForDay = getTasksForDay(dayInfo.dayNumber)
              return (
                <div
                  key={index}
                  className="border-r border-b border-gray-200 last:border-r p-1.5 min-h-[100px] bg-white"
                >
                  <div className="text-xs font-medium text-gray-900 mb-1">{dayInfo.dayNumber}</div>
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
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <div className="divide-y divide-gray-200">
            {lastWeekDays.map((dayInfo) => {
              const tasksForDay = getTasksForDay(dayInfo.dayNumber)
              const dayName = daysOfWeek[dayInfo.date.getDay()]

              return (
                <div key={dayInfo.dayNumber} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-semibold text-gray-900">{dayInfo.dayNumber}</div>
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

export default LastWeek
