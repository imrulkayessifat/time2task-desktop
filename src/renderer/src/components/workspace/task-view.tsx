import React, { useState } from 'react'
import { Plus, Search, Edit3, Check, X } from 'lucide-react'

type Task = {
  id: number
  name: string
  assignee: string
  due: string
  spent: string
  impact: string
}

const initialTasks: Task[] = [
  {
    id: 1,
    name: 'Full Website Design',
    assignee: 'Rahib',
    due: '23 Jan',
    spent: '30%',
    impact: 'High'
  },
  {
    id: 2,
    name: 'API Integration',
    assignee: 'Imrul',
    due: '25 Jan',
    spent: '10%',
    impact: 'Medium'
  }
]

const TaskView: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks)
  const [editId, setEditId] = useState<number | null>(null)
  const [editName, setEditName] = useState<string>('')

  const handleEdit = (id: number, name: string): void => {
    setEditId(id)
    setEditName(name)
  }

  const handleSubmit = (id: number): void => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, name: editName } : task)))
    setEditId(null)
    setEditName('')
  }

  return (
    <div className="flex flex-col gap-4 w-full p-2 sm:p-4 overflow-hidden">
      <div className="flex w-full justify-between items-center gap-2">
        <div className="flex items-center gap-1 border h-[40px] border-black/15 rounded-md p-2 flex-1 max-w-[200px]">
          <Search className="w-4 h-4 min-w-4 max-h-4 text-[#7C7C7C]" />
          <input
            type="text"
            className="w-full min-w-0 outline-none text-sm"
            placeholder="Search..."
          />
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
              <th className="text-[#7C7C7C] whitespace-nowrap font-extralight text-[14px] leading-[16px] py-[10px] px-3 w-[15%]">
                Assignee
              </th>
              <th className="text-[#7C7C7C] whitespace-nowrap font-extralight text-[14px] leading-[16px] py-[10px] px-3 w-[18%]">
                Due Date
              </th>
              <th className="text-[#7C7C7C] whitespace-nowrap font-extralight text-[14px] leading-[16px] py-[10px] px-3 w-[12%]">
                Spent
              </th>
              <th className="text-[#7C7C7C] whitespace-nowrap font-extralight text-[14px] leading-[16px] py-[10px] px-3 w-[13%]">
                Impact
              </th>
              <th className="text-[#7C7C7C] whitespace-nowrap font-extralight text-[14px] leading-[16px] py-[10px] px-3 w-[12%]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                <td className="font-extralight text-[14px] leading-[16px] py-[12px] px-3">
                  {editId === task.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="outline-none px-2 py-1 w-full border border-gray-300 rounded"
                      autoFocus
                    />
                  ) : (
                    <span className="block" title={task.name}>
                      {task.name}
                    </span>
                  )}
                </td>
                <td className="font-extralight text-[14px] leading-[16px] py-[12px] px-3">
                  {task.assignee}
                </td>
                <td className="font-extralight text-[14px] leading-[16px] py-[12px] px-3">
                  {task.due}
                </td>
                <td className="font-extralight text-[14px] leading-[16px] py-[12px] px-3">
                  {task.spent}
                </td>
                <td className="font-extralight text-[14px] leading-[16px] py-[12px] px-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      task.impact === 'High'
                        ? 'bg-red-100 text-red-800'
                        : task.impact === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {task.impact}
                  </span>
                </td>
                <td className="font-extralight text-[14px] leading-[16px] py-[12px] px-3">
                  {editId === task.id ? (
                    <div className="flex gap-1 justify-center">
                      <button
                        className="cursor-pointer p-1 hover:bg-red-50 rounded"
                        onClick={() => setEditId(null)}
                        title="Cancel"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                      <button
                        className="cursor-pointer p-1 hover:bg-green-50 rounded"
                        onClick={() => handleSubmit(task.id)}
                        title="Save"
                      >
                        <Check className="w-4 h-4 text-green-600" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <button
                        className="cursor-pointer p-1 hover:bg-sky-50 rounded"
                        onClick={() => handleEdit(task.id, task.name)}
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4 text-sky-500" />
                      </button>
                    </div>
                  )}
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
            <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                {editId === task.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="outline-none px-2 py-1 flex-1 border border-gray-300 rounded text-sm font-medium mr-2"
                    autoFocus
                  />
                ) : (
                  <h3 className="font-medium text-sm text-gray-900 flex-1 mr-2">{task.name}</h3>
                )}

                {editId === task.id ? (
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      className="cursor-pointer p-1 hover:bg-red-50 rounded"
                      onClick={() => setEditId(null)}
                      title="Cancel"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                    <button
                      className="cursor-pointer p-1 hover:bg-green-50 rounded"
                      onClick={() => handleSubmit(task.id)}
                      title="Save"
                    >
                      <Check className="w-4 h-4 text-green-600" />
                    </button>
                  </div>
                ) : (
                  <button
                    className="cursor-pointer p-1 hover:bg-sky-50 rounded flex-shrink-0"
                    onClick={() => handleEdit(task.id, task.name)}
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4 text-sky-500" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-[#7C7C7C] font-extralight text-xs block">Assignee</span>
                  <span className="font-extralight text-gray-900">{task.assignee}</span>
                </div>
                <div>
                  <span className="text-[#7C7C7C] font-extralight text-xs block">Due Date</span>
                  <span className="font-extralight text-gray-900">{task.due}</span>
                </div>
                <div>
                  <span className="text-[#7C7C7C] font-extralight text-xs block">Spent Time</span>
                  <span className="font-extralight text-gray-900">{task.spent}</span>
                </div>
                <div>
                  <span className="text-[#7C7C7C] font-extralight text-xs block">Impact</span>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      task.impact === 'High'
                        ? 'bg-red-100 text-red-800'
                        : task.impact === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {task.impact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TaskView
