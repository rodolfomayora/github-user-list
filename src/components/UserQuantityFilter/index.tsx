import { FC, useContext } from 'react';
import CustomSelectInput from '../CustomSelectInput'
import { usersStateContext, usersSetContext } from '../../context/users';

const UserQuantityFilter: FC = () => {

  const { usersPerPage } = useContext(usersStateContext);
  const setUsers = useContext(usersSetContext);
  
  const label: string = 'Items to show';
  const options: object = {
    '25': 25,
    '50': 50,
    '100': 100
  }

  const selectOption = (option: number): void => {
    setUsers((state: any) => ({
      ...state,
      usersPerPage: option
    }));
  }

  return (
    <CustomSelectInput
      label={label}
      options={options}     
      currentOption={usersPerPage}
      setCurrentOption={selectOption}
    />
  )
}

export default UserQuantityFilter;