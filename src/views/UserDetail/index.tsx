import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
//import style from './style.module.scss';

const UserDetail: FC = () => {

  const { userId } = useParams<any>();

  return (
    <div>
      USER DETAIL {' '}
      <p>ID del usuario: {userId}</p>
      <Link to="/">back to home</Link>
    </div>
  )
}

export default UserDetail;