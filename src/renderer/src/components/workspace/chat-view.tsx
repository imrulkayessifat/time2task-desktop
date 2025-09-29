import React, { useState } from 'react'
import { Plus, Wand2, Pencil, Smile, Image, MessageSquare, Upload } from 'lucide-react'

import ChatUser from '../../assets/chat-user.jpg'
import { IoMdAdd, IoMdSend } from 'react-icons/io'

const ChatView: React.FC = () => {
  const [message, setMessage] = useState('')

  const iconButtons = [
    { icon: Plus, label: 'Add' },
    { icon: Wand2, label: 'AI Assistant' },
    { icon: Pencil, label: 'Edit' },
    { icon: Smile, label: 'Emoji' },
    { icon: Image, label: 'GIF', text: 'GIF' },
    { icon: MessageSquare, label: 'Sticker' },
    { icon: Upload, label: 'Upload' }
  ]
  return (
    <div className="flex flex-col md:flex-row m-[10px] w-full h-full">
      <div className="hidden md:flex flex-col gap-2 w-[100px] border-r border-[#D9D9D9] min-w-[200px] bg-white">
        <p className="font-normal text-[14px] leading-[15px] p-[10px]">Member</p>
        <div className="flex items-center gap-2 rounded-[5px] p-[10px] hover:bg-gray-300">
          <img src={ChatUser} alt="User" className="w-[25px] h-[20px]" />
          <p className="font-extralight text-[14px] leading-[16px]">Jerome Bell</p>
        </div>
        <div className="flex items-center gap-2 rounded-[5px] p-[10px] hover:bg-gray-300">
          <img src={ChatUser} alt="User" className="w-[25px] h-[20px]" />
          <p className="font-extralight text-[14px] leading-[16px]">Jerome Bell</p>
        </div>
        <div className="flex items-center gap-2 rounded-[5px] p-[10px] hover:bg-gray-300">
          <img src={ChatUser} alt="User" className="w-[25px] h-[20px]" />
          <p className="font-extralight text-[14px] leading-[16px]">Jerome Bell</p>
        </div>
        <div className="flex items-center gap-2 rounded-[5px] p-[10px] hover:bg-gray-300">
          <img src={ChatUser} alt="User" className="w-[25px] h-[20px]" />
          <p className="font-extralight text-[14px] leading-[16px]">Jerome Bell</p>
        </div>
        <div className="flex items-center gap-2 rounded-[5px] p-[10px] hover:bg-gray-300">
          <img src={ChatUser} alt="User" className="w-[25px] h-[20px]" />
          <p className="font-extralight text-[14px] leading-[16px]">Jerome Bell</p>
        </div>
        <div className="flex items-center hover:text-white gap-2 rounded-[5px] p-[10px] hover:bg-gradient-to-r from-[#009DDA] to-[#294DFF]">
          <IoMdAdd className="w-[25px] h-[20px]" />
          <p className="font-light text-[14px] leading-[16px]">Invite member</p>
        </div>
      </div>
      <div className="flex md:hidden flex-row gap-2 w-full bg-white p-2">
        <img src={ChatUser} alt="User" className="w-10 h-10 rounded-full" />
        <img src={ChatUser} alt="User" className="w-10 h-10 rounded-full" />
        <img src={ChatUser} alt="User" className="w-10 h-10 rounded-full" />
        <img src={ChatUser} alt="User" className="w-10 h-10 rounded-full" />
        <div className="flex items-center hover:text-white gap-2 rounded-[5px] p-[10px] hover:bg-gradient-to-r from-[#009DDA] to-[#294DFF]">
          <IoMdAdd className="w-[25px] h-[20px]" />
          <p className="font-light text-nowrap text-[14px] leading-[16px]">Invite member</p>
        </div>
      </div>
      <div className="flex flex-col justify-between w-full h-full bg-[#F0F0F0] min-h-[300px]">
        <div></div>
        <div className="flex w-full items-center justify-center p-4">
          <div className="w-full">
            <div className="bg-white rounded-[6px] shadow-lg border border-[#D9D9D9] p-4">
              {/* Icon Toolbar */}
              <div className="flex items-center gap-2 p-2 rounded-md border bg-[#F0F0F0]">
                {iconButtons.map((item, index) => (
                  <button
                    key={index}
                    className="flex items-center cursor-pointer justify-center w-[32px] h-[32px] transition-colors duration-200 group relative"
                    aria-label={item.label}
                  >
                    {item.text === 'GIF' ? (
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                        GIF
                      </span>
                    ) : (
                      <item.icon className="w-[14px] h-[14px] text-gray-700 group-hover:text-gray-900" />
                    )}
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a new message"
                  rows={1}
                  className="w-full min-h-[55px] max-h-40 text-base text-gray-800 placeholder-gray-400 outline-none bg-transparent resize-none pr-16 py-3"
                />

                {/* Send Button */}
                <button
                  className="absolute right-0 cursor-pointer bottom-0 flex items-center justify-center w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
                  aria-label="Send message"
                >
                  <IoMdSend className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatView
