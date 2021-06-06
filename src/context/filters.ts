import { createContext } from 'react';

type FilterStateContext = {
  quantityOptions: Array<number>,
  currentQuantityItems: number,
  downwardSort: boolean
}

export const defaultFilter: FilterStateContext = {
  quantityOptions: [25, 50, 100],
  currentQuantityItems: 25,
  downwardSort: false
}

const setContext: Function | any = null;

export const filterStateContext = createContext(defaultFilter);
export const filterSetContext = createContext(setContext);