const StampPrototype = {
  image: "animal/galloping_horse.png",
  transform:{
    position:["10%","13%"],
    scale:[1,1],
    rotate:0
  }
}

const StampPrototype2 = {
  image: "sign/smc_blocktype_black.png",

  transform:{
    position:["40%","15%"],
    scale:[1,1],
    rotate:0
  }

}


const ArtworkPrototype ={
  id:0,

  stamps:[
    StampPrototype,
    StampPrototype2,
  ]
}

const Artworks = [
  ArtworkPrototype ,
  ArtworkPrototype ,
];

module.exports = {StampPrototype, ArtworkPrototype, Artworks};
