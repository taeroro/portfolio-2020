import React from 'react';
import { Route, Switch } from 'react-router-dom';

// JS files
import AppliedRoute from './AppliedRoute';
import Work from './work/work';
import About from './about/about';

export default () =>
  <Switch>
    <AppliedRoute path="/" exact component={Work} />
    <AppliedRoute path="/about" exact component={About} />

    { /* Catch all unmatched routes */ }
    {/* <Route component={NotFound} /> */}
  </Switch>;
