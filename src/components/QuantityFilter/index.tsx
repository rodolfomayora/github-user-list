import { FC, useContext } from 'react';
import { filterStateContext, filterSetContext } from '../../context/filters';
import CustomSelectInput from '../CustomSelectInput'

const QuantityFilter: FC = () => {

  const { currentQuantityItems } = useContext(filterStateContext);
  const setFilters = useContext(filterSetContext);
  
  const label: string = 'Items to show';
  const options: object = {
    '25': 25,
    '50': 50,
    '100': 100
  }

  const selectOption = (option: number): void => {
    setFilters((state: any) => ({
      ...state,
      currentQuantityItems: option
    }));
  }

  return (
    <CustomSelectInput
      label={label}
      options={options}     
      currentOption={currentQuantityItems}
      setCurrentOption={selectOption}
    />
  )
}

export default QuantityFilter;