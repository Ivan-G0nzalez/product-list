import { useMemo, FC } from 'react';
import { useQueryResponseData } from '../../../../../adapters/product/ProductResponseProvider';
import { Product } from '../../../../../domain/productModel/product.interface';
import { ProductTitle } from '../components/ProductTitle';
import { ProductImage } from '../components/ProductImage';
import { ProductButtons } from '../components/ProductButton';

export const ProductDashBoard: FC = () => {
  const products = useQueryResponseData();
  const data: Product[] = useMemo(() => products, [products]);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.length > 0 ? (
            data.map((product) => {
              console.log(product.image);
              return (
                <div key={product.id} className="cursor-pointer">
                  <div>
                    <div className="p-4 bg-indigo-500 rounded-lg">
                      <ProductTitle title={product.name} />
                      <ProductImage img={product.image} />
                      <ProductButtons id={product.id} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center items-center w-full">
              No matching records found
            </div>
          )}
        </div>
      </div>
    </>
  );
};
