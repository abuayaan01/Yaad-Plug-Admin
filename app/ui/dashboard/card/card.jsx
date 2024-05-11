import React from 'react'
import { FcDoughnutChart } from "react-icons/fc";


function Card({icon,data,title,chart}) {
  return (
    <div className="flex-1 flex items-center justify-between bg-[#1B2537] rounded p-4">
        <div className='space-y-2'>
            {icon}
            <p className='font-semibold'>{data}</p>
            <p className='text-xs text-[#ff6287]'>{title}</p>
        </div>
        <div>
            {chart}
        </div>
    </div>
  )
}

export default Card