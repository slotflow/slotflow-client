// Provider
export interface Provider {
  _id: string;
  username: string;
  email: string;
  password: string;
  isBlocked: boolean;
  isEmailVerified: boolean;
  isAdminVerified: boolean;
  phone: string;
  profileImage: string;
  addressId: string;
  serviceId: string;
  serviceAvailabilityId: string;
  subscription: [string];
  verificationToken: string;
  trustedBySlotflow: boolean;
  identityProof: string | FileList;
  serviceProof: string | FileList;
  createdAt: string;
  updatedAt: string;
}





//  **** PROVIDER COMPONENT / PAGES INTERFACES START **** //

// This is the interface of a right side showing compoenent in the provider address adding, service adding and availability adding page
export interface SideBoxProps {
  props: {
    pageNumber: number;
  };
}




// Plan list interface showing in provider subscription page


// Payment confirmation page interface 
export interface PaymentConfirmPageProps {
  status: boolean;
  userType: string;
}

//  **** PROVIDER COMPONENT / PAGES INTERFACES END **** //
