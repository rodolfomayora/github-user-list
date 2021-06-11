import { FC, useContext } from 'react';
import CustomSelectInput from '../CustomSelectInput';
import { usersStateContext, usersSetContext } from '../../context/users';

const UserArrangeFilter: FC = () => {

  const { downwardSort } = useContext(usersStateContext);
  const setUsers = useContext(usersSetContext);

  const label: string = 'Arrange List';
  const options: object = {
    upward: false,
    downward: true
  }

  const setOption = (option: boolean): void => {
    setUsers((state: any) => ({
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

export default UserArrangeFilter;