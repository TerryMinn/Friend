"use client"

import { Loader2 } from 'lucide-react'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-neutral-800">
     <Loader2  className='animate-pulse'/>
    </div>
  )
}

export default Loading