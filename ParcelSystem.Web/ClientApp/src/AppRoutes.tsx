import { Home } from "./components/Home";
import { AddressList } from "./components/AddressList";
import { AddressForm } from "./components/AddressForm";

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
    path: '/address/new',       // <-- Trasa dodawania
    element: <AddressForm />
  },
  {
    path: '/address/edit/:id',  // <-- Trasa edycji (parametr :id)
    element: <AddressForm />
  }
];

export default AppRoutes;