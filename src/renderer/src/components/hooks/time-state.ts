import { create } from 'zustand'

interface RunningState {
  isRunning: boolean
  setIsRunning: (value: boolean) => void
  toggleRunning: () => void
}

export const useTimeState = create<RunningState>((set) => ({
  isRunning: false,
  setIsRunning: (value) => set({ isRunning: value }),
  toggleRunning: () => set((state) => ({ isRunning: !state.isRunning }))
}))
