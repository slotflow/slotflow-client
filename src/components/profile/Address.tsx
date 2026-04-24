import React from 'react';
import { MapPinHouse } from 'lucide-react';
import { fetchMyAddress } from "@/shared/apis/address";
import AddressListing from "@/components/profile/AddressListing";

const Address: React.FC = () => {

  return (
    <div className="min-h-full flex flex-col w-full">
      <div className='border rounded-md p-2 mb-2'>
        <div className='flex justify-between items-center'>
          <div className='flex space-x-2'>
            <MapPinHouse />
            <h2 className="text-xl font-semibold"> Address</h2>
          </div>
        </div>
      </div>
        <AddressListing
          fetchApiFunction={fetchMyAddress}
          queryKey="userAddress"
        />
    </div>
  )
}

export default Address;