import { FC, useContext, useEffect, useState } from 'react';
import { filterStateContext } from '../../context/filters';
import Loader from '../Loader';
import PaginationButtons from '../PaginationButtons';
import UserListItem from '../UserListItem';
import styles from './styles.module.scss';
import { fetchUsersPerPage } from '../../utils/fetchData';

// import userListSampleData from '../../utils/userListSampleData';

const UserList: FC = () => {

  const initListOriginId: number = 0;

  const { downwardSort, usersPerPage } = useContext(filterStateContext);

  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [currentList, setCurrentList] = useState<Array<any>>([]);
  const [previousListOriginIds, setPreviousListOriginIds] = useState<Array<number>>([]);
  const [nextListOriginId, setNextListOriginId] = useState<number>(initListOriginId);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    let didCancel: boolean = false;

    const getUserList = async () => {
      try {
        const { userList, nextListOrigin } = await fetchUsersPerPage(25, initListOriginId);

        if (!didCancel) {
          setShowLoader(false);
          setNextListOriginId(nextListOrigin);
          setPreviousListOriginIds((state: any) => state.concat(initListOriginId))
          setCurrentList(userList);
        }
      } catch (error) {
        console.clear();
        console.error(error);
        setShowLoader(false);
      }
    }

    getUserList();
    
    // window.setTimeout(() => {
    //   const copyUserList: Array<any> = [...userListSampleData].slice(0, usersPerPage);
    //   setShowLoader(false);
    //   setCurrentList(copyUserList);
    // }, 2000)
    
    return () => {
      didCancel = true;
    }
  },
  [initListOriginId])

  const onClickNextPage = async () => {
    try {
      setCurrentList([]);
      setShowLoader(true);
      setCurrentPage((state: number) => state + 1)
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
      setCurrentPage((state: number) => state - 1)
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

  const isFirstPage = (): boolean => previousListOriginIds.length <= 1;

  const getCopyList = (downward: boolean): Array<any> => {
    return downward
      ? [...currentList].reverse()
      : [...currentList]
  }

  return (
    <>
    <ol className={styles.UserList}>
      {showLoader && (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      )}

      {!!currentList.length && getCopyList(downwardSort).map((item: any) => (
        <UserListItem key={item.id}
          userName={item.login}
          // pictureProfileSrc={item.avatar_url}
          pictureProfileSrc={null}
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