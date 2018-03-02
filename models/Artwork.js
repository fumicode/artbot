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

const OrderSchema = new Schema({
  //id:0,
  stamps:[ StampSchema ]
});

module.exports = OrderSchema;



