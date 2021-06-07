import { FC, useContext } from 'react';
import CustomSelectInput from '../CustomSelectInput';

import { filterStateContext, filterSetContext } from '../../context/filters';

const QuantityFilter: FC = () => {

  const { downwardSort } = useContext(filterStateContext);
  const setFilters = useContext(filterSetContext);

  const label: string = 'Arrange List';
  const options: object = {
    upward: false,
    downward: true
  }

  const setOption = (option: boolean): void => {
    setFilters((state: any) => ({
      ...state,
      downwardSort: option
    }));
  }

  return (
    <CustomSelectInput
      label={label}
      options={options}
      currentOption={downwardSort ? 'downward' : 'upward'}
      setCurrentOption={setOption}
    />
  )
}

export default QuantityFilter;