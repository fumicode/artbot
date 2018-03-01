import React from 'react';

export default class TeePanel extends React.Component {
  constructor(props){
    super();
  }

  render () {
    return pug`
      .toolBox
        ul.toolBox__list
          li.toolBox__tool
            button.toolBox__button#tool_trash 
              img(src="/images/icon_trash.png")
          li.toolBox__tool
            button.toolBox__button#tool_layer_up 
              img(src="/images/icon_up.png")
          li.toolBox__tool
            button.toolBox__button#tool_layer_down
              img(src="/images/icon_down.png")
          li.toolBox__margin
          li.toolBox__tool
            button.toolBox__button#tool_zoom
              img(src="/images/icon_zoom.png")
    `;
  }
}








