import React from 'react';
import {render} from 'react-dom';
import renderToId from "./renderToId.jsx"
import ArtworkPage from './ArtworkPage.jsx';
import Artwork from './Artwork.jsx';


renderToId('ArtworkPage', pug`
  ArtworkPage(artwork=window.data.artwork)
`);


renderToId('ArtworkTee', pug`
  Artwork(artwork=window.data.artwork)
`);


renderToId('ArtworkSweat', pug`
  Artwork(artwork=window.data.artwork)
`);


