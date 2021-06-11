import { FC, useState, useEffect } from 'react';
import {
  defaultFilter,
  filterStateContext,
  filterSetContext
} from '../../context/filters';
import { fetchUsersPerPage } from '../../utils/fetchData';

const FiltersProvider: FC = ({ children }) => {

  const [filters, setFilters] = useState(defaultFilter);

  const initListOriginId: number = 0;

  const setNextListOriginId = (nextId: number): void => {
    setFilters((state: any) => ({
      ...state,
      nextListOriginId: nextId
    }))
  }

   const setPreviousListOriginIds = (): void => {
    setFilters((state: any) => ({
      ...state,
      previousListOriginIds: [initListOriginId]
    }))
  }

  const setCurrentList = (list: Array<any>): void => {
    setFilters((state: any) => ({
      ...state,
      currentUserList: list
    }))
  }

  const setShowLoader = (isLoading: boolean): void => {
    setFilters((state: any) => ({
      ...state,
      showLoader: isLoading
    }))
  }

  const setCurrentPage = (numberPage: number): void => {
    setFilters((state: any) => ({
      ...state,
      currentPage: numberPage
    }))
  }

  useEffect(() => {
    let didCancel: boolean = false;

    const getUserList = async () => {
      try {
        setCurrentList([]);
        setShowLoader(true);
        setCurrentPage(1);
        const users = await fetchUsersPerPage(filters.usersPerPage, initListOriginId);
        const { userList, nextListOrigin } = users;

        if (!didCancel) {
          setShowLoader(false);
          setNextListOriginId(nextListOrigin);
          setPreviousListOriginIds();
          setCurrentList(userList);
        }
      } catch (error) {
        console.clear();
        console.error(error);
        setShowLoader(false);
      }
    }

    getUserList();
    
    return () => {
      didCancel = true;
    }
  },
  [initListOriginId, filters.usersPerPage])



  return (
    <filterStateContext.Provider value={filters}>
      <filterSetContext.Provider value={setFilters}>
        {children}
      </filterSetContext.Provider>
    </filterStateContext.Provider>
  )
}

export default FiltersProvider;