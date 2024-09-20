import { Dispatch, SetStateAction } from 'react';

export interface SortState {
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface FilterState {
  filter?: unknown;
}

export interface SearchState {
  search?: string;
}

export interface PaginationState {
  page: number;
  items_per_page: 10 | 16 | 30 | 50 | 100;
  links?: Array<{
    label: string;
    active: boolean;
    url: string | null;
    page: number | null;
  }>;
  last_page: number;
}

export type QueryState = PaginationState &
  SortState &
  FilterState &
  SearchState;

export interface QueryRequestContextProps {
  state: QueryState;
  updateState: (updates: Partial<QueryState>) => void;
}

export type ID = undefined | null | number;

export type Response<T> = {
  data?: T;
  payload?: {
    message?: string;
    errors?: {
      [key: string]: Array<string>;
    };
    pagination?: PaginationState;
  };
};

export type QueryResponseContextProps<T> = {
  response?: Response<Array<T>> | undefined;
  refetch: () => void;
  isLoading: boolean;
  query: string;
};

export const initialQueryState: QueryState = {
  page: 1,
  items_per_page: 10,
  last_page: 1,
};

export const initialQueryResponse = {
  refetch: () => {},
  isLoading: false,
  query: '',
};

export type ListViewContextProps = {
  // NULL => (CREATION MODE) | MODAL IS OPENED
  // NUMBER => (EDIT MODE) | MODAL IS OPENED
  // UNDEFINED => MODAL IS CLOSED
  itemIdForUpdate?: ID;
  setItemIdForUpdate: Dispatch<SetStateAction<ID>>;
};

export const initialListView: ListViewContextProps = {
  setItemIdForUpdate: () => {},
};
