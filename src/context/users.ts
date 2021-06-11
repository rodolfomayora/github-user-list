import { createContext } from 'react';

type UsersStateContext = {
  downwardSort: boolean,
  currentPage: number,
  usersPerPage: number,
  currentUserList: Array<any>,
  previousListOriginIds: Array<number>,
  nextListOriginId: number,
  showLoader: boolean
}

export const defaultUsers: UsersStateContext = {
  downwardSort: false,
  usersPerPage: 25,
  currentPage: 1,
  currentUserList: [],
  previousListOriginIds: [],
  nextListOriginId: 0,
  showLoader: false
}

const setContext: Function | any = null;

export const usersStateContext = createContext(defaultUsers);
export const usersSetContext = createContext(setContext);