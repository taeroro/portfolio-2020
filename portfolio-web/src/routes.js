import React from 'react';
import { Route, Switch } from 'react-router-dom';

// JS files
import AppliedRoute from './AppliedRoute';
import ScrollIntoView from './ScrollIntoView';
import Work from './work/work';
import About from './about/about';
import WorkDetail from './work/work-detail/work-detail';

export default () =>
  <ScrollIntoView>
    <Switch>
      <AppliedRoute path="/" exact component={Work} />
      <AppliedRoute path="/about" exact component={About} />
      <AppliedRoute path="/work/:id" exact component={WorkDetail} />

      { /* Catch all unmatched routes */ }
      {/* <Route component={NotFound} /> */}
    </Switch>
  </ScrollIntoView>
