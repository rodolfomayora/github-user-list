import { FC, useState } from 'react';
import {
  defaultFilter,
  filterStateContext,
  filterSetContext
} from '../../context/filters';

const FiltersProvider: FC = ({ children }) => {

  const [filters, setFilters] = useState(defaultFilter);

  return (
    <filterStateContext.Provider value={filters}>
      <filterSetContext.Provider value={setFilters}>
        {children}
      </filterSetContext.Provider>
    </filterStateContext.Provider>
  )
}

export default FiltersProvider;