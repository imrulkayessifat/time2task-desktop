import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoAdd } from 'react-icons/io5'

const TaskView: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 border h-[40px] border-black/15 rounded-md p-2">
          <CiSearch className="w-4 h-4 min-w-4 max-h-4 text-[#7C7C7C]" />
          <input type="text" className="w-full min-w-0 outline-none" />
        </div>
        <button className="cursor-pointer w-[30px] h-[30px] bg-gradient-to-r from-[#009DDA] to-[#294DFF] inline-flex items-center justify-center rounded-md">
          <IoAdd className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  )
}

export default TaskView
