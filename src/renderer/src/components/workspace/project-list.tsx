import React, { useState, MouseEvent, ChangeEvent } from 'react'
import Cookies from 'js-cookie'
import { X } from 'lucide-react'
import { CiSearch } from 'react-icons/ci'
import { PiFilesDuotone } from 'react-icons/pi'
import { VscDebugStart } from 'react-icons/vsc'
import { VscDebugPause } from 'react-icons/vsc'
import { FaArrowTurnDown } from 'react-icons/fa6'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'

import Loader from '../Loader'
import TaskView from './task-view'
import ChatView from './chat-view'
import { cn } from '@renderer/lib/utils'
import { useTimeState } from '../hooks/time-state'
import { useGetProjects } from '../hooks/project/use-get-projects'
import { useSelectProject } from '../hooks/project/use-select-project'

interface ProjectMeta {
  total_records: number
  total_pages: number
  current_page: number
  page_size: string
}

interface ProjectData {
  rows: unknown[]
  meta: ProjectMeta
}

const ProjectList: React.FC = () => {
  const [page, setPage] = useState(1)
  const { isRunning, setIsRunning } = useTimeState()
  const [searchValue, setSearchValue] = useState<string>('')
  const { project_id, task_id, setProject } = useSelectProject()
  const [searchProject, setSearchProject] = useState<ProjectData>()
  const [view, setView] = useState<'tasks' | 'chat' | 'files'>('tasks')
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  const { data, isLoading } = useGetProjects({ page })

  if (isLoading) {
    return <Loader />
  }
  const projects = (
    searchProject && Array.isArray(searchProject.rows) && searchProject.rows.length > 0
      ? searchProject.rows
      : (data?.rows ?? [])
  ) as {
    id: number
    name?: string
  }[]
  const meta = searchProject?.meta ? searchProject.meta : data?.meta

  const start = () => {
    // Clear any existing time and interval when starting
    if (intervalId) {
      clearInterval(intervalId)
    }
    setTime({ hours: 0, minutes: 0, seconds: 0 })
    setIsRunning(true)

    const id = setInterval(() => {
      setTime((prevTime) => {
        const newSeconds = prevTime.seconds + 1
        const newMinutes = prevTime.minutes + Math.floor(newSeconds / 60)
        const newHours = prevTime.hours + Math.floor(newMinutes / 60)

        return {
          hours: newHours,
          minutes: newMinutes % 60,
          seconds: newSeconds % 60
        }
      })
    }, 1000)
    setIntervalId(id)
  }

  const pause = () => {
    if (isRunning && intervalId) {
      clearInterval(intervalId)
      setIsRunning(false)
    }
  }

  const handleTimerToggle = async () => {
    if (!isRunning) {
      // window.electron.ipcRenderer.send('permission-check')
      start()

      // window.electron.ipcRenderer.send('idle-started', {
      //   projectId: project_id,
      //   taskId: task_id
      // })
    } else {
      pause()
      // window.electron.ipcRenderer.send('idle-stopped', {
      //   projectId: project_id,
      //   taskId: task_id
      // })
    }
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value)
  }

  const handleSearch = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault()
    const token = Cookies.get('auth-token')
    const res = await fetch(
      `${import.meta.env.VITE_URL}/project?page=1&limit=5&query=${searchValue}`,
      {
        method: 'GET',
        headers: {
          Authorization: `${token}`
        }
      }
    )
    if (!res.ok) {
      throw new Error('Failed to fetch tasks')
    }
    const { data } = await res.json()
    setSearchProject(data)
  }

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  const handleNextPage = () => {
    if (meta && page < meta.total_pages) {
      setPage((prev) => prev + 1)
    }
  }

  const handleClearSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSearchValue('') // Prevent default form submission
    setSearchProject(undefined)
  }

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0')
  }

  return (
    <div className="flex flex-col lg:flex-row w-full md:border-b-2 border-black/15 h-full">
      <div className="flex flex-col w-full lg:w-1/5 min-w-[170px] border-r-2 border-black/15 p-2 flex-shrink-0">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-[18px] leading-[20px] font-medium">Recent Projects</p>
          <div className="flex gap-2">
            <div className="flex w-full items-center gap-1 border border-black/15 rounded-md p-2">
              <button
                onClick={handleSearch}
                disabled={searchValue.length === 0}
                className={cn('', searchValue.length === 0 && 'opacity-30 cursor-not-allowed')}
              >
                <CiSearch className="w-4 h-4 min-w-4 max-h-4 text-[#7C7C7C]" />
              </button>
              <input
                value={searchValue}
                onChange={handleSearchChange}
                type="text"
                className="w-full min-w-0 outline-none"
              />
            </div>
            <button
              onClick={handleClearSearch}
              className={cn('', searchValue.length === 0 && 'hidden')}
            >
              <X className={'h-[26px] w-[26px] cursor-pointer'} />
            </button>
          </div>
          {projects.length === 0 ? (
            <span className="text-black">No project assigned here</span>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 mt-2 w-full">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setProject(project.id, -1)
                    }}
                    className={cn(
                      'inline-flex items-center p-2 w-full cursor-pointer border border-black/15 rounded',
                      project_id === project.id && 'bg-gradient-to-r from-[#009DDA] to-[#294DFF]'
                    )}
                  >
                    <span
                      className={cn(
                        'font-light text-[14px] leading-[20px]',
                        project_id === project.id ? 'text-white' : 'text-black '
                      )}
                    >
                      {project.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={handlePrevPage}
                  disabled={meta ? 1 === Number(meta.current_page) : page === 1}
                  className={cn(
                    'flex cursor-pointer gap-1 items-center h-8 border border-gray-950 rounded-md px-[10px] py-[6px]',
                    (meta ? 1 === Number(meta.current_page) : page === 1) &&
                      'opacity-20 cursor-not-allowed'
                  )}
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={meta ? page === Number(meta.total_pages) : true}
                  className={cn(
                    'flex cursor-pointer gap-1 items-center h-8 border border-gray-950 rounded-md px-[10px] py-[6px]',
                    meta && page === Number(meta.total_pages) && 'opacity-20 cursor-not-allowed'
                  )}
                >
                  <FaAngleRight />
                </button>
              </div>
            </div>
          )}
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
            <p className="font-light text-[20px] leading-[16px]">{`${formatTime(time.hours)}:${formatTime(time.minutes)}:${formatTime(time.seconds)}`}</p>
            <button
              disabled={task_id === -1}
              onClick={handleTimerToggle}
              className={cn(
                'inline-flex rounded-md items-center p-2 gap-2 bg-[#D9D9D9] cursor-pointer whitespace-nowrap',
                task_id !== -1
                  ? 'bg-gradient-to-r from-[#009DDA] to-[#294DFF] text-white'
                  : ' opacity-25',
                isRunning && 'bg-gradient-to-r from-[#5cffae] to-[#1eff69] text-white'
              )}
            >
              {isRunning ? (
                <>
                  <VscDebugPause className="w-6 h-6" />
                  <p className="font-light text-[14px] leading-[16px]">Pause Tracker</p>
                </>
              ) : (
                <>
                  <VscDebugStart className="w-6 h-6" />
                  <p className="font-light text-[14px] leading-[16px]">Start Tracker</p>
                </>
              )}
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
