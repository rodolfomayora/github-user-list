import { createContext } from 'react';

type FilterStateContext = {
  usersPerPage: number,
  downwardSort: boolean,
}

export const defaultFilter: FilterStateContext = {
  usersPerPage: 25,
  downwardSort: false,
}

const setContext: Function | any = null;

export const filterStateContext = createContext(defaultFilter);
export const filterSetContext = createContext(setContext);