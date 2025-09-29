import React from 'react'

const time_slots = [
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM'
]

const Daily: React.FC = () => {
  return (
    <div className="flex w-full">
      <div className="w-20 min-w-20 border-r border-gray-300 text-sm text-gray-600">
        {time_slots.map((t, i) => (
          <div key={i} className="h-12 flex items-center justify-end pr-2 border-b border-gray-200">
            {t}
          </div>
        ))}
        {/* Add padding at bottom to ensure last item is visible */}
        <div className="h-10"></div>
      </div>

      <div className="flex-1 relative">
        {time_slots.map((_, i) => (
          <div
            key={i}
            className="h-12 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
          ></div>
        ))}
        {/* Add padding at bottom to ensure last item is visible */}
        <div className="h-10"></div>
      </div>
    </div>
  )
}

export default Daily
