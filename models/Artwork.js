const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const co = require('co');

/*
性別その他
radioを追加
姓、名、ふりがな
出身（県or国）
学籍番号（電通大生の場合）
*/


const StampSchema = new Schema({
  image: String,
  transform:{
    position:{
      x:Number, //cm
      y:Number
    },
    scale:{
      w:Number,
      h:Number
    },
    rotate:Number
  }
});

const ArtworkSchema = new Schema({
  //id:0,
  stamps:[ StampSchema ],
  created:Date,
  updated:Date,
});

ArtworkSchema.virtual("created_str").get(function(){
  if(!this.created)
    return '';

  const date = (this.created.getDate());
  const hour = (this.created.getHours());
  const minute = (this.created.getMinutes());

  return `${date}日${hour}時${minute}分`;
});

ArtworkSchema.virtual("updated_str").get(function(){
  if(!this.updated)
    return '';

  const date =   (this.updated.getDate());
  const hour =   (this.updated.getHours());
  const minute = (this.updated.getMinutes());

  return `${date}日${hour}時${minute}分`;
});

module.exports = ArtworkSchema;



