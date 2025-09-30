import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Generate week days
type Event = {
  time: string
  title: string
  icon: string
  duration: string
  color: string
}

type DayData = {
  day: string
  date: number
  fullDate: Date
  events: Event[]
}

const Schedule: React.FC = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date())

  // Get Saturday of the current week (week starts on Saturday)
  const getSaturday = (date) => {
    const d = new Date(date)
    const day = d.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Calculate days to go back to reach Saturday
    let daysToSubtract
    if (day === 6) {
      daysToSubtract = 0 // Already Saturday
    } else {
      daysToSubtract = day + 1 // Days since last Saturday
    }

    const saturday = new Date(d)
    saturday.setDate(d.getDate() - daysToSubtract)
    return saturday
  }

  // Initialize with current week's Saturday
  useEffect(() => {
    setCurrentWeekStart(getSaturday(new Date()))
  }, [])

  // Format date range string
  const getWeekRange = () => {
    const saturday = new Date(currentWeekStart)
    const friday = new Date(saturday)
    friday.setDate(saturday.getDate() + 6)

    const formatDate = (date) => {
      const months = [
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
      return `${months[date.getMonth()]}, ${date.getDate()} ${date.getFullYear()}`
    }

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return `${days[saturday.getDay()]}, ${formatDate(saturday)} - ${days[friday.getDay()]}, ${formatDate(friday)}`
  }

  // Navigate weeks
  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeekStart)
    newDate.setDate(newDate.getDate() + direction * 7)
    setCurrentWeekStart(newDate)
  }

  // Generate week days
  const getWeekDays = (): DayData[] => {
    const days: DayData[] = []
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart)
      date.setDate(currentWeekStart.getDate() + i)
      days.push({
        day: dayNames[date.getDay()],
        date: date.getDate(),
        fullDate: date,
        events: getEventsForDate(date)
      })
    }
    return days
  }

  // Sample events data - you can replace this with real data
  const getEventsForDate = (date) => {
    // This is sample data - you would fetch real events based on the date
    const dayOfWeek = date.getDay()

    // Sample pattern: events on Sun, Mon, Tue, Wed, Thu
    if (dayOfWeek === 0 || dayOfWeek === 1) {
      // Sun, Mon
      return [
        {
          time: '9:00am-5:00pm',
          title: 'Morning',
          icon: 'sun',
          duration: '07:27:21',
          color: 'bg-blue-50'
        }
      ]
    } else if (dayOfWeek === 2) {
      // Tue
      return [
        {
          time: '9:00am-5:00pm',
          title: 'Morning',
          icon: 'sun',
          duration: '05:12:09',
          color: 'bg-red-50'
        }
      ]
    } else if (dayOfWeek === 3 || dayOfWeek === 4) {
      // Wed, Thu
      return [
        {
          time: '6:00pm-1:00am',
          title: 'Night',
          icon: 'moon',
          duration: dayOfWeek === 3 ? '0:27:39' : '--:--:--',
          color: 'bg-blue-50'
        }
      ]
    }
    return []
  }

  const weekDays = getWeekDays()

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-shrink-0 p-3 sm:p-4 md:p-6">
        <div className="bg-white w-fit rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-sm sm:text-base text-gray-700 font-medium bg-gray-100 px-3 py-2 rounded-md whitespace-nowrap">
                This Week
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => navigateWeek(-1)}
                  className="p-1.5 hover:bg-gray-100 rounded transition"
                  aria-label="Previous week"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => navigateWeek(1)}
                  className="p-1.5 hover:bg-gray-100 rounded transition"
                  aria-label="Next week"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <span className="text-xs sm:text-sm md:text-base text-gray-600 break-words">
              {getWeekRange()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {weekDays.map((dayData, index) => (
            <div
              key={index}
              className={`flex border-b last:border-b-0 border-gray-200 ${
                dayData.events.length > 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <div className="flex-shrink-0 w-16 sm:w-20 md:w-28 lg:w-32 p-2 sm:p-3 md:p-4 border-r border-gray-200 bg-gray-50">
                <div className="flex flex-col gap-0.5 sm:gap-1">
                  <span className="text-xs sm:text-sm text-gray-500">{dayData.day}</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-light text-gray-700">
                    {dayData.date}
                  </span>
                </div>
              </div>

              <div className="flex-1 p-2 sm:p-3 md:p-4 lg:p-6 min-h-[70px] sm:min-h-[80px] md:min-h-[100px]">
                {dayData.events.length > 0 ? (
                  <div className="space-y-2 sm:space-y-3">
                    {dayData.events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className="flex flex-row items-center justify-between gap-2"
                      >
                        <div className="flex flex-col gap-1 sm:gap-2">
                          <div className="text-xs sm:text-sm md:text-base font-medium text-gray-900">
                            {event.time}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
                            <span className="text-sm sm:text-base">
                              {event.icon === 'sun' ? '☀️' : '🌙'}
                            </span>
                            {event.title}
                          </div>
                        </div>
                        <div
                          className={`text-sm sm:text-base md:text-lg font-mono flex-shrink-0 p-2 rounded-b-lg ${event.color} ${
                            event.duration.includes('--')
                              ? 'text-gray-400'
                              : event.color === 'bg-red-50'
                                ? 'text-red-600'
                                : 'text-blue-600'
                          }`}
                        >
                          {event.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Schedule
