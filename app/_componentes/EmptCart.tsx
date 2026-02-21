import React from 'react'
import Link from 'next/link'


function EmptCart() {
  return (
    <div className=' w-full h-96 flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-bold text-gray-900 mb-1'>Your Cart Is Empty</h2>
         <Link href={"/products"} className=' active:bg-blue-400 text-white font-semibold text-xl bg-blue-600 p-3 rounded-xl'>Add Onesh</Link>
    </div>
  )
}

export default EmptCart