import { WithChildren } from '../../domain/models/setUpAxios';
import { FC, useState, createContext, useContext } from 'react';
import {
  initialQueryState,
  QueryRequestContextProps,
  QueryState,
} from '../../domain/productModel/helper.interface';

const initialProductQueryRequest: QueryRequestContextProps = {
  state: initialQueryState,
  updateState: () => {},
};

const ProductQueryRequestContext = createContext<QueryRequestContextProps>(
  initialProductQueryRequest
);

const QueryRequestProvider: FC<WithChildren> = ({ children }) => {
  const [state, setState] = useState<QueryState>(
    initialProductQueryRequest.state
  );

  const updateState = (updates: Partial<QueryState>) => {
    const updatedState = { ...state, ...updates } as QueryState;
    setState(updatedState);
  };

  return (
    <ProductQueryRequestContext.Provider value={{ state, updateState }}>
      {children}
    </ProductQueryRequestContext.Provider>
  );
};

const useQueryRequest = () => useContext(ProductQueryRequestContext);
export { QueryRequestProvider, useQueryRequest };
