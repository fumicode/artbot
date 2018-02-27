const StampPrototype = {
  image: "",
  translation:{
    position:[0,0],
    scale:[1,1],
    rotate:0
  }
}

const ArtworkPrototype ={
  id:0,
  stamps:[
    StampPrototype,
    StampPrototype,
  ]
}

const Artworks = [
  ArtworkPrototype ,
  ArtworkPrototype ,
];

module.exports = {StampPrototype, ArtworkPrototype, Artworks};
