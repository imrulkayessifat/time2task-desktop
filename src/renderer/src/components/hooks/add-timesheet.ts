import { create } from 'zustand'

type NewAddTimeSheetState = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const addTimeSheet = create<NewAddTimeSheetState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))
