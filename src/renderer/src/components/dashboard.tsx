import React from 'react'
import { useNavigate } from 'react-router-dom'

import LogoutIcon from '../assets/logout.svg'
import CheckInIcon from '../assets/check-in.svg'
import CheckOutIcon from '../assets/check-out.svg'
import Workspace1Icon from '../assets/Workspace1.svg'
import TimelightIcon from '../assets/time-night-fill.svg'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const handleLogOut = (): void => {
    navigate('/')
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex border-b border-black/15">
        <div className="flex flex-col items-center justify-center gap-3 p-2 border-r-2 border-black/15 w-[193px] min-w-[193px]">
          <div className="">
            <p className="text-[20px] leading-[20px] font-medium">10:00 AM, Today</p>
            <p className="text-[14px] leading-[20px] font-light">Wednesday, 16 January</p>
          </div>
          <div className="flex w-[150px] h-[88px] flex-col gap-2 items-center justify-center border border-black/15 shadow rounded-md px-3 py-2">
            <p className="text-[#7C7C7C] text-[14px] leading-[16px] font-normal">My Shift</p>
            <p className="text-[16px] leading-[16px] font-normal">6:00pm-1:00am</p>
            <div className="flex items-center gap-1">
              <img src={TimelightIcon} className="h-4 w-4" />
              <p className="text-[14px] leading-[16px] font-extralight">Night</p>
            </div>
          </div>
          <div className="flex w-[150px] h-[88px] flex-col gap-2 items-center justify-center border border-black/15 shadow rounded-md px-3 py-2">
            <p className="text-[#7C7C7C] text-[14px] leading-[16px] font-normal">Today Hours</p>
            <p className="text-[16px] leading-[16px] font-normal">00:00:00</p>
          </div>
          <div className="flex w-[150px] h-[88px] flex-col gap-2 items-center justify-center border border-black/15 shadow rounded-md px-3 py-2">
            <p className="text-[#7C7C7C] text-[14px] leading-[16px] font-normal">This Week Hours</p>
            <p className="text-[16px] leading-[16px] font-normal">43:16:41</p>
          </div>
          <button
            onClick={handleLogOut}
            className="flex items-center justify-center gap-2 cursor-pointer w-[150px] h-[46px] bg-[#E336291A] rounded-md"
          >
            <img src={LogoutIcon} alt="logout" className="w-[22px] h-[22px]" />
            <p className="text-[14px] leading-[16px] font-extralight">Logout</p>
          </button>
        </div>
        <div className="flex flex-col gap-3 items-center w-full justify-evenly py-2">
          <p className="text-[20px] leading-[20px] font-medium">Attendance</p>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col items-center justify-evenly w-[180px] h-[180px] bg-[#00B8941A] rounded-md cursor-pointer">
              <img src={CheckInIcon} />
              <p className="text-[22px] leading-[100%]">Check In</p>
              <p className="text-[14px] leading-[16px]">00:00:00</p>
              <p className="bg-[#E3362933] text-[#E33629] px-3 py-2 rounded-full">Late In</p>
            </div>
            <div className="flex flex-col items-center justify-evenly w-[180px] h-[180px] bg-[#E336291A] rounded-md cursor-pointer">
              <img src={CheckOutIcon} />
              <p className="text-[22px] leading-[100%]">Check Out</p>
              <p className="text-[14px] leading-[16px]">00:00:00</p>
            </div>
          </div>
          <button className="flex items-center rounded-md gap-2 bg-gradient-to-r from-[#009DDA] to-[#294DFF] text-white px-3 py-2">
            <img src={Workspace1Icon} alt="leave" className="w-6 h-6" />
            <p className="text-[18px] leading-[16px] font-light">Go to Workspace</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
