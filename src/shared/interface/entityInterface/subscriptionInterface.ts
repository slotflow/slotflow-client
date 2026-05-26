
// Provider subscription interface
export interface Subscription {
    _id: string,
    providerId: string,
    subscriptionPlanId: string,
    startDate: Date,
    endDate: Date,
    subscriptionStatus: string,
    paymentId: string,
    createdAt: string,
    updatedAt: string,
}



