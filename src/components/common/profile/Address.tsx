import { useState } from "react";
import { toast } from "react-toastify";
import React, { useEffect } from 'react';
import { Role } from "@/utils/interface/enums";
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, MapPinHouse, Plus, X } from 'lucide-react';
import { setAuthUser } from "@/utils/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import AddressForm from "@/components/form/CommonForms/AddressForm";
import { CreateAddressFormType } from '@/utils/zod/commonZodFields';
import AddressListing from "@/components/common/profile/AddressListing";
import { UpdateAddressResponse } from '@/utils/interface/api/commonApiInterface';
import { UserCreateAddressResponse } from '@/utils/interface/api/userApiInterface';
import { providerFetchAddress, providerUpdateAddress } from "@/utils/apis/provider.api";
import { userCreateUserAddress, userFetchAddress, userUpdateAddress } from "@/utils/apis/user.api";

const Address: React.FC = () => {

  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const [oldAddress, setOldAddress] = useState<CreateAddressFormType>();

  const handleAddress = async (data: CreateAddressFormType) => {
    try {
      setLoading(true);
      let res: UserCreateAddressResponse | UpdateAddressResponse;

      if (authUser?.role === Role.User) {
        if (isUpdating) {
          res = await userUpdateAddress(data);
        } else {
          res = await userCreateUserAddress(data);
        }
      } else if (authUser?.role === Role.Provider) {
        res = await providerUpdateAddress(data);
      } else {
        throw new Error("Unknown role");
      }
      if (res.success) {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["userAddress"] });
        setShowAddressForm(false);
        if (authUser) {
          dispatch(setAuthUser({
            ...authUser,
            isAddressAdded: true,
          }));
        }
      }
    } catch {
      toast.error("Address updating failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    async function fetchOldAddress() {
      if (authUser?.role === Role.User) {
        const result = await userFetchAddress();
        setOldAddress(result);
      } else if (authUser?.role === Role.Provider) {
        const result = await providerFetchAddress();
        setOldAddress(result);
      }
    }

    fetchOldAddress();

  },[authUser?.role, isUpdating]);

  return (
    <div className="min-h-full flex flex-col w-full">

      <div className='border rounded-md p-2 mb-2'>
        <div className='flex justify-between items-center'>
          <div className='flex space-x-2'>
            <MapPinHouse />
            <h2 className="text-xl font-semibold"> Address</h2>
          </div>
          <Button
            variant="default"
            disabled={loading}
            onClick={() => setShowAddressForm(!showAddressForm)}
            className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
          >{showAddressForm
            ? <span className='flex items-center'><X className='mr-2' />Close</span>
            : authUser?.isAddressAdded
              ? <span className='flex items-center'><Edit className='mr-2' />  Edit Address</span>
              : <span className='flex items-center'><Plus className='mr-2' />  Add Address</span>
            }</Button>
        </div>
        {authUser?.role === "PROVIDER" && (
          <p className='w-8/12 mt-2 text-gray-500 text-sm'>Your address will be visible to customers. Please provide your service office address if you only take offline appointments; otherwise, your contact address is sufficient.</p>
        )}
      </div>

      {showAddressForm ? (
        <AddressForm
          onSubmit={handleAddress}
          formClassNames={"border rounded-lg py-6"}
          headingSize={"xs:text-md md:text-xl"}
          heading={"Address Form"}
          buttonText={"Submit"}
          setData={oldAddress}
        />
      ) : (
        <AddressListing
          fetchApiFunction={authUser?.role === "USER" ? userFetchAddress : providerFetchAddress}
          queryKey="userAddress"
          setLoading={setLoading}
          setIsUpdating={setIsUpdating}
        />
      )}
    </div>
  )
}

export default Address;