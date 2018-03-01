import React from 'react';

export default class Topbar extends React.Component {
  constructor(props){
    super();
  }

  render () {
    return pug`
      .topbar#topbar
        .topbar__progress
          .progress
            table.n.progress__table
              tbody
                tr
                  td.progress__item#progress_start
                    img.progress__img(src="/images/prog_start.png" alt="start")
                  td.progress__arrow 
                    img.progress__arrowImg(src="/images/prog_arrow.png" alt="arrow")
                  td.progress__item#progress_play.--current
                    img.progress__img(src="/images/prog_play.png" alt="play")
                  td.progress__arrow 
                    img.progress__arrowImg(src="/images/prog_arrow_2.png" alt="arrow")
                  td.progress__item#progress_check
                    img.progress__img(src="/images/prog_check.png" alt="check")

        .topbar__moveButtons
          ${this.props.children}

    `;
  }
}








