import React from 'react';
import {render} from 'react-dom';

export default class StampPool extends React.Component {
  constructor(props){
    super();

    this.state = {
      stampGroups : props.stampGroups,
      currentGroupKey :  0
    };
    
    this.stampClicked = (imagepath)=>{
      if(typeof this.props.onStampSelected == "function"){
        this.props.onStampSelected(imagepath);
      }
    }
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

  renderStampExample(imagePath){
    return pug`
      .stampExample
        img.stampExample__img(src= ${'/images/stamps/600/'+imagePath})
        .stampExample__cover(onClick= ${()=>this.stampClicked(imagePath)} )
          .stampExample__addButton 追加する
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
              each stampImg,index in this.state.stampGroups[groupKey]
                li.stampsTable__item(key=index)
                  ${this.renderStampExample(groupKey+'/'+stampImg)}
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


