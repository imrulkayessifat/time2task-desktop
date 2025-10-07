import React, { useState } from 'react'
import {
  Search,
  MoreVertical,
  ChevronDown,
  Plus,
  Send,
  Paperclip,
  Smile,
  Image,
  Mic,
  X,
  Menu
} from 'lucide-react'

const Chat: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMediaPanelOpen, setIsMediaPanelOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('media')
  const [message, setMessage] = useState('')

  const teams = [
    { name: 'Time To Task', icon: '#' },
    { name: 'Time Tracking Application', icon: '#' },
    { name: 'THCL_OXIDE', icon: '#' }
  ]

  const members = [
    { name: 'Jerome Bell', avatar: '👤', online: true },
    { name: 'Kristin Watson', avatar: '👤', online: false },
    { name: 'Cody Fisher', avatar: '👤', online: false },
    { name: 'Theresa Webb', avatar: '👤', online: false },
    { name: 'Marvin McKinney', avatar: '👤', online: false }
  ]

  const messages = [
    {
      date: 'Yesterday 02/08/2025',
      items: [
        {
          text: 'I know Krystal really wanted to make a good impression especially since this is a new client.',
          sender: 'Jerome Bell',
          time: null
        },
        {
          text: "I'm pretty confident that this launch will be successful. The team has worked tirelessly to make it possible. This is going to be awesome.",
          sender: 'Jerome Bell',
          time: null
        },
        {
          text: "The client wasn't expecting us to be ready until middle of August anyways",
          sender: 'Jerome Bell',
          time: null
        }
      ]
    },
    {
      date: 'Today 02/09/2025',
      items: [
        { text: 'Thank you for always being so positive!', sender: 'You', time: null, likes: 1 },
        { text: "We haven't had a break in awhile.", sender: 'You', time: null },
        { text: 'Sales report', sender: 'You', time: null, attachment: true }
      ]
    }
  ]

  const mediaImages = Array(9).fill('🖼️')

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* Left Sidebar - Desktop */}
      <div className="hidden lg:block w-80 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search person, channels"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Teams Section */}
        <div className="p-4">
          <button className="flex items-center gap-2 text-sm font-semibold mb-2 w-full">
            <ChevronDown className="w-4 h-4" />
            <span>Teams</span>
          </button>
          <div className="space-y-1 ml-2">
            {teams.map((team, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
              >
                <span className="text-gray-600">{team.icon}</span>
                <span>{team.name}</span>
              </div>
            ))}
            <button className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer text-sm">
              <Plus className="w-4 h-4" />
              <span>Add team</span>
            </button>
          </div>
        </div>

        {/* Members Section */}
        <div className="p-4">
          <button className="flex items-center gap-2 text-sm font-semibold mb-2 w-full">
            <ChevronDown className="w-4 h-4" />
            <span>Member</span>
          </button>
          <div className="space-y-1 ml-2">
            {members.map((member, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
                  idx === 0 ? 'bg-blue-50' : 'hover:bg-gray-100'
                }`}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    {member.avatar}
                  </div>
                  {member.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <span className="text-sm">{member.name}</span>
              </div>
            ))}
            <button className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer text-sm">
              <Plus className="w-4 h-4" />
              <span>Invite member</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="font-semibold">Jerome Bell</h2>
            </div>
          </div>
          <button
            onClick={() => setIsMediaPanelOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
              {messages.map((group, gIdx) => (
                <div key={gIdx}>
                  <div className="text-center text-xs text-gray-500 mb-4">{group.date}</div>
                  <div className="space-y-3">
                    {group.items.map((msg, mIdx) => (
                      <div
                        key={mIdx}
                        className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-md md:max-w-lg ${msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} rounded-2xl px-4 py-3`}
                        >
                          {msg.attachment ? (
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
                                📊
                              </div>
                              <span className="font-medium">{msg.text}</span>
                            </div>
                          ) : (
                            <p className="text-sm">{msg.text}</p>
                          )}
                          {msg.likes && (
                            <div className="mt-2 flex items-center gap-1">
                              <span>👍</span>
                              <span className="text-xs">{msg.likes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex flex-col gap-2 border-t border-gray-200 p-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border border-gray-300 p-1 shrink bg-transparent outline-none text-sm resize"
                placeholder="Type a message..."
              />
              <div className="flex justify-between items-center gap-2 py-2">
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-gray-200 rounded-full">
                    <Plus className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded-full">
                    <Paperclip className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded-full">
                    <Smile className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded-full">
                    <Image className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded-full">
                    <Mic className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <button className="p-2 bg-blue-500 rounded-full hover:bg-blue-600">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Media Panel (Desktop) */}
          <div className="hidden lg:block w-80 border-l border-gray-200 bg-white overflow-y-auto flex-shrink-0">
            <div className="flex gap-4 mb-4 p-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('media')}
                className={`pb-2 text-sm font-medium ${
                  activeTab === 'media' ? 'text-black border-b-2 border-black' : 'text-gray-500'
                }`}
              >
                Media
              </button>
              <button
                onClick={() => setActiveTab('files')}
                className={`pb-2 text-sm font-medium ${
                  activeTab === 'files' ? 'text-black border-b-2 border-black' : 'text-gray-500'
                }`}
              >
                Files
              </button>
              <button
                onClick={() => setActiveTab('links')}
                className={`pb-2 text-sm font-medium ${
                  activeTab === 'links' ? 'text-black border-b-2 border-black' : 'text-gray-500'
                }`}
              >
                Links
              </button>
            </div>

            {activeTab === 'media' && (
              <div className="grid grid-cols-3 p-4 gap-2">
                {mediaImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-3xl cursor-pointer hover:opacity-80"
                  >
                    {img}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'files' && (
              <div className="space-y-2 p-4">
                <p className="text-sm text-gray-500">No files shared yet</p>
              </div>
            )}

            {activeTab === 'links' && (
              <div className="space-y-2 p-4">
                <p className="text-sm text-gray-500">No links shared yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Left Sidebar - Mobile/Tablet (Sliding Panel) */}
      <div
        className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden fixed left-0 top-0 z-50 w-80 h-full bg-white border-r border-gray-200 transition-transform duration-300`}
      >
        <div className="relative h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-semibold">Teams & Members</h3>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search person, channels"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Teams Section */}
            <div className="p-4">
              <button className="flex items-center gap-2 text-sm font-semibold mb-2 w-full">
                <ChevronDown className="w-4 h-4" />
                <span>Teams</span>
              </button>
              <div className="space-y-1 ml-2">
                {teams.map((team, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
                  >
                    <span className="text-gray-600">{team.icon}</span>
                    <span>{team.name}</span>
                  </div>
                ))}
                <button className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer text-sm">
                  <Plus className="w-4 h-4" />
                  <span>Add team</span>
                </button>
              </div>
            </div>

            {/* Members Section */}
            <div className="p-4">
              <button className="flex items-center gap-2 text-sm font-semibold mb-2 w-full">
                <ChevronDown className="w-4 h-4" />
                <span>Member</span>
              </button>
              <div className="space-y-1 ml-2">
                {members.map((member, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
                      idx === 0 ? 'bg-blue-50' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        {member.avatar}
                      </div>
                      {member.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <span className="text-sm">{member.name}</span>
                  </div>
                ))}
                <button className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer text-sm">
                  <Plus className="w-4 h-4" />
                  <span>Invite member</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Media Panel (Mobile/Tablet) */}
      <div
        className={`${isMediaPanelOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden fixed right-0 top-0 z-50 w-80 h-full bg-white border-l border-gray-200 transition-transform duration-300`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Details</h3>
            <button
              onClick={() => setIsMediaPanelOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="flex gap-4 mb-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('media')}
                className={`pb-2 text-sm font-medium ${
                  activeTab === 'media' ? 'text-black border-b-2 border-black' : 'text-gray-500'
                }`}
              >
                Media
              </button>
              <button
                onClick={() => setActiveTab('files')}
                className={`pb-2 text-sm font-medium ${
                  activeTab === 'files' ? 'text-black border-b-2 border-black' : 'text-gray-500'
                }`}
              >
                Files
              </button>
              <button
                onClick={() => setActiveTab('links')}
                className={`pb-2 text-sm font-medium ${
                  activeTab === 'links' ? 'text-black border-b-2 border-black' : 'text-gray-500'
                }`}
              >
                Links
              </button>
            </div>

            {activeTab === 'media' && (
              <div className="grid grid-cols-3 gap-2">
                {mediaImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-3xl cursor-pointer hover:opacity-80"
                  >
                    {img}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'files' && (
              <div className="space-y-2">
                <p className="text-sm text-gray-500">No files shared yet</p>
              </div>
            )}

            {activeTab === 'links' && (
              <div className="space-y-2">
                <p className="text-sm text-gray-500">No links shared yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {(isSidebarOpen || isMediaPanelOpen) && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
          onClick={() => {
            setIsSidebarOpen(false)
            setIsMediaPanelOpen(false)
          }}
        ></div>
      )}
    </div>
  )
}

export default Chat
