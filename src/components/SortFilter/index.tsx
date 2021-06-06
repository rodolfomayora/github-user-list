import { FC, useState, useContext } from 'react';
//import style from './style.module.scss';

import { filterStateContext, filterSetContext } from '../../context/filters';

const QuantityFilter: FC = () => {

  const { downwardSort } = useContext(filterStateContext);
  const setFilters = useContext(filterSetContext);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  
  const invertBoolean = (state: boolean): boolean => !state;
  const setDownward = (option: boolean) => {
    setFilters((state: any) => ({
      ...state,
      downwardSort: option
    }));

    setShowOptions(invertBoolean);
  }
  const onClickToggle = () => setShowOptions(invertBoolean);
  const onClickDownward = () => setDownward(true);
  const onClickUpward = () => setDownward(false);

  return (
    <div>
      <div onClick={onClickToggle}>
        downwardSort: {String(downwardSort)}
      </div>

      {showOptions && (
        <ul>
          <li onClick={onClickUpward}>upward</li>
          <li onClick={onClickDownward}>downward</li>
        </ul>
      )}
      
    </div>
  )
}

export default QuantityFilter;