export interface Address {
    id: number;
    city: string;
    zipCode: string;
    street: string;
    buildingNumber: string;
    apartmentNumber?: string; // ? oznacza pole opcjonalne (nullable)
    country: string;
}

export interface Parcel {
    id: number;
    title: string;
    senderName: string;
    receiverName: string;
    status: string;
    createdAt: string; // Daty z JSON przychodzą jako stringi
    addressId: number;
    deliveryAddressInfo?: string;
}