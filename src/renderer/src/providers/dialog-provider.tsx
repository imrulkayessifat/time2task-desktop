import React from 'react'
import { useMountedState } from 'react-use'

import ApplyLeave from '@renderer/components/leave/apply-leave'

const DialogProvider: React.FC = () => {
  const isMounted = useMountedState()
  if (!isMounted) return null
  return (
    <>
      <ApplyLeave />
    </>
  )
}

export default DialogProvider
