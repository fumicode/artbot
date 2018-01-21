const tabs = Array.from(document.querySelectorAll(".toolsTabs__tab"))
const panels = Array.from(document.querySelectorAll(".toolsPanels__panel"))


tabs.forEach((tab, index)=>{
  tab.addEventListener("click",(e)=>{
    console.log(tab,index);
    tabs.forEach((tab)=>{
      tab.classList.remove("--active");
    });

    tabs[index].classList.add("--active");
    panels.forEach((panel)=>{
      panel.classList.remove("--active");
    });
    panels[index].classList.add("--active");
  });
});


const stumpExamples = Array.from(document.querySelectorAll(".stumpExample"))
const artwork_inner = document.querySelector(".artwork__inner")
const stump_proto  = document.querySelector(".stump");


// すべてのスタンプ例に、イベントを追加
stumpExamples.forEach((stumpExample, index) =>{
  const stump_img_src = stumpExample.children[0].getAttribute("src"); 

  stumpExample.addEventListener("click", function(e ){

    const copied_stump = stump_proto.cloneNode();
    const new_img = stump_proto.children[0].cloneNode();

    new_img.setAttribute("src",stump_img_src );
    copied_stump.appendChild(new_img);

    //どうやってやるのかわからん。そろそろReactの方がいいんじゃないか？
    artwork_inner.appendChild(copied_stump);

    setDraggable();
  });
});

const textProtoBox =  document.querySelector("#textProtoBox");

textProtoBox.addEventListener("click", function(){
  createText();
});

function createText(){
  const new_text = document.querySelector("#textProto").cloneNode();

  //どうやってやるのかわからん。そろそろReactの方がいいんじゃないか？
  artwork_inner.appendChild(copied_text);
  setDraggable();
}


function setDraggable(){
  const stumps =  $(".stump");
  stumps.draggable();

  const textStumps =  $(".textStump");
  textStumps.draggable();

  // stumps.resizable();
}


setDraggable();
