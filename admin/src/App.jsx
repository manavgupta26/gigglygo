import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import Orders from "./pages/Orders";

function PrivateRoute({ children }) {
  const token = localStorage.getItem(
    "adminToken"
  );

  return token
    ? children
    : <Navigate to="/" />;
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/categories"
        element={
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        }
      />

      <Route
        path="/products"
        element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        }
      />

      <Route
        path="/products/add"
        element={
          <PrivateRoute>
            <ProductForm />
          </PrivateRoute>
        }
      />
<Route
  path="/products/edit/:id"
  element={
    <PrivateRoute>
      <ProductForm />
    </PrivateRoute>
  }
/>
<Route
  path="/orders"
  element={
    <PrivateRoute>
      <Orders />
    </PrivateRoute>
  }
/>
    </Routes>
  );
}



export default App;