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
    countryCode: string;
    location: {
        type: "Point",
        coordinates: [number, number]
    },
    createdAt: string;
    updatedAt: string;
}

export interface Location {
        address: {
            country: string;
            country_code: string;
            state: string;
            state_district: string;
            postcode: string;
        },
        lon: number,
        lat: number,
    }


