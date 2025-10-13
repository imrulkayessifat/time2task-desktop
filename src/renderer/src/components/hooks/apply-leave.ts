import { create } from 'zustand'

type NewApplyLeaveState = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const applyLeave = create<NewApplyLeaveState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))
