import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { PiFilesDuotone } from 'react-icons/pi'
import { VscDebugStart } from 'react-icons/vsc'
import { FaArrowTurnDown } from 'react-icons/fa6'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'

import { cn } from '@renderer/lib/utils'
import TaskView from './task-view'
import ChatView from './chat-view'

const ProjectList: React.FC = () => {
  const [view, setView] = React.useState<'tasks' | 'chat' | 'files'>('tasks')
  return (
    <div className="flex flex-col lg:flex-row w-full md:border-b-2 border-black/15 h-full">
      <div className="flex flex-col w-full lg:w-1/5 min-w-[170px] border-r-2 border-black/15 p-2 flex-shrink-0">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-[18px] leading-[20px] font-medium">Recent Projects</p>
          <div className="flex w-full items-center gap-1 border border-black/15 rounded-md p-2">
            <CiSearch className="w-4 h-4 min-w-4 max-h-4 text-[#7C7C7C]" />
            <input type="text" className="w-full min-w-0 outline-none" />
          </div>
          <div className="flex flex-col gap-2 mt-2 w-full">
            <div className="inline-flex items-center p-2 w-full bg-gradient-to-r from-[#009DDA] to-[#294DFF] cursor-pointer">
              <span className="font-light text-[14px] leading-[20px] text-white">Time To Task</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 px-2 py-1 w-full min-w-0">
        <div className="flex flex-col-reverse md:flex-row justify-between border-b border-black/15 px-1 flex-shrink-0">
          <div className="flex gap-3 items-center p-1">
            <button
              onClick={() => setView('tasks')}
              className={cn(
                'relative inline-flex items-center gap-1 cursor-pointer',
                view === 'tasks' &&
                  'before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-[#009DDA] before:to-[#294DFF]'
              )}
            >
              <FaArrowTurnDown
                className={cn('w-[10px] h-[16px]', view === 'tasks' && 'text-[#009DDA]')}
              />
              <span
                className={cn(
                  view === 'tasks'
                    ? 'font-light text-[14px] leading-[25px] bg-gradient-to-r from-[#009DDA] to-[#294DFF] bg-clip-text text-transparent'
                    : 'text-black'
                )}
              >
                Tasks
              </span>
            </button>
            <button
              onClick={() => setView('chat')}
              className={cn(
                'relative inline-flex items-center gap-1 cursor-pointer',
                view === 'chat' &&
                  'before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-[#009DDA] before:to-[#294DFF]'
              )}
            >
              <IoChatbubbleEllipsesOutline
                className={cn('w-4 h-4', view === 'chat' && 'text-[#009DDA]')}
              />
              <span
                className={cn(
                  view === 'chat'
                    ? 'font-light text-[14px] leading-[25px] bg-gradient-to-r from-[#009DDA] to-[#294DFF] bg-clip-text text-transparent'
                    : 'text-black'
                )}
              >
                Chat
              </span>
            </button>
            <button
              onClick={() => setView('files')}
              className={cn(
                'relative inline-flex items-center gap-1 cursor-pointer',
                view === 'files' &&
                  'before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-[#009DDA] before:to-[#294DFF]'
              )}
            >
              <PiFilesDuotone className={cn('w-4 h-4', view === 'files' && 'text-[#009DDA]')} />
              <span
                className={cn(
                  view === 'files'
                    ? 'font-light text-[14px] leading-[25px] bg-gradient-to-r from-[#009DDA] to-[#294DFF] bg-clip-text text-transparent'
                    : 'text-black'
                )}
              >
                Files
              </span>
            </button>
          </div>
          <div className="flex gap-3 items-center pb-1 flex-shrink-0">
            <p className="font-light text-[20px] leading-[16px]">00:00:00</p>
            <button className="inline-flex rounded-md items-center p-2 gap-2 bg-[#D9D9D9] cursor-pointer whitespace-nowrap">
              <VscDebugStart className="w-6 h-6" />
              <p className="font-light text-[14px] leading-[16px]">Start Tracker</p>
            </button>
            <BsThreeDotsVertical className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          {view === 'tasks' ? (
            <TaskView />
          ) : view === 'chat' ? (
            <ChatView />
          ) : (
            <div className="p-4">Files View (Coming Soon)</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectList
