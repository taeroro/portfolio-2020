import React from 'react';
import { Route, Switch } from 'react-router-dom';

// JS files
import AppliedRoute from './AppliedRoute';

export default () =>
  <Switch>
    {/* <AppliedRoute path="/" exact component={Home} /> */}

    { /* Catch all unmatched routes */ }
    {/* <Route component={NotFound} /> */}
  </Switch>;
