import { FC, useState, useEffect } from 'react';
import {
  defaultUsers,
  usersStateContext,
  usersSetContext
} from '../../context/users';
import { fetchUsersPerPage } from '../../utils/fetchData';

const UsersProvider: FC = ({ children }) => {

  const [users, setUsers] = useState(defaultUsers);

  const initListOriginId: number = 0;

  const setNextListOriginId = (nextId: number): void => {
    setUsers((state: any) => ({
      ...state,
      nextListOriginId: nextId
    }))
  }

   const setPreviousListOriginIds = (): void => {
    setUsers((state: any) => ({
      ...state,
      previousListOriginIds: [initListOriginId]
    }))
  }

  const setCurrentList = (list: Array<any>): void => {
    setUsers((state: any) => ({
      ...state,
      currentUserList: list
    }))
  }

  const setShowLoader = (isLoading: boolean): void => {
    setUsers((state: any) => ({
      ...state,
      showLoader: isLoading
    }))
  }

  const setCurrentPage = (numberPage: number): void => {
    setUsers((state: any) => ({
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
        const dataObject = await fetchUsersPerPage(users.usersPerPage, initListOriginId);
        const { userList, nextListOrigin } = dataObject;

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
  [initListOriginId, users.usersPerPage])



  return (
    <usersStateContext.Provider value={users}>
      <usersSetContext.Provider value={setUsers}>
        {children}
      </usersSetContext.Provider>
    </usersStateContext.Provider>
  )
}

export default UsersProvider;