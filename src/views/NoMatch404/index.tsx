import React, { FC } from 'react';
import { Link } from 'react-router-dom';
//import style from './style.module.scss';

const NoMatch404: FC = () => {
  return (
    <div>
      404
      <br />
      <Link to="/">Come back</Link>
    </div>
  )
}

export default NoMatch404;