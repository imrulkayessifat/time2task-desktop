import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'

import Daily from './timesheet/daily'
import Weekly from './timesheet/weekly'
import Monthly from './timesheet/monthly'
import { cn } from '@renderer/lib/utils'

const Timesheet: React.FC = () => {
  const [selected, setSelected] = useState<string>('Daily')
  const renderContent = () => {
    switch (selected) {
      case 'Daily':
        return <Daily />
      case 'Weekly':
        return <Weekly />
      case 'Monthly':
        return <Monthly />
      default:
        return null
    }
  }
  return (
    <div className="flex flex-1 min-h-0 flex-col border border-[#D9D9D9] p-2">
      <div className="flex justify-between items-center flex-wrap gap-1">
        <div className="bg-[#F0F0F0] p-[10px] rounded-md">
          <button
            onClick={() => setSelected('Daily')}
            className={cn(
              'py-1 px-2 font-normal text-[14px] leading-[25px] rounded-[6px] cursor-pointer',
              selected === 'Daily' ? 'bg-gradient-to-r from-[#009DDA] to-[#294DFF] text-white' : ''
            )}
          >
            Daily
          </button>
          <button
            onClick={() => setSelected('Weekly')}
            className={cn(
              'py-1 px-2 font-normal text-[14px] leading-[25px] rounded-[6px] cursor-pointer',
              selected === 'Weekly' ? 'bg-gradient-to-r from-[#009DDA] to-[#294DFF] text-white' : ''
            )}
          >
            Weekly
          </button>
          <button
            onClick={() => setSelected('Monthly')}
            className={cn(
              'py-1 px-2 font-normal text-[14px] leading-[25px] rounded-[6px] cursor-pointer',
              selected === 'Monthly'
                ? 'bg-gradient-to-r from-[#009DDA] to-[#294DFF] text-white'
                : ''
            )}
          >
            Monthly
          </button>
        </div>
        <div className="flex justify-between items-center gap-3 flex-wrap">
          <p className="font-light border border-blue-500 bg-[#009DDA1A] text-[14px] leading-[25px] rounded-[6px] p-[10px]">
            Worked Time: 06:30:00
          </p>
          <p className="font-light border border-red-500 bg-[#E336291A] text-[14px] leading-[25px] rounded-[6px] p-[10px]">
            Break Time: 01:30:00
          </p>
          <button className="flex cursor-pointer justify-between items-center gap-2 rounded-[6px] p-[10px] bg-gradient-to-r from-[#009DDA] to-[#294DFF] text-white">
            <GoPlus className="w-5 h-5 text-white" />
            <p className="font-light text-[14px] leading-[25px]">Add Timesheet</p>
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-auto">{renderContent()}</div>
    </div>
  )
}

export default Timesheet
