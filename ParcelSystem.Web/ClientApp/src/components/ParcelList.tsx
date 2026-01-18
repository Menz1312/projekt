import React from 'react';
import { Link } from 'react-router-dom';
import { useParcels } from '../context/ParcelContext'; // <-- Użycie Context API

export const ParcelList: React.FC = () => {
    // Pobieramy dane z globalnego Contextu zamiast z lokalnego state
    const { parcels, loading, refreshParcels } = useParcels();

    const handleDelete = async (id: number) => {
        if (!window.confirm("Czy na pewno chcesz usunąć tę przesyłkę?")) return;
        try {
            const response = await fetch(`api/parcel/${id}`, { method: 'DELETE' });
            if (response.ok) {
                refreshParcels(); // Odświeżamy dane w Contexcie
            } else {
                alert("Nie udało się usunąć przesyłki.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <p><em>Ładowanie (z Context API)...</em></p>;

    return (
        <div>
            <h1 id="tabelabel">Przesyłki</h1>
            <p>Zarządzanie przesyłkami (dane z Context API).</p>
            <Link to="/parcel/new" className="btn btn-primary mb-3">Nowa przesyłka</Link>
            <table className="table table-striped" aria-labelledby="tabelabel">
                <thead>
                    <tr>
                        <th>Tytuł</th>
                        <th>Nadawca</th>
                        <th>Odbiorca</th>
                        <th>Adres dostawy</th>
                        <th>Status</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map(parcel =>
                        <tr key={parcel.id}>
                            <td>{parcel.title}</td>
                            <td>{parcel.senderName}</td>
                            <td>{parcel.receiverName}</td>
                            <td>{parcel.deliveryAddressInfo || 'Brak adresu'}</td>
                            <td>{parcel.status}</td>
                            <td>
                                <Link to={`/parcel/edit/${parcel.id}`} className="btn btn-warning btn-sm me-2">Edytuj</Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(parcel.id)}>Usuń</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};