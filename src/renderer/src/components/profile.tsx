import React from 'react'
import { IoMdCloudOutline } from 'react-icons/io'

import AvatarIcon from '../assets/avatar.jpg'

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 border border-[#D9D9D9] rounded-[6px] min-h-[630px] h-full overflow-y-scroll p-[20px] m-[10px]">
      <div className="flex justify-between items-center">
        <p className="font-extralight text-[14px] leading-[16px]">Image</p>
        <div className="inline-flex justify-start">
          <img
            src={AvatarIcon} // Replace with your avatar image path or import
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-[#0981b1d8]"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-extralight text-[14px] leading-[16px]">Employee ID</p>
        <input
          type="text"
          className="p-[10px] rounded-[6px] bg-[#F0F0F0] font-light text-[14px] leading-[20px]"
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="font-extralight text-[14px] leading-[16px]">Employee Name</p>
        <input
          type="text"
          className="p-[10px] rounded-[6px] bg-[#F0F0F0] font-light text-[14px] leading-[20px]"
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="font-extralight text-[14px] leading-[16px]">Email</p>
        <input
          type="email"
          className="p-[10px] rounded-[6px] bg-[#F0F0F0] font-light text-[14px] leading-[20px]"
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="font-extralight text-[14px] leading-[16px]">Phone Number</p>
        <input
          type="number"
          className="p-[10px] rounded-[6px] bg-[#F0F0F0] font-light text-[14px] leading-[20px] appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="flex justify-between flex-col gap-2 sm:gap-0 sm:flex-row">
        <p className="font-extralight text-[14px] leading-[16px]">
          Two-factor authentication (2FA)
        </p>
        <div className="flex justify-between gap-3">
          <label className="flex justify-between text-xl">
            <input type="checkbox" className="appearance-none peer" />
            <span className="w-10 h-6 flex items-center flex-shrink-0 ml-0 sm:ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-blue-400 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-3"></span>
          </label>
          <div className="flex flex-col gap-2 ">
            <p className="font-light text-[14px] leading-[16px]">Authenticator app (TOTP)</p>
            <span className="font-extralight text-[12px] leading-[16px]">
              Use an app to receive a temporary one-time passcode each time you log in.
            </span>
          </div>
        </div>
      </div>
      <div className="border border-[#F0F0F0]"></div>
      <div className="flex flex-col sm:flex-row justify-between">
        <p className="font-extralight text-[14px] leading-[16px]">Storage</p>
        <div className="flex gap-2 items-center">
          <IoMdCloudOutline className="w-[30px] h-[30px] text-blue-400" />
          <div
            className="flex w-[200px] h-1.5 bg-gray-200 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={25}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500"
              style={{ width: '25%' }}
            ></div>
          </div>
          <p className="font-light text-[14px] leading-[19px]">5 GB out of 10 GB used</p>
        </div>
      </div>
      <div className="border border-[#F0F0F0]"></div>
      <div className="flex justify-between items-center">
        <p className="font-normal text-[14px] leading-[16px]">PIN Setting</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-extralight text-[14px] leading-[16px]">PIN</p>
        <input
          type="password"
          className="p-[10px] rounded-[6px] bg-[#F0F0F0] font-light text-[14px] leading-[20px] appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="border border-[#F0F0F0]"></div>
      <div className="flex justify-between items-center">
        <p className="font-normal text-[14px] leading-[16px]">Change Password</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-extralight text-[14px] leading-[16px]">Old Password</p>
        <input
          type="password"
          className="p-[10px] rounded-[6px] bg-[#F0F0F0] font-light text-[14px] leading-[20px] appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="font-extralight text-[14px] leading-[16px]">New Password</p>
        <input
          type="password"
          className="p-[10px] rounded-[6px] bg-[#F0F0F0] font-light text-[14px] leading-[20px] appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="font-extralight text-[14px] leading-[16px]">Confirm Password</p>
        <input
          type="password"
          className="p-[10px] rounded-[6px] bg-[#F0F0F0] font-light text-[14px] leading-[20px] appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="border border-[#F0F0F0]"></div>
      <div className="flex gap-3">
        <button className="cursor-pointer w-[100px] h-[40px] p-[10px] rounded-[5px] bg-[#F0F0F0]">
          <p className="font-light text-[14px] leading-[16px]">Clear</p>
        </button>
        <button className="cursor-pointer w-[124px] h-[40px] p-[10px] rounded-[5px] bg-gradient-to-r from-[#009DDA] to-[#294DFF]">
          <p className="font-light text-[14px] leading-[16px] text-white">Save & Change</p>
        </button>
      </div>
    </div>
  )
}

export default Profile
