// User or Provider Address interface
export interface Address {
    _id: string;
    userId: string;
    addressLine: string;
    landMark: string
    phone: string;
    place: string;
    city: string;
    district: string;
    pincode: string;
    state: string;
    country: string;
    location: {
        type: "Point",
        coordinates: [lon: number, lat: number]
    },
    createdAt: string;
    updatedAt: string;
}


