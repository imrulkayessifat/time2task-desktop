import { useState } from 'react'
import { X, MessageCircle } from 'lucide-react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@renderer/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

import { Dialog, DialogContent } from '../ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../ui/select'

import { applyLeave } from '../hooks/apply-leave'
const ApplyLeave = () => {
  const { isOpen, onClose } = applyLeave()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const frameworks = [
    {
      value: 'next.js',
      label: 'Next.js'
    },
    {
      value: 'sveltekit',
      label: 'SvelteKit'
    },
    {
      value: 'nuxt.js',
      label: 'Nuxt.js'
    },
    {
      value: 'remix',
      label: 'Remix'
    },
    {
      value: 'astro',
      label: 'Astro'
    }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form>
        <DialogContent className="flex flex-col sm:max-w-[425px]">
          <div className="flex justify-between py-[15px] px-4 items-center border-b border-gray-300">
            <p className="text-[14px] leading-[16px]">Apply Leave</p>
            <X onClick={onClose} className="h-6 w-6 cursor-pointer" />
          </div>
          <div className="flex flex-col gap-4 py-[10px] px-4">
            <div className="flex w-full gap-2">
              <div className="flex flex-col gap-[6px] w-1/2">
                <p className="font-light text-[14px] leading-[16px]">From Date</p>
                <input type="date" className="border border-gray-300 rounded-[6px] p-2" />
              </div>
              <div className="flex flex-col gap-[6px] w-1/2">
                <p className="font-light text-[14px] leading-[16px]">To Date</p>
                <input type="date" className="border border-gray-300 rounded-[6px] p-2" />
              </div>
            </div>
            <div className="flex w-full justify-between gap-2">
              <div className="flex flex-col gap-[6px]">
                <p className="font-light text-[14px] leading-[16px]">Leave Type</p>
                <Select>
                  <SelectTrigger className="border border-gray-300 rounded-[6px] p-2 w-full">
                    <SelectValue placeholder="Select a leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-[6px]">
                <p className="font-light text-[14px] leading-[16px]">Total Leave</p>
                <p className="font-light text-[14px] leading-[16px]">---</p>
              </div>
              <div className="flex flex-col gap-[6px]">
                <p className="font-light text-[14px] leading-[16px]">Holiday Remaining</p>
                <p className="font-light text-[14px] leading-[16px]">---</p>
              </div>
            </div>
            <p className="font-light text-[14px] leading-[16px]">Approval:</p>
            <div className="flex w-full justify-between gap-2">
              <div className="flex flex-col gap-[6px] ">
                <p className="font-light text-[14px] leading-[16px]">Delegate to</p>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <button className="border w-[150px] border-gray-300 rounded-[6px] p-2  flex items-center justify-between">
                      {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : 'Delegate...'}
                      <ChevronsUpDown className="opacity-50" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search framework..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {frameworks.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setValue(currentValue === value ? '' : currentValue)
                                setOpen(false)
                              }}
                            >
                              {framework.label}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  value === framework.value ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-[6px] ">
                <p className="font-light text-[14px] leading-[16px]">Leave Approver</p>
                <p className="font-light text-[14px] leading-[16px]">---</p>
              </div>
              <div className="flex flex-col gap-[6px] ">
                <p className="font-light text-[14px] leading-[16px]">Approval Time</p>
                <p className="font-light text-[14px] leading-[16px]">---</p>
              </div>
            </div>
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <p className="font-light text-[14px] leading-[16px]">Reason:</p>
              </div>
              <textarea className="p-[10px] border border-gray-300 rounded-[6px] bg-[7C7C7C]" />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="cursor-pointer w-[100px] h-[40px] p-[10px] rounded-[5px] bg-[#F0F0F0]"
              >
                <p className="font-light text-[14px] leading-[16px]">Cancel</p>
              </button>
              <button className="cursor-pointer w-[124px] h-[40px] p-[10px] rounded-[5px] bg-gradient-to-r from-[#009DDA] to-[#294DFF]">
                <p className="font-light text-[14px] leading-[16px] text-white">Submit</p>
              </button>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default ApplyLeave
