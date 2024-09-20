import { useEffect } from 'react';
import { useListView } from '../../../../adapters/product/ListProductProvider';
// import { UserEditModalHeader } from './UserEditModalHeader';
// import { UserEditModalFormWrapper } from './UserEditModalFormWrapper';

const ProductEditModal = () => {
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const { setItemIdForUpdate } = useListView();
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal fade show d-block bg-black bg-opacity-50" />
      <div className="modal-dialog modal-dialog-centered bg-white rounded-lg shadow-lg">
        <div className="modal-content">
          <div className="modal-body p-4">
            {/* <UserEditModalFormWrapper /> */}
            <div>
              <h2 className="text-lg">Productos</h2>
            </div>
            <div>
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setItemIdForUpdate(undefined)}
              >
                <span className="sr-only">Close menu</span>

                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductEditModal };
