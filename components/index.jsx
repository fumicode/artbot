import React from 'react';
import {render} from 'react-dom';
import {StampPool} from './StampPool.jsx';

import {stampGroups} from '../models/Stamps.js';


class App extends React.Component {
  render () {
    return pug`
      p aho
    `
  }
}

//render(<App/>, document.getElementById('app'));

console.log(stampGroups);
render(pug`
  StampPool(stampGroups=stampGroups)
`, document.getElementById('StampPool'));


