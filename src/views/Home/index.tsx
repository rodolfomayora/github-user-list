import { FC } from 'react';
import { Link } from 'react-router-dom'
//import style from './style.module.scss';

const Home: FC = () => {

  const userId: string = 'MAYORA';

  return (
    <div>
      HOME {' '}
      <Link to={`/UserDetail/${userId}`}>
        user detail
      </Link>
    </div>
  )
}

export default Home;