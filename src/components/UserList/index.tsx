import { FC, useContext } from 'react';
import Loader from '../Loader';
import PaginationButtons from '../PaginationButtons';
import styles from './styles.module.scss';
import UserListItem from '../UserListItem';
import { filterStateContext, filterSetContext } from '../../context/filters';
import { fetchUsersPerPage } from '../../utils/fetchData';

const UserList: FC = () => {

  const { downwardSort, currentUserList, currentPage } = useContext(filterStateContext);
  const { showLoader, usersPerPage, nextListOriginId } = useContext(filterStateContext);
  const { previousListOriginIds } = useContext(filterStateContext);;
  const setFilters = useContext(filterSetContext);

  const setNextListOriginId = (nextId: number): void => {
    setFilters((state: any) => ({
      ...state,
      nextListOriginId: nextId
    }))
  }

  const setPreviousListOriginIds = (previousIds: Array<number>): void => {
    setFilters((state: any) => ({
      ...state,
      previousListOriginIds: previousIds
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