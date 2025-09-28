import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select'
import Today from './calendar/today'
import Yesterday from './calendar/yesterday'
import LastWeek from './calendar/last-week'
import ThisMonth from './calendar/this-month'
import LastMonth from './calendar/last-month'

const CalendarView: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('today')

  const renderContent = () => {
    switch (selectedOption) {
      case 'today':
        return <Today />
      case 'yesterday':
        return <Yesterday />
      case 'last-week':
        return <LastWeek />
      case 'this-month':
        return <ThisMonth />
      case 'last-month':
        return <LastMonth />
      default:
        return null
    }
  }

  return (
    <div className="w-full flex-1 flex flex-col min-h-0">
      <div className="flex items-center h-[46px] min-h-[46px] w-full border-b border-black/15 px-4">
        <Select
          value={selectedOption}
          onValueChange={(value) => {
            setSelectedOption(value)
          }}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="last-week">Last Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-h-0 overflow-auto">{renderContent()}</div>
    </div>
  )
}

export default CalendarView
