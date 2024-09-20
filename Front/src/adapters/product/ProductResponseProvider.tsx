/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';

import { QUERIES } from '../../helper/crup-helper/consts';
import { getProducts } from '../../services/Product.services';
import { Product } from '../../domain/productModel/product.interface';
import { useQueryRequest } from './ProductRequestProvider';
import {
  createResponseContext,
  stringifyRequestQuery,
} from '../../helper/crup-helper/paginatorHelper';
import {
  initialQueryResponse,
  PaginationState,
} from '../../domain/productModel/helper.interface';
import { WithChildren } from '../../domain/models/setUpAxios';
import { initialQueryState } from '../../domain/productModel/helper.interface';

const QueryResponseContext =
  createResponseContext<Product>(initialQueryResponse);
const QueryResponseProvider: FC<WithChildren> = ({ children }) => {
  const { state } = useQueryRequest();
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state));
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state]);

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
    }
  }, [updatedQuery]);

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${QUERIES.PRODUCT_LIST}-${query}`,
    () => {
      return getProducts(query);
    },
    { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
  );

  return (
    <QueryResponseContext.Provider
      value={{ isLoading: isFetching, refetch, response, query }}
    >
      {children}
    </QueryResponseContext.Provider>
  );
};

const useQueryResponse = () => useContext(QueryResponseContext);

const useQueryResponseData = () => {
  const { response } = useQueryResponse();
  if (!response) {
    return [];
  }

  return response?.data || [];
};

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    links: [],
    ...initialQueryState,
  };

  const { response } = useQueryResponse();
  if (!response || !response.payload || !response.payload.pagination) {
    return defaultPaginationState;
  }

  return response.payload.pagination;
};

const useQueryResponseLoading = (): boolean => {
  const { isLoading } = useQueryResponse();
  return isLoading;
};

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
};
