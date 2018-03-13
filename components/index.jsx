import React from 'react';
import {render} from 'react-dom';
import renderToId from "./renderToId.jsx"
import ArtworkPage from './ArtworkPage.jsx';
import Artwork from './Artwork.jsx';
import TeePanel from './TeePanel.jsx';


renderToId('ArtworkPage', pug`
  ArtworkPage(artwork=window.data.artwork)
`);

renderToId('ArtworkTee', pug`
  TeePanel(artwork=window.data.artwork hidden=true noBorder=true x=110 y=80 w=150)
`);

renderToId('ArtworkSweat', pug`
  TeePanel(artwork=window.data.artwork hidden=true noBorder=true x=105 y=90 w=160 bgImg="sweat")
`);

renderToId('ArtworkPreview', pug`
  Artwork(artwork=window.data.artwork hidden=true realWidth="30cm" realHeight="40cm" displayWidth=400 noBorder=false)
`);

renderToId('PrintArtwork', pug`
  Artwork(artwork=window.data.artwork printResolution=true hidden=true realWidth="30cm" realHeight="40cm" noBorder=true displayReal=true)
`);


