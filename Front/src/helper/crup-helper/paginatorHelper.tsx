import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import {
  QueryResponseContextProps,
  ID,
  QueryState,
} from '../../domain/productModel/helper.interface';
import qs from 'qs';

function createResponseContext<T>(initialState: QueryResponseContextProps<T>) {
  return createContext(initialState);
}

function isNotEmpty(obj: unknown) {
  return obj !== undefined && obj !== null && obj !== '';
}

function stringifyRequestQuery(state: QueryState): string {
  const pagination = qs.stringify(state, {
    filter: ['page', 'items_per_page'],
    skipNulls: true,
  });
  const sort = qs.stringify(state, {
    filter: ['sort', 'order'],
    skipNulls: true,
  });
  const search = isNotEmpty(state.search)
    ? qs.stringify(state, { filter: ['search'], skipNulls: true })
    : '';

  const filter = state.filter
    ? Object.entries(state.filter)
        .filter((obj) => isNotEmpty(obj[1]))
        .map((obj) => {
          return `filter_${obj[0]}=${obj[1]}`;
        })
        .join('&')
    : '';

  return [pagination, sort, search, filter]
    .filter((f) => f)
    .join('&')
    .toLowerCase();
}

function groupingOnSelectAll<T>(
  isAllSelected: boolean,
  setSelected: Dispatch<SetStateAction<Array<ID>>>,
  data?: Array<T & { id?: ID }>
) {
  if (isAllSelected) {
    setSelected([]);
    return;
  }

  if (!data || !data.length) {
    return;
  }

  setSelected(data.filter((item) => item.id).map((item) => item.id));
}

const useDebounce = (value: string | undefined, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
};

function calculatedGroupingIsDisabled<T>(
  isLoading: boolean,
  data: Array<T> | undefined
): boolean {
  if (isLoading) {
    return true;
  }

  return !data || !data.length;
}

export {
  useDebounce,
  groupingOnSelectAll,
  createResponseContext,
  isNotEmpty,
  stringifyRequestQuery,
  calculatedGroupingIsDisabled,
};
