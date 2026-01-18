import { Home } from "./components/Home";
import { AddressList } from "./components/AddressList";
import { AddressForm } from "./components/AddressForm";
import { ParcelList } from "./components/ParcelList"; // <-- Import
import { ParcelForm } from "./components/ParcelForm"; // <-- Import

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/addresses',
    element: <AddressList />
  },
  {
    path: '/address/new',
    element: <AddressForm />
  },
  {
    path: '/address/edit/:id',
    element: <AddressForm />
  },
  // --- Nowe trasy dla Przesyłek ---
  {
    path: '/parcels',
    element: <ParcelList />
  },
  {
    path: '/parcel/new',
    element: <ParcelForm />
  },
  {
    path: '/parcel/edit/:id',
    element: <ParcelForm />
  }
];

export default AppRoutes;