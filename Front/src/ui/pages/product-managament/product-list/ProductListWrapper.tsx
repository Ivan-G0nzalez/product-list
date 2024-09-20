import { FC } from 'react';
import { QueryResponseProvider } from '../../../../adapters/product/ProductResponseProvider';
import { QueryRequestProvider } from '../../../../adapters/product/ProductRequestProvider';
import { ProductDashBoard } from './dashboard/ProductDashboard';
import { useListView } from '../../../../adapters/product/ListProductProvider';
import { ProductEditModal } from '../form/ProductEditForm';

const ProductList: FC = () => {
  const { itemIdForUpdate } = useListView();
  return (
    <>
      <ProductDashBoard />

      {itemIdForUpdate !== undefined && <ProductEditModal />}
    </>
  );
};

const ProductListWrapper: FC = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ProductList />
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { ProductListWrapper };
