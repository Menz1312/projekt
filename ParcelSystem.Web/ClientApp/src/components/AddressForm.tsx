import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Address } from '../models/types';

export const AddressForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Pobieramy ID z URL (jeśli jest)
    const isEditMode = !!id;

    // Stan formularza
    const [formData, setFormData] = useState<Address>({
        id: 0,
        city: '',
        zipCode: '',
        street: '',
        buildingNumber: '',
        apartmentNumber: '',
        country: ''
    });

    const [loading, setLoading] = useState(false);

    // Jeśli jesteśmy w trybie edycji, pobierz dane z API
    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            fetch(`/api/address/${id}`)
                .then(response => {
                    if (!response.ok) throw new Error("Błąd pobierania");
                    return response.json();
                })
                .then(data => {
                    setFormData(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [id, isEditMode]);

    // Obsługa wpisywania danych w pola
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Wysłanie formularza
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        const url = isEditMode ? `/api/address/${id}` : '/api/address';
        const method = isEditMode ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Po sukcesie wracamy do listy
                navigate('/addresses');
            } else {
                alert('Wystąpił błąd podczas zapisywania.');
            }
        } catch (error) {
            console.error('Błąd:', error);
        }
    };

    if (loading) return <p>Ładowanie...</p>;

    return (
        <div>
            <h1>{isEditMode ? 'Edytuj adres' : 'Dodaj nowy adres'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Miasto</label>
                    <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Kod pocztowy</label>
                    <input type="text" className="form-control" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ulica</label>
                    <input type="text" className="form-control" name="street" value={formData.street} onChange={handleChange} required />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nr budynku</label>
                        <input type="text" className="form-control" name="buildingNumber" value={formData.buildingNumber} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nr lokalu (opcjonalnie)</label>
                        <input type="text" className="form-control" name="apartmentNumber" value={formData.apartmentNumber || ''} onChange={handleChange} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Kraj</label>
                    <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} required />
                </div>
                
                <button type="submit" className="btn btn-success me-2">Zapisz</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/addresses')}>Anuluj</button>
            </form>
        </div>
    );
};