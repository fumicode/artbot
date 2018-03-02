const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const co = require('co');
const Artwork = require("./Artwork.js");

/*
性別その他
radioを追加
姓、名、ふりがな
出身（県or国）
学籍番号（電通大生の場合）
*/

const ItemsSizesSchema = new Schema({
  tee:{
    tee_36:Number,
    tee_38:Number,
    tee_40:Number,
    tee_42:Number,
    tee_44:Number,
  },
  sweat:{
    sweat_36:Number,
    sweat_40:Number,
    sweat_44:Number,
  }
});

const OrderSchema = new Schema({
  //_id:,
  artwork:{ type: Schema.Types.ObjectId, ref:"Artwork" } ,
  ticket:Number,
  cust_name:String,
  items_sizes: ItemsSizesSchema ,
  order_state:String,           //"ordering"
  
});

module.exports = OrderSchema;
