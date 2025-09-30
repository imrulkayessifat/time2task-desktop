import React from 'react'
import { useMountedState } from 'react-use'

import AddTimesheet from '@renderer/components/timesheet/add-timesheet'

const SheetProvider: React.FC = () => {
  const isMounted = useMountedState()
  if (!isMounted) return null
  return (
    <>
      <AddTimesheet />
    </>
  )
}

export default SheetProvider
