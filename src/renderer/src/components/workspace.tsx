import React from 'react'

import { cn } from '@renderer/lib/utils'
import ProjectList from './workspace/project-list'

const Workspace: React.FC = () => {
  const [view, setView] = React.useState<'list' | 'calendar'>('list')
  return (
    <div className="flex flex-col w-full">
      <div className="w-full border-b border-black/15 h-[46px]">
        <button
          className={cn(
            'relative inline-flex items-center justify-center w-1/2 h-full cursor-pointer',
            view === 'list' &&
              'before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-[#009DDA] before:to-[#294DFF]'
          )}
          onClick={() => setView('list')}
        >
          <span
            className={cn(
              view === 'list'
                ? 'bg-gradient-to-r from-[#009DDA] to-[#294DFF] bg-clip-text text-transparent'
                : 'text-black'
            )}
          >
            List
          </span>
        </button>
        <button
          className={cn(
            'relative inline-flex items-center justify-center w-1/2 h-full cursor-pointer',
            view === 'calendar' &&
              'before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-[#009DDA] before:to-[#294DFF]'
          )}
          onClick={() => setView('calendar')}
        >
          <span
            className={cn(
              view === 'calendar'
                ? 'bg-gradient-to-r from-[#009DDA] to-[#294DFF] bg-clip-text text-transparent'
                : 'text-black'
            )}
          >
            Calendar
          </span>
        </button>
      </div>
      {view === 'list' ? <ProjectList /> : <div className="p-4">Calendar View (Coming Soon)</div>}
    </div>
  )
}

export default Workspace
