import React from 'react';
import {render} from 'react-dom';
import renderToId from "./renderToId.jsx"
import ArtworkPage from './ArtworkPage.jsx';


renderToId('ArtworkPage', pug`
  ArtworkPage(artwork=window.data.artwork)
`);



