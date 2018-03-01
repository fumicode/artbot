import React from 'react';
import path from 'path';
import Artwork from './Artwork.jsx';

export default class TeePanel extends React.Component {
  constructor(props){
    super();
  }

  render () {
    return pug`
      .teePanel
        //should be svg
        .artBoard
          Artwork(artwork=this.props.artwork)
    `;
  }
}






