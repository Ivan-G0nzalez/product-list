import { useListView } from '../../../../../adapters/product/ListProductProvider';
import { ID } from '../../../../../domain/productModel/helper.interface';

export const ProductButtons = ({ id }: { id: ID }) => {
  const { setItemIdForUpdate } = useListView();
  return (
    <div className="text-base h-10 p-2 w-8">
      <button
        className="px-6 py-2 rounded-lg bg-gray-100"
        onClick={() => setItemIdForUpdate(id)}
      >
        edit
      </button>
    </div>
  );
};
