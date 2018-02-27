const ItemsSizesPrototype = {
  tee:{
    tee_36:0,
    tee_38:0,
    tee_40:0,
    tee_42:0,
    tee_44:0,
  },
  sweat:{
    sweat_36:0,
    sweat_40:0,
    sweat_44:0,
  }
};


const OrderPrototype = {
  id:0,
  artwork:0,
  ticket:null,
  cust_name:null,
  items_sizes: ItemsSizesPrototype,
  get progress(){
    return this.order_state;
  },
  order_state:"ordering"
};

const Orders  = [
  OrderPrototype,
];


module.exports = {OrderPrototype, Orders, ItemsSizesPrototype}


