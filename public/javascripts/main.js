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
const artworkInner = document.querySelector(".artwork__inner")
const stump_proto  = document.querySelector(".stump");
const textStumpProto  = document.querySelector(".textStump");


// すべてのスタンプ例に、イベントを追加
stumpExamples.forEach((stumpExample, index) =>{
  const stump_img_src = stumpExample.children[0].getAttribute("src"); 

  stumpExample.addEventListener("click", function(e ){

    const copied_stump = stump_proto.cloneNode();
    const new_img = stump_proto.children[0].cloneNode();

    new_img.setAttribute("src",stump_img_src );
    copied_stump.appendChild(new_img);

    //どうやってやるのかわからん。そろそろReactの方がいいんじゃないか？
    artworkInner.appendChild(copied_stump);

    setDraggable();
  });
});

const textProtoBox =  document.querySelector("#textProtoBox");

textProtoBox.addEventListener("click", function(){
  createText();
});

function createText(){
  const textProto = document.querySelector("#textProto")
  
  console.log(textProto);

  //どうやってやるのかわからん。そろそろReactの方がいいんじゃないか？

  const newTextStump = textStumpProto.cloneNode();

  console.log(typeof textProto.getAttribute("style"));

  newTextStump.setAttribute("style", textProto.getAttribute("style") + (textStumpProto.getAttribute("style")));
  newTextStump.appendChild(textProto.childNodes[0].cloneNode());

  artworkInner.appendChild(newTextStump);

  console.log(newTextStump);
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
