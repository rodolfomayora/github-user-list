import { FC } from 'react';
import './assets/styles/styles.global.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as views from './views';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={views.Home} />
        <Route exact path="/UserDetail/:userId" component={views.UserDetail} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;