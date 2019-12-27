import React from 'react';
import { Route, Switch } from 'react-router-dom';

// JS files
import AppliedRoute from './AppliedRoute';
import Work from './work/work';

export default () =>
  <Switch>
    <AppliedRoute path="/" exact component={Work} />

    { /* Catch all unmatched routes */ }
    {/* <Route component={NotFound} /> */}
  </Switch>;
