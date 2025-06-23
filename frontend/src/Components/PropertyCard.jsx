import React from 'react'

function PropertyCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-8">
        <div className="border p-2 rounded-lg flex flex-col gap-2 hover:cursor-pointer shadow-md hover:scale-105 transition-all ease-in-out duration-300">
            <div className="flex">
                <img src="" alt="" className="w-full h-48 object-contain" />
            </div>
            <p>location</p>
            <p>price</p>
        </div>
    </div>
  )
}

export default PropertyCard