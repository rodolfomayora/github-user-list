import { FC } from 'react';
import './assets/styles/styles.global.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as views from './views';
import FiltersProvider from './providers/FiltersProvider';

const App: FC = () => {
  return (
    <FiltersProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={views.Home} />
          <Route exact path="/UserDetail/:userName" component={views.UserDetail} />
          <Route path="*" component={views.NoMatch404} />
        </Switch>
      </BrowserRouter>
    </FiltersProvider>
  );
}

export default App;