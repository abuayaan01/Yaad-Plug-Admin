import React from 'react'
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { IoMdCheckboxOutline } from "react-icons/io";
import { BsBoxArrowUpRight } from "react-icons/bs";

function page() {
    return (
        <div className='bg-[#1B2537] w-full px-4 py-4 rounded' >
            <div className='flex justify-between '>
                <p> <span className="text-pink-700 font-bold text-sm ">Inquiry ID: </span> 04</p>
                <p>Date: 27/02/2024</p>
            </div>
            <div className='w-full flex flex-row'>
                <div className='w-1/2 pr-4 '>

                    <div><p className='text-base font-bold my-5 mb-7'> Package Information</p>
                        <div><p className='font-bold mb-2'> About</p>
                            <p className='mb-2 pb-2 text-xs border-b border-gray-900 '> The package is Red and White Color Glass Box With card Board Packaging</p>
                            <p className='font-bold pb-2'> Quantity</p>
                            <p className='text-xs'> 10</p>
                        </div>
                    </div>
                    <div className='my-4'>
                        <p className='text-base font-bold'> Pickup Details:</p>
                        <div className='flex flex-row mt-3 justify-between'>
                            <div className='  w-[24%]  pb-2'><p className='mb-1' >Name</p>
                                <p className=' border-b border-gray-900 text-xs  pb-2'>John Doe</p>
                            </div>
                            <div className='  w-[24%] pb-2'><p className='mb-1'>Contact</p>
                                <p className='border-b border-gray-900 text-xs pb-2'> 8409705445</p>
                            </div>
                            <div className='  w-[24%]  pb-2'> <p className='mb-1'>Time</p>
                                <p className='border-b border-gray-900 text-xs pb-2'> 09:30</p>
                            </div >
                            <div className='  w-[24%]  pb-2'><p className='mb-1'>Date</p>
                                <p className='border-b border-gray-900 text-xs  pb-2'>2024-02-15</p>
                            </div>


                        </div>
                        <div className='flex flex-row mt-3 w-1/2 justify-between '>
                            <div className='w-[48%]'><p className='mb-1'>Email</p>
                                <p className='border-b text-xs pb-2 border-gray-900'>pk@gamil.com</p>
                            </div>
                            <div className=' w-[48%]'><p className='mb-1'>Address</p>
                                <p className='border-b pb-2 text-xs border-gray-900'>patna,bihar,India</p>
                            </div>

                        </div>
                    </div>


                    <div className='my-2'><p className=' text-base font-bold'>Order Fare</p>
                        <div className='my-2'><p className='mb-5'>Order Fare By User: <span className='text-yellow-400'>$28.8</span> <span className='text-red-800 font-bold'>+ $70</span></p>
                            <p className='pb-5'>Received Order fare: <span className='text-green-800 font-bold'>$98.34</span> </p>
                        </div>
                    </div>



                </div>

                <div className='w-1/2 pl-4'>

                    <div>
                        <div className='flex justify-end my-5'><div className='text-xs mt-2 '> Click to view Images  </div> <div><p className='pb-2'><BsBoxArrowInUpRight className=' ml-2 text-2xl text-red-600'/></p></div> </div>
                       <div className='flex justify-between'> 
                        <div className=' w-[33%]'><p className='  font-bold  mb-2'>Type</p>
                            <p className=' border-b border-gray-900 text-xs  pb-2 '>Electronics</p>
                        </div>
                        <div className='w-[33%]'><p className='font-bold mb-2 text-xs'>Weight- <span className='text-xs font-light'>in KG</span></p>
                            <p className=' border-b text-xs border-gray-900 pb-2'>900</p>
                        </div>
                        <div className='w-[33%]'>
                            <div> 
                            <p className='font-bold mb-2'>Packaging Type</p>
                            <p className=' border-b border-gray-900 pb-2 text-xs'>Cartoons</p> 
                            </div>
                            <div> 
                            <p className='font-bold mb-2 pt-2'>Dimensions- <span className='text-xs font-light'>in cm</span></p>
                            <div className='flex justify-between font-light text-xs'><p>L: <span className=' border-b border-gray-900 '>10</span></p><p>W: <span className=' border-b border-gray-900 '>10</span></p><p>H: <span className=' border-b border-gray-900 '>10</span></p></div> 
                            </div>
                            
                        </div>
                        </div>
                    </div>
                    <div className='my-4'>
                        <p className='text-base font-bold'> Delivery Details:</p>
                        <div className='flex flex-row mt-3 justify-between'>
                            <div className='  w-[24%]  pb-2'><p className='mb-1' >Name</p>
                                <p className=' border-b border-gray-900 text-xs  pb-2'>John Doe</p>
                            </div>
                            <div className='  w-[24%] pb-2'><p className='mb-1'>Contact</p>
                                <p className='border-b border-gray-900 text-xs pb-2'> 8409705445</p>
                            </div>
                            <div className='  w-[24%]  pb-2'> <p className='mb-1'>Time</p>
                                <p className='border-b border-gray-900 text-xs pb-2'> 09:30</p>
                            </div >
                            <div className='  w-[24%]  pb-2'><p className='mb-1'>Date</p>
                                <p className='border-b border-gray-900 text-xs  pb-2'>2024-02-15</p>
                            </div>


                        </div>
                        <div className='flex flex-row mt-3 w-1/2 justify-between '>
                            <div className='w-[48%]'><p className='mb-1'>Email</p>
                                <p className='border-b text-xs pb-2 border-gray-900'>pk@gamil.com</p>
                            </div>
                            <div className=' w-[48%]'><p className='mb-1'>Address</p>
                                <p className='border-b pb-2 text-xs border-gray-900'>patna,bihar,India</p>
                            </div>

                        </div>
                    </div>


                    <div className='my-2'><p className=' text-base font-bold'>Preferences:</p>
                        <div className='my-2 flex'>
                            <div className='flex flex-col'>
                            <p className='mb-5 flex'> <IoMdCheckboxOutline className='text-lg text-green-600 mr-2' />Handle With Care</p>
                            <p className='pb-5 flex'> <IoMdCheckboxOutline className='text-lg mr-2 text-gray-600'/>Door-to-Door</p>
                            </div>
                            <div className='flex flex-col mx-3'>
                            <p className='mb-5 flex'> <IoMdCheckboxOutline className='text-lg mr-2 text-gray-600'/>Insurance</p>
                            <p className='pb-5 flex'> <IoMdCheckboxOutline className='text-lg text-green-600 mr-2'/>Mover</p>
                            </div>
                        </div>
                
                    </div>



                </div>


            </div>
            <div className='pb-5'>
                <button
                    type="submit"
                    className="bg-pink-700 text-white font-bold py-2 mt-4 px-4 rounded"
                >
                    Confirm
                </button>
                <button
                    type="submit"
                    className="bg-gray-300 text-red-600 font-bold py-2 ml-4 mt-4 px-4 rounded"
                >
                    Reject
                </button>
            </div>
        </div>
    )
}

export default page