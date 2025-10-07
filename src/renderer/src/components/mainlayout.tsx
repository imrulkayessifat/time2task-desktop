import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { GoHome } from 'react-icons/go'
import { SlCalender } from 'react-icons/sl'
import { LuAlarmClock } from 'react-icons/lu'
import { PiClockClockwise } from 'react-icons/pi'
import { IoFlowerOutline } from 'react-icons/io5'
import { PiExclamationMarkFill } from 'react-icons/pi'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'

import { cn } from '@renderer/lib/utils'
import AvatarIcon from '../assets/avatar.jpg'
import AnnouncementIcon from '../assets/Announcement.svg'
import NotificationIcon from '../assets/Notification.svg'

const icons = [
  { Icon: GoHome, name: 'Dashboard', page: '/dashboard' },
  { Icon: IoFlowerOutline, name: 'Workspace', page: '/workspace' },
  { Icon: LuAlarmClock, name: 'Timesheet', page: '/timesheet' },
  { Icon: PiClockClockwise, name: 'Schedule', page: '/schedule' },
  { Icon: IoChatbubbleEllipsesOutline, name: 'Chat', page: '/chat' },
  { Icon: PiExclamationMarkFill, name: 'Leave', page: '/leave' },
  { Icon: SlCalender, name: 'Attendance', page: '/attendance' }
]

const pageTitles: Record<string, string> = {
  '/profile': 'My Profile',
  '/dashboard': 'Welcome! Jerome Bella',
  '/workspace': 'My Workspace',
  '/timesheet': 'Timesheet',
  '/schedule': 'Schedule Overview',
  '/chat': 'Chat',
  '/leave': 'Leave',
  '/attendance': 'Attendance'
}

const MainLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="w-[70px] z-30 min-w-[70px] h-full flex flex-col bg-[#F0F0F0] items-center py-2 gap-3">
        <div
          className={cn(
            'inline-flex p-2 rounded-full justify-center cursor-pointer items-center mb-2',
            location.pathname === '/profile' && 'bg-[#009DDA1A]'
          )}
          onClick={() => navigate('/profile')}
        >
          <img
            src={AvatarIcon} // Replace with your avatar image path or import
            alt="Profile"
            className={cn(
              'w-8 h-8 rounded-full object-cover',
              location.pathname === '/profile' ? 'ring-2 ring-[#0981b1d8]' : 'ring-0'
            )}
          />
        </div>
        {icons.map(({ Icon, name, page }) => (
          <div
            key={name}
            className={cn(
              'inline-flex p-2  rounded-md justify-center cursor-pointer items-center',
              location.pathname === page && 'bg-[#009DDA1A]'
            )}
            onClick={() => navigate(page)}
          >
            <Icon className={cn('w-6 h-6', location.pathname === page && 'text-[#0981b1d8]')} />
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full h-screen">
        <div className="h-[60px] border-b border-black/15 flex justify-between items-center px-5">
          <p className="text-[20px] leading-[20px] font-medium">
            {pageTitles[location.pathname] || 'Welcome!'}
          </p>
          <div className="inline-flex items-center gap-4">
            <div className="p-2 hover:border hover:border-black/15 rounded-md">
              <img src={AnnouncementIcon} alt="announcement" className="w-6 h-6 cursor-pointer" />
            </div>
            <div className="p-2 hover:border hover:border-black/15 rounded-md">
              <img src={NotificationIcon} alt={'notification'} className="w-6 h-6 cursor-pointer" />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
