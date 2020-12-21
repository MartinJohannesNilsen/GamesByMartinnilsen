import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Styles/index.scss';

import DataadministrationView from './Views/DataadministrationView';
import MainView from './Views/MainView';
import NeverHaveIEverView from './Views/Games/NeverHaveIEverView';
import TruthOrDareView from './Views/Games/TruthOrDareView';
import PointTowardsWhoView from './Views/Games/PointTowardsWhoView';

ReactDOM.render(
    <BrowserRouter>
        <Route path='/'>
         <div>
            <Switch>
              <Route path='/manageData/:id' component={DataadministrationView}/>
              <Route path='/manageData' component={DataadministrationView}/>
              <Route path='/neverHaveIEver' component={NeverHaveIEverView} />
              <Route path='/truthOrDare' component={TruthOrDareView} />
              <Route path='/pointTowardsWho/' component={PointTowardsWhoView} />
              <Route path='/' component={MainView} />
            </Switch>
         </div>
    </Route>
    </BrowserRouter>
    , (document.getElementById('root')));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();