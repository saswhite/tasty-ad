import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import _ from 'lodash';

import PrivateRouter from './Common/PrivateRouter';
import { routerConfig } from './Router/index';

/* style */
import './App.css';

/* anted */

function App () {

    function renderRouter (){
        return _.map(routerConfig,(item)=>{
            return <PrivateRouter { ...item } key={ Math.random() }></PrivateRouter>;
        });
    }

    return (
        <Router>
            <div className="App">
                <Switch>
                    {renderRouter()}
                </Switch>
            </div>
        </Router>
    );
}

export default App;
