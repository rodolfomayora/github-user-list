import { FC, useState, useContext } from 'react';
//import style from './style.module.scss';

import { filterStateContext, filterSetContext } from '../../context/filters';

const QuantityFilter: FC = () => {

  const { currentQuantityItems, quantityOptions } = useContext(filterStateContext);
  const setFilters = useContext(filterSetContext);

  const [showOptions, setShowOptions] = useState<boolean>(false);
  
  const invertBoolean = (state: boolean): boolean => !state;

  const selectOption = (option: number) => {
    setFilters((state: any) => ({
      ...state,
      currentQuantityItems: option
    }));

    setShowOptions(invertBoolean);
  }

  const onClickToggle = () => setShowOptions(invertBoolean);

  return (
    <div>
      <div onClick={onClickToggle}>
        show: {currentQuantityItems}
      </div>

      {showOptions && (
        <ul>
          {!!quantityOptions.length && quantityOptions.map((option: number) => (
            <li
              key={option.toString()}
              onClick={() => selectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      
    </div>
  )
}

export default QuantityFilter;