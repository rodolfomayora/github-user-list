import { createContext } from 'react';

type FilterStateContext = {
  downwardSort: boolean,
  currentPage: number,
  usersPerPage: number,
  currentUserList: Array<any>,
  previousListOriginIds: Array<number>,
  nextListOriginId: number,
  showLoader: boolean
}

export const defaultFilter: FilterStateContext = {
  downwardSort: false,
  usersPerPage: 25,
  currentPage: 1,
  currentUserList: [],
  previousListOriginIds: [],
  nextListOriginId: 0,
  showLoader: false
}

const setContext: Function | any = null;

export const filterStateContext = createContext(defaultFilter);
export const filterSetContext = createContext(setContext);