import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ProductListWrapper } from './product-list/ProductListWrapper';

const ProductPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="products"
          element={
            <>
              <ProductListWrapper />
            </>
          }
        />
      </Route>
      <Route
        index
        element={<Navigate to="/apps/products-management/products" />}
      />
    </Routes>
  );
};

export default ProductPage;
