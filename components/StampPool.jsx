import React from 'react';
import {render} from 'react-dom';

export class StampPool extends React.Component {

  constructor(props){
    super();

    this.state = {
      stampGroups : props.stampGroups,
      currentGroupKey :  0
    };
  }

  changeGroup(index){

    console.log(index);

    this.setState({
      currentGroupKey:index
    })
  }

  renderTabs(){
    return pug`
      .categoryTabs
        table.n.categoryTabs__table
          tbody
            tr.categoryTabs__row
              each stampGroupKey,index in Object.keys(this.state.stampGroups)
                td.categoryTabs__tab#cat_tab_animal(key=index 
                  className=${Object.keys(this.state.stampGroups)[this.state.currentGroupKey] == stampGroupKey ? '--current' : ''} 
                  onClick=${()=>this.changeGroup(index)}) 
                  | ${stampGroupKey.toUpperCase()}

    `;
  }


  renderPanel(){
    const currentGroupKey = Object.keys(this.state.stampGroups)[this.state.currentGroupKey];
    const stamps = this.state.stampGroups[ currentGroupKey ];

    return pug`
      .categoryPanels
        each groupKey in Object.keys(this.state.stampGroups)
          .categoryPanels__panel(className=${groupKey == currentGroupKey ? '--current':''} key=groupKey)
            ul.n.stampsTable
              each stamp,index in this.state.stampGroups[groupKey]
                li.stampsTable__item(key=index)
                  .stampExample
                    img.stampExample__img(src= ${'/images/stamps/600/'+ groupKey +'/'+stamp})
                    .stampExample__cover
                      .stampExample__addButton 追加する
    `;
  }


  render () {

    return pug`
      .stampPool(key=0)
        button.stampPool__foldButton fold
        .stampCategory
          .stampCategory__tabs
            ${this.renderTabs()}

          .stampCategory__panels
              ${this.renderPanel()}
    `;
  }
}


