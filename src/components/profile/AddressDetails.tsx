import React from 'react';
import { fetchMyAddress } from "@/shared/apis/address";
import AddressListing from "@/components/profile/AddressListing";

const AddressDetails: React.FC = () => {

  return (
    <div className="min-h-full flex flex-col w-full">
        <AddressListing
          fetchApiFunction={fetchMyAddress}
          queryKey="userAddress"
        />
    </div>
  )
}

export default AddressDetails;