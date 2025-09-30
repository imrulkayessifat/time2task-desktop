import React from 'react'
import { LuNotepadText } from 'react-icons/lu'
import { BiMessageRounded } from 'react-icons/bi'
import { Check, ChevronsUpDown } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '../ui/command'
import { cn } from '@renderer/lib/utils'
import { Progress } from '../ui/progress'
import { addTimeSheet } from '../hooks/add-timesheet'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Sheet, SheetContent, SheetFooter, SheetHeader } from '../ui/sheet'

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

const AddTimesheet: React.FC = () => {
  const { isOpen, onClose } = addTimeSheet()
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className="flex  gap-3">
          <div className="flex gap-2">
            <LuNotepadText className="w-4 h-4" />
            <p className="font-normal text-[18px] leading-[16px]">Add Timesheet</p>
          </div>
        </SheetHeader>
        <div className="grid w-full flex-1 auto-rows-min gap-6 px-4">
          <div className="flex items-center w-full gap-3">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  role="combobox"
                  aria-expanded={open}
                  className="inline-flex p-2 w-1/2 cursor-pointer rounded border border-gray-300 items-center justify-between"
                >
                  {value
                    ? frameworks.find((framework) => framework.value === value)?.label
                    : 'Select project'}
                  <ChevronsUpDown className="opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
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
            <div className="flex items-center gap-2 w-1/2">
              <Progress className="bg-gray-400" value={33} />
              <p className="font-extralight text-[14px] leading-[16px]">33%</p>
            </div>
          </div>
          <div className="flex flex-1 flex-wrap gap-3">
            <div className="flex flex-col gap-1">
              <p className="font-extralight text-[12px] leading-[16px]">Assign Date</p>
              <input
                className="border bg-[#F7F7F7] border-gray-300 rounded p-2"
                type="date"
                id="assign-date"
                name="Assign Date"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-extralight text-[12px] leading-[16px]">From Time</p>
              <input
                className="border bg-[#F7F7F7] border-gray-300 rounded p-2"
                type="time"
                id="from-time"
                name="From Time"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-extralight text-[12px] leading-[16px]">To Time</p>
              <input
                className="border bg-[#F7F7F7] border-gray-300 rounded p-2"
                type="time"
                id="to-time"
                name="To Time"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-2">
              <BiMessageRounded className="w-4 h-4" />
              <p className="font-light text-[14px] leading-[20px]">Reason</p>
            </div>
            <textarea
              className="border bg-[#F7F7F7] border-gray-300 rounded p-2"
              id="reason"
              name="Reason"
            ></textarea>
          </div>
        </div>
        <SheetFooter className="flex flex-row justify-end gap-2">
          <button onClick={onClose} className="bg-[#F0F0F0] cursor-pointer rounded-[5px] p-[10px]">Close</button>
          <button
            className="bg-gradient-to-r cursor-pointer text-white from-[#009DDA] to-[#294DFF] rounded-[5px] p-[10px]"
            type="submit"
          >
            Save
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default AddTimesheet
