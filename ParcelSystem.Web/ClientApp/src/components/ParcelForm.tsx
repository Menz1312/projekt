import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Parcel, Address } from '../models/types';

export const ParcelForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;

    // Stan formularza
    const [formData, setFormData] = useState<Parcel>({
        id: 0,
        title: '',
        senderName: '',
        receiverName: '',
        status: 'Created',
        createdAt: new Date().toISOString(),
        addressId: 0,
        deliveryAddressInfo: ''
    });

    // Stan dla listy adresów (do dropdowna)
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Pobieramy listę adresów (zawsze potrzebna do selecta)
        const fetchAddresses = fetch('/api/address').then(res => res.json());

        // 2. Jeśli edycja, pobieramy dane paczki
        const fetchParcel = isEditMode 
            ? fetch(`/api/parcel/${id}`).then(res => res.json())
            : Promise.resolve(null);

        Promise.all([fetchAddresses, fetchParcel])
            .then(([addressesData, parcelData]) => {
                setAddresses(addressesData);
                
                if (parcelData) {
                    setFormData(parcelData);
                } else if (addressesData.length > 0) {
                    // Jeśli dodajemy nową, ustawiamy domyślnie pierwszy adres z listy
                    setFormData(prev => ({ ...prev, addressId: addressesData[0].id }));
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        // Konwertujemy addressId na liczbę (HTML select zwraca string)
        const payload = { ...formData, addressId: Number(formData.addressId) };

        const url = isEditMode ? `/api/parcel/${id}` : '/api/parcel';
        const method = isEditMode ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                navigate('/parcels');
            } else {
                alert('Błąd zapisu');
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <p>Ładowanie...</p>;

    return (
        <div>
            <h1>{isEditMode ? 'Edytuj przesyłkę' : 'Nowa przesyłka'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tytuł przesyłki</label>
                    <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nadawca</label>
                        <input type="text" className="form-control" name="senderName" value={formData.senderName} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Odbiorca</label>
                        <input type="text" className="form-control" name="receiverName" value={formData.receiverName} onChange={handleChange} required />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Adres dostawy</label>
                    <select className="form-select" name="addressId" value={formData.addressId} onChange={handleChange} required>
                        <option value="0" disabled>-- Wybierz adres --</option>
                        {addresses.map(addr => (
                            <option key={addr.id} value={addr.id}>
                                {addr.city}, {addr.street} {addr.buildingNumber}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                        <option value="Created">Utworzona</option>
                        <option value="InTransit">W drodze</option>
                        <option value="Delivered">Dostarczona</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-success me-2">Zapisz</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/parcels')}>Anuluj</button>
            </form>
        </div>
    );
};