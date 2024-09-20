import { FC, useState, createContext, useContext } from 'react';
import {
  ID,
  initialListView,
  ListViewContextProps,
} from '../../domain/productModel/helper.interface';

import { WithChildren } from '../../domain/models/setUpAxios';

const ListViewContext = createContext<ListViewContextProps>(initialListView);

const ListViewProvider: FC<WithChildren> = ({ children }) => {
  const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(
    initialListView.itemIdForUpdate
  );

  return (
    <ListViewContext.Provider value={{ itemIdForUpdate, setItemIdForUpdate }}>
      {children}
    </ListViewContext.Provider>
  );
};

const useListView = () => useContext(ListViewContext);

export { ListViewProvider, useListView };
