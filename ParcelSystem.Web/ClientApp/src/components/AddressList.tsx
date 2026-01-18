import React, { Component } from 'react';
import { Address } from '../models/types';
import { Link } from 'react-router-dom'; // <-- Potrzebne do nawigacji

interface AddressListState {
    addresses: Address[];
    loading: boolean;
}

export class AddressList extends Component<{}, AddressListState> {
    static displayName = AddressList.name;

    constructor(props: {}) {
        super(props);
        this.state = { addresses: [], loading: true };
    }

    componentDidMount() {
        this.populateAddressData();
    }

    // --- Funkcja usuwania ---
    async handleDelete(id: number) {
        if (!window.confirm("Czy na pewno chcesz usunąć ten adres?")) return;

        try {
            const response = await fetch(`api/address/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Odświeżamy listę lokalnie (bez ponownego pobierania wszystkiego)
                this.setState({
                    addresses: this.state.addresses.filter(a => a.id !== id)
                });
            } else {
                alert("Nie udało się usunąć adresu.");
            }
        } catch (error) {
            console.error("Błąd usuwania:", error);
        }
    }
    // ------------------------

    renderAddressesTable(addresses: Address[]) {
        return (
            <table className="table table-striped" aria-labelledby="tabelabel">
                <thead>
                    <tr>
                        <th>Miasto</th>
                        <th>Kod pocztowy</th>
                        <th>Ulica</th>
                        <th>Nr budynku</th>
                        <th>Kraj</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {addresses.map(address =>
                        <tr key={address.id}>
                            <td>{address.city}</td>
                            <td>{address.zipCode}</td>
                            <td>{address.street}</td>
                            <td>{address.buildingNumber}</td>
                            <td>{address.country}</td>
                            <td>
                                {/* Przycisk Edycji jako Link */}
                                <Link to={`/address/edit/${address.id}`} className="btn btn-warning btn-sm me-2">
                                    Edytuj
                                </Link>
                                
                                {/* Przycisk Usuwania */}
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => this.handleDelete(address.id)}
                                >
                                    Usuń
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Ładowanie...</em></p>
            : this.renderAddressesTable(this.state.addresses);

        return (
            <div>
                <h1 id="tabelabel">Adresy</h1>
                <p>Lista adresów w systemie.</p>
                {/* Przycisk Dodawania jako Link */}
                <Link to="/address/new" className="btn btn-primary mb-3">
                    Dodaj nowy adres
                </Link>
                {contents}
            </div>
        );
    }

    async populateAddressData() {
        try {
            const response = await fetch('api/address');
            if (response.ok) {
                const data = await response.json() as Address[];
                this.setState({ addresses: data, loading: false });
            } else {
                this.setState({ loading: false });
            }
        } catch (error) {
            console.error(error);
            this.setState({ loading: false });
        }
    }
}