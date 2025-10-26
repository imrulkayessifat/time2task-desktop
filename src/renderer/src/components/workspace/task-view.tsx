import Cookies from 'js-cookie'
import React, { ChangeEvent, useState, MouseEvent } from 'react'
import { Plus, Search, X } from 'lucide-react'

import Loader from '../Loader'
import { cn } from '@renderer/lib/utils'
import { useGetTasks } from '../hooks/task/use-get-tasks'
import { useSelectProject } from '../hooks/project/use-select-project'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

interface TaskMeta {
  total_records: number
  total_pages: number
  current_page: number
  page_size: string
}

interface TaskData {
  rows: unknown[]
  meta: TaskMeta
}

type Task = {
  id: number
  project_id: number
  name: string
  assignee: string
  due: string
  spent: string
  impact: string
}

// const initialTasks: Task[] = [
//   {
//     id: 1,
//     name: 'Full Website Design',
//     assignee: 'Rahib',
//     due: '23 Jan',
//     spent: '30%',
//     impact: 'High'
//   },
//   {
//     id: 2,
//     name: 'API Integration',
//     assignee: 'Imrul',
//     due: '25 Jan',
//     spent: '10%',
//     impact: 'Medium'
//   }
// ]

const TaskView: React.FC = () => {
  const [taskPage, setTaskPage] = useState(1)
  const [searchTask, setSearchTask] = useState<TaskData>()
  const [searchValue, setSearchValue] = useState<string>('')
  const { project_id, task_id, setProject } = useSelectProject()
  // const [tasks, setTasks] = useState(initialTasks)
  const { data, isLoading } = useGetTasks({ taskPage, projectId: project_id, status })

  if (isLoading) {
    return <Loader />
  }

  const tasks =
    Array.isArray(searchTask?.rows) && searchTask.rows.length > 0
      ? (searchTask.rows as Task[])
      : (data?.rows as Task[]) || []
  const meta = searchTask?.meta ? searchTask.meta : data?.meta

  const handleSearch = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault()
    const token = Cookies.get('auth-token')
    const res = await fetch(
      `${import.meta.env.VITE_URL}/task/project/${project_id}?page=1&limit=5&query=${searchValue}`,
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
    setSearchTask(data)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value)
  }

  const handleClearSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSearchValue('') // Prevent default form submission
    setSearchTask(undefined)
  }

  const handlePrevPage = () => {
    if (taskPage > 1) {
      setTaskPage((prev) => prev - 1)
    }
  }

  const handleNextPage = () => {
    if (meta && taskPage < meta.total_pages) {
      setTaskPage((prev) => prev + 1)
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full p-2 sm:p-4 overflow-hidden">
      <div className="flex w-full justify-between items-center gap-2">
        <div className="flex gap-2">
          <div className="flex items-center gap-1 border h-[40px] border-black/15 rounded-md p-2 flex-1 max-w-[200px]">
            <button
              onClick={handleSearch}
              disabled={searchValue.length === 0}
              className={cn('', searchValue.length === 0 && 'opacity-30 cursor-not-allowed')}
            >
              <Search className="w-4 h-4 min-w-4 max-h-4 text-[#7C7C7C]" />
            </button>

            <input
              value={searchValue}
              onChange={handleSearchChange}
              type="text"
              className="w-full min-w-0 outline-none text-sm"
              placeholder="Search..."
            />
          </div>

          <button
            onClick={handleClearSearch}
            className={cn('', searchValue.length === 0 && 'hidden')}
          >
            <X className={'h-[26px] w-[26px] cursor-pointer'} />
          </button>
        </div>

        <button className="cursor-pointer w-[30px] h-[30px] bg-gradient-to-r from-[#009DDA] to-[#294DFF] inline-flex items-center justify-center rounded-md flex-shrink-0">
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block w-full overflow-x-auto border border-gray-200 max-h-[250px] overflow-y-auto rounded-md flex-1">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-black/15 bg-gray-50">
              <th className="text-[#7C7C7C] whitespace-nowrap font-extralight text-[14px] leading-[16px] py-[10px] px-3 w-[30%]">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr
                onClick={() => {
                  setProject(task.project_id, task.id)
                }}
                key={index}
                className={cn(
                  'cursor-pointer hover:bg-gray-100',
                  task_id === task.id && 'bg-gradient-to-r from-[#009DDA] to-[#294DFF] text-white'
                )}
              >
                <td className="font-extralight text-[14px] leading-[16px] py-[12px] px-3">
                  <span className="block" title={task.name}>
                    {task.name}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex-1 max-h-[250px] overflow-y-auto">
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => {
                setProject(task.project_id, task.id)
              }}
              className={cn(
                'bg-white border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer',
                task_id === task.id && 'bg-gradient-to-r from-[#009DDA] to-[#294DFF] text-white'
              )}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-sm text-gray-900 flex-1 mr-2">{task.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      {tasks.length !== 0 && meta && (
        <div className="flex justify-between items-center mt-2">
          <button
            onClick={handlePrevPage}
            disabled={meta ? 1 === Number(meta.current_page) : taskPage === 1}
            className={cn(
              'flex cursor-pointer gap-1 items-center h-8 border border-gray-950 rounded-md px-[10px] py-[6px]',
              (meta ? 1 === Number(meta.current_page) : taskPage === 1) &&
                'opacity-20 cursor-not-allowed'
            )}
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNextPage}
            disabled={meta ? taskPage === Number(meta.total_pages) : true}
            className={cn(
              'flex cursor-pointer gap-1 items-center h-8 border border-gray-950 rounded-md px-[10px] py-[6px]',
              meta && taskPage === Number(meta.total_pages) && 'opacity-20 cursor-not-allowed'
            )}
          >
            <FaAngleRight />
          </button>
        </div>
      )}
    </div>
  )
}

export default TaskView
