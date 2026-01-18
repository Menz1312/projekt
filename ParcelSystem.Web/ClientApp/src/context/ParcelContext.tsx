import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Parcel } from '../models/types';

interface ParcelContextType {
    parcels: Parcel[];
    refreshParcels: () => void;
    loading: boolean;
}

const ParcelContext = createContext<ParcelContextType | undefined>(undefined);

export const ParcelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [parcels, setParcels] = useState<Parcel[]>([]);
    const [loading, setLoading] = useState(true);

    const refreshParcels = async () => {
        setLoading(true);
        try {
            const response = await fetch('api/parcel');
            if (response.ok) {
                const data = await response.json();
                setParcels(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshParcels();
    }, []);

    return (
        <ParcelContext.Provider value={{ parcels, refreshParcels, loading }}>
            {children}
        </ParcelContext.Provider>
    );
};

export const useParcels = () => {
    const context = useContext(ParcelContext);
    if (!context) throw new Error("useParcels must be used within a ParcelProvider");
    return context;
};