import React from 'react'
import OrdersTable from './orders-table'

function RecentOrders() {
  return (
    <div className='flex-1 bg-[#1B2537] rounded p-4'>
      <div>
        <p className='font-semibold'>Recent Orders</p>
        <OrdersTable />
      </div>
    </div>
  )
}

export default RecentOrders