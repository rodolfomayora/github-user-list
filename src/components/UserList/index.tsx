import { FC, useContext } from 'react';
import Loader from '../Loader';
import PaginationButtons from '../PaginationButtons';
import UserListItem from '../UserListItem';
import styles from './styles.module.scss';
import { usersStateContext, usersSetContext } from '../../context/users';
import { fetchUsersPerPage } from '../../utils/fetchData';

const UserList: FC = () => {

  const { downwardSort, currentUserList, currentPage } = useContext(usersStateContext);
  const { showLoader, usersPerPage, nextListOriginId } = useContext(usersStateContext);
  const { previousListOriginIds } = useContext(usersStateContext);;
  const setUsers = useContext(usersSetContext);

  const setNextListOriginId = (nextId: number): void => {
    setUsers((state: any) => ({
      ...state,
      nextListOriginId: nextId
    }))
  }

  const setPreviousListOriginIds = (previousIds: Array<number>): void => {
    setUsers((state: any) => ({
      ...state,
      previousListOriginIds: previousIds
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

  const onClickNextPage = async () => {
    try {
      setCurrentList([]);
      setShowLoader(true);
      setCurrentPage(currentPage + 1)
      setPreviousListOriginIds(previousListOriginIds.concat(nextListOriginId));

      const data = await fetchUsersPerPage(usersPerPage, nextListOriginId);
      const { userList, nextListOrigin } = data;
      
      setShowLoader(false);
      setCurrentList(userList);
      setNextListOriginId(nextListOrigin);

    } catch (error) {
      console.clear();
      console.error(error);
      setShowLoader(false);
    }
  }

  const onClickPreviousPage = async () => {
    try {
      setCurrentList([]);
      setShowLoader(true);
      setCurrentPage(currentPage - 1)
      const newPrevHistory: Array<number> = previousListOriginIds.slice(0, -1);
      setPreviousListOriginIds(newPrevHistory);

      const prevId: number = newPrevHistory[newPrevHistory.length - 1];
      const data = await fetchUsersPerPage(usersPerPage, prevId);
      const { userList, nextListOrigin } = data;
      
      setNextListOriginId(nextListOrigin);
      setShowLoader(false);
      setCurrentList(userList);

    } catch (error) {
      console.clear();
      console.error(error);
      setShowLoader(false);
    }
  }

  const isFirstPage = (): boolean => previousListOriginIds?.length <= 1;

  const getCopyList = (downward: boolean): Array<any> => {
    return downward
      ? [...currentUserList].reverse()
      : [...currentUserList]
  }

  return (
    <>
    <ol className={styles.UserList}>
      {showLoader && (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      )}

      {!!currentUserList.length && getCopyList(downwardSort).map((item: any) => (
        <UserListItem key={item.id}
          userName={item.login}
          pictureProfileSrc={item.avatar_url}
        />
      ))}
    </ol>

    <div className={styles.paginationButtonsWrapper}>
      <PaginationButtons
        currentPage={currentPage}
        disablePreviousAction={isFirstPage()}
        nextPageAction={onClickNextPage}
        previousPageAction={onClickPreviousPage}
      />
    </div>
    </>
  )
}

export default UserList;