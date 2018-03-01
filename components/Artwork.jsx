import React from 'react';
import path from 'path';

export default class Artwork extends React.Component {
  constructor(props){
    super();
  }

  render () {
    return pug`
      .artwork
        .artwork__printArea
          .artwork__inner
            each stamp,index in this.props.artwork.stamps
              .stump(style={top:stamp.transform.position[0], left: stamp.transform.position[1] } key=${index})
                img.stump__img(src=${path.join("/images/stamps/600/",stamp.image)})
    `;
  }
}






