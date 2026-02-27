import React from 'react'
import { Search } from 'lucide-react'

const LooseDiamond = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
      <div className='bg-gray-100 rounded-full p-6'>
        <Search className='w-12 h-12 text-gray-400' />
      </div>
      <h2 className='text-2xl font-bold text-slate-800'>No products found</h2>
      <p className='text-gray-400 text-sm'>We are working on it — new products will be added soon!</p>
    </div>
  )
}

export default LooseDiamond