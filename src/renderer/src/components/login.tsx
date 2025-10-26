import { useNavigate } from 'react-router-dom'

import { cn } from '@renderer/lib/utils'
import time2tasklogo from '../assets/time2task.svg'
import googleIcon from '../assets/devicon_google.svg'
import appleIcon from '../assets/devicon_apple.svg'
import { FormEvent, useEffect, useState } from 'react'
import { getClientSideUser, setClientToken } from '@renderer/lib/auth'

const Login = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(' ')
  const navigate = useNavigate()

  useEffect(() => {
    const userData = getClientSideUser()
    if (userData && userData.session) {
      navigate('/dashboard')
    }
  }, [navigate])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(' ')

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    const rememberMe = true

    const response = await fetch(`${import.meta.env.VITE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        rememberMe: rememberMe
      })
    })

    console.log(response.ok)

    if (!response.ok) {
      setIsLoading(false)
      setError('Failed to contact server.')
      return
    }

    const { data, success } = await response.json()
    console.log('success', success, data)
    setIsLoading(false)
    if (!success) {
      setError('Invalid email or password.')
    } else {
      const success = setClientToken(data.token)
      if (!success) {
        throw new Error('Failed to set authentication cookie')
      }
      localStorage.setItem('user', JSON.stringify(data))
      navigate('/dashboard')
    }
  }
  return (
    <div className="flex h-screen w-full bg-white items-center justify-center">
      <div className="flex flex-col gap-[26px] px-[30px] py-[50px] min-w-[460px] min-h-[696px] w-[460px] h-[696px] items-center justify-center">
        <div className="inline-flex items-center gap-2">
          <img alt="time2task" className="logo h-9 w-9" src={time2tasklogo} />
          <h1 className="font-bold text-xl text-[#213343]">Time2Task</h1>
        </div>
        <div className="flex items-center flex-col gap-[26px] w-full max-w-md">
          <p className="leading-[46px] text-[20px] font-medium">Login to your account</p>
          <div className="flex flex-col gap-[16px] w-full">
            <div className="flex cursor-pointer items-center justify-center border border-black/15 gap-2 rounded-md w-full py-1.5">
              <img alt="google" className="logo h-6 w-6" src={googleIcon} />
              <span className="font-light text-[14px] leading-5">Continue with Google</span>
            </div>
            <div className="flex cursor-pointer items-center justify-center border border-black/15 gap-2 rounded-md w-full py-1.5">
              <img alt="apple" className="logo h-6 w-6" src={appleIcon} />
              <span className="font-light text-[14px] leading-5">Continue with Apple</span>
            </div>
            <div className="flex items-center w-full">
              <div className="flex-grow h-px bg-black/15"></div>
              <span className="px-3 text-[#7C7C7C] text-[14px] leading-5 font-light">
                Or continue with email
              </span>
              <div className="flex-grow h-px bg-black/15"></div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5 w-full">
            <div>
              <p className="text-base leading-5 font-normal text-red-500 text-left">
                <span>{error}</span>
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-[14px] leading-5 font-light">Email*</span>
              <input
                disabled={isLoading}
                type="email"
                name="email"
                placeholder="Enter email address"
                className={cn(
                  'px-2 h-10 rounded-md border border-black/15',
                  isLoading && 'opacity-25 cursor-not-allowed'
                )}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-[14px] leading-5 font-light">Password*</span>
              <input
                disabled={isLoading}
                type="password"
                name="password"
                placeholder="Enter password"
                className={cn(
                  'px-2 h-10 rounded-md border border-black/15',
                  isLoading && 'opacity-25 cursor-not-allowed'
                )}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className={cn(
                'h-10 cursor-pointer bg-gradient-to-r from-[#009DDA] to-[#294DFF] inline-flex items-center justify-center rounded-md text-white w-full',
                isLoading && 'opacity-25 cursor-not-allowed'
              )}
            >
              Sign In
            </button>
            <a
              href="/forgot-password"
              className="hover:underline text-[14px] leading-5 font-light text-[#009DDA]"
            >
              Forgot password?
            </a>
          </form>
          <div className="flex justify-center gap-1 w-full">
            <p className="font-extralight text-[14px] leading-5">Don&apos;t have an account?</p>
            <a
              href="/sign-up"
              className="hover:underline text-[14px] leading-5 font-normal text-[#294DFF]"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
