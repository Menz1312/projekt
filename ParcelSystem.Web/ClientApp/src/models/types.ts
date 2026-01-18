export interface Address {
    id: number;
    city: string;
    zipCode: string;
    street: string;
    buildingNumber: string;
    apartmentNumber?: string;
    country: string;
}

export interface Parcel {
    id: number;
    title: string;
    senderName: string;
    receiverName: string;
    status: string;
    createdAt: string;
    addressId: number;
    deliveryAddressInfo?: string;
}