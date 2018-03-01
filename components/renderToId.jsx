import ReactDOM from 'react-dom'

export default function renderToId(id, pug_react){
  const el = document.getElementById(id);
  var comp = null;
  if(el){
    console.log("#" + id + " に描画します" );
    comp = ReactDOM.render(
      pug_react,
      el
    );
  }
  else{
    console.log("#" + id + " はありません." );
  }
  return comp;
}
