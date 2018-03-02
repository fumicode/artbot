import React from 'react';
import {render} from 'react-dom';
import renderToId from "./renderToId.jsx"
import ArtworkPage from './ArtworkPage.jsx';
import Artwork from './Artwork.jsx';
import TeePanel from './TeePanel.jsx';


renderToId('ArtworkPage', pug`
  ArtworkPage(artwork=window.data.artwork)
`);


console.log("window.data.artwork");
console.log( window.data.artwork);

renderToId('ArtworkTee', pug`
  TeePanel(artwork=window.data.artwork noBorder=true x=110 y=90 w=170)
`);

renderToId('ArtworkSweat', pug`
  TeePanel(artwork=window.data.artwork bgImg="sweat" noBorder=true x=110 y=90 w=170 )

`);


renderToId('ArtworkPreview', pug`
  Artwork(artwork=window.data.artwork realWidth="30cm" realHeight="40cm" displayWidth=400 noBorder=false)
`);

renderToId('PrintArtwork', pug`
  Artwork(artwork=window.data.artwork realWidth="30cm" realHeight="40cm" displayWidth=400 noBorder=true displayReal=true)
`);

