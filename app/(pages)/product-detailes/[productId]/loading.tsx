"use client";

import React from 'react'
import { Spinner } from '@heroui/react'

function Loading() {
  return (
    <div className=' w-full h-96 flex  items-center  justify-center'>
        <Spinner size='lg'/>
    </div>
  )
}

export default Loading