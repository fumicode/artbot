const express = require('express');
const router = express.Router();
const path = require("path");

const Order = require("../models/Order");
const Orders = Order.Orders;
const OrderPrototype = Order.OrderPrototype;
const ItemsSizesPrototype = Order.ItemsSizesPrototype;

const Artwork= require("../models/Artwork");
const Artworks = Artwork.Artworks;
const ArtworkPrototype = Artwork.ArtworkPrototype;
const StampPrototype = Artwork.StampPrototype;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('start', {});
});

//つくるだけ。なんにもパラメータいらない
router.post('/artworks', function(req, res, next) { 
  //とりあえず簡易的に

  const id = Artworks.length; 
  const new_artwork = Object.assign({}, ArtworkPrototype, {id});
  Artworks.push(new_artwork );
  const new_id = Artworks.length - 1;
  if(id != new_id){
    return next(new Error(" somethings wrong"));
  }

  res.redirect(path.join("artworks",new_id.toString()));
});


router.get('/artworks/:artwork_id', function(req, res, next) { 
  const artwork_id = req.params.artwork_id;
  const artwork = Artworks[artwork_id];

  if(!artwork){
    return next();
  }

  res.render('artwork', {artwork});
});

router.post('/artworks/:artwork_id', function(req, res, next) { 
  const artwork_id =  req.params.artwork_id;

  Artworks[artwork_id] = req.body;

  res.json({
    status:200,
    message:"successfully saved",
    received:req.body
  });

});


router.post('/orders', function(req, res, next) { 
  const artwork_id = req.body.artwork_id;
  const id = Orders.length; 
  const new_order = Object.assign({}, OrderPrototype, {id, artwork:artwork_id});

  Orders.push(new_order);
  const new_id = Orders.length - 1;
  if(id != new_id){
    return next(new Error(" somethings wrong"));
  }

  res.redirect(path.join("orders",new_id.toString()));
});


router.get('/orders/:order_id', function(req, res, next) { 
  const order_id = req.params.order_id;
  const order = Orders[order_id];

  if(!order){
    return next();
  }

  const artwork = Artworks[order.artwork]

  res.render('order', {order, artwork});
});


router.post('/orders/:order_id', function(req, res, next) { 
  const order_id = req.params.order_id;
  const order = Orders[order_id];

  if(!order){
    return next();
  }

  const itemsSizes = Object.assign({}, ItemsSizesPrototype, {
    tee:{
      tee_36: parseInt(req.body.tee_size_36),
      tee_38: parseInt(req.body.tee_size_38 ),
      tee_40: parseInt(req.body.tee_size_40 ),
      tee_42: parseInt(req.body.tee_size_42 ),
      tee_44: parseInt(req.body.tee_size_44 ),
    },
    sweat:{
      sweat_36: parseInt(req.body.sweat_size_36),
      sweat_40: parseInt(req.body.sweat_size_40),
      sweat_44: parseInt(req.body.sweat_size_44),
    }
  });

  const ticket = req.body.ticket;
  const cust_name= req.body.cust_name;

  order.items_sizes = itemsSizes;
  order.cust_name   = cust_name;
  order.ticket = ticket;
  
  //うまく行ってなかったら、だめだけど、
  //うまくいってたら、 checkに飛ぶ

  res.redirect(path.join(req.url,"check"));
});

router.get('/orders/:order_id/check', function(req, res, next) { 
  const order_id = req.params.order_id;
  const order = Orders[order_id];
  if(!order){ return next(); }

  const artwork = Artworks[order.artwork];

  res.render("order_check", {order, artwork})
});

router.post('/orders/:order_id/check', function(req, res, next) { 

  const order_id = req.params.order_id;
  const order = Orders[order_id];
  if(!order){ return next(); }

  order.order_state = "ordered";

  //保存
  res.redirect("/thankyou");
});

router.get('/admin', function(req, res, next) {
  res.redirect("/admin/orders");
});

router.get('/admin/orders', function(req, res, next) {
  const query_order_state = req.query.state || "ordered";

  const orders = Orders.filter(order => order.order_state == query_order_state )

  res.render('admin_orders', {orders});
});


router.get('/admin/orders/:order_id', function(req, res, next) {
  const order_id = req.params.order_id;
  const order = Orders[order_id];
  if(!order){ return next(); }

  const artwork = Artworks[order.artwork];

  res.render('admin_order', { order, artwork });

});


router.get('/admin/orders/:order_id/print', function(req, res, next) {
  const order_id = req.params.order_id;
  const order = Orders[order_id];
  if(!order){ return next(); }

  const artwork = Artworks[order.artwork];

  res.render('admin_order_print', {  artwork });

});


router.get('/admin/artworks', function(req, res, next) {
  const artworks = Artworks;
  res.render('admin_artworks', {artworks});
});

router.get('/admin/artworks/:artwork_id', function(req, res, next) {
  const artwork_id = req.params.artwork_id;
  const artwork = Artworks[artwork_id];
  if(!artwork){ return next(); }
  res.render('admin_artwork', {artwork});
});

router.get('/thankyou', function(req, res, next) {
  res.render('thankyou');
});

router.get('/react', function(req, res, next) {
  res.render('react');
});

module.exports = router;


