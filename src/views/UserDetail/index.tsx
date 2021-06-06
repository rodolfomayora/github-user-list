import { FC, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { PictureProfile } from '../../components';
//import style from './style.module.scss';

const UserDetail: FC = () => {

  const { userName } = useParams<any>();
  const redirectPage = useHistory().push;

  // useEffect(() => {
  //   if () redirectPage('/404');
  // },
  // [])

  return (
    <div>
      USER DETAIL

      <section>
        <h2>User General Info</h2>

        <div style={{ width: '120px' }}>
          <PictureProfile />
        </div>

        <p>User name: {userName}</p>
        <p>Email: </p>
        <p>Biography: </p>
        <p>Address: </p>
        <p>True Name (fullname): </p>
        <p>etc...</p>
      </section>

      <section>
        <h2>Infor Repositories (por cada repo)</h2>
        <p>X Repositories</p>
        <p>X Followers</p>
        <p>X Following</p>
      </section>
      
      <p></p>

      <hr />
      <Link to="/">back to home</Link>
    </div>
  )
}

export default UserDetail;