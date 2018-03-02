const StampPrototype = {
  image: "animal/galloping_horse.png",
  transform:{
    position:{
      x:10, //cm
      y:0
    },
    scale:{
      w:1,
      h:1
    },
    rotate:0
  }
}

const StampPrototype2 = {
  image: "sign/smc_blocktype_black.png",

  transform:{
    position:{
      x:0, //cm
      y:10
    },
    scale:{
      w:1,
      h:1
    },
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
];

module.exports = {StampPrototype, ArtworkPrototype, Artworks};
