const express = require('express');
const router = express.Router();
const path = require("path");
const co = require("co");

const mongoose = require("mongoose");

const Artwork=  mongoose.model("Artwork")
const Order =  mongoose.model("Order")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('start', {});
});

//つくるだけ。なんにもパラメータいらない
router.post('/artworks', function(req, res, next) { 
  //とりあえず簡易的に
  co(function*(){
    const newArtwork = new Artwork({ });
    const savedArtwork = yield newArtwork.save();

    res.redirect(path.join("artworks",savedArtwork._id.toString()));
  }).catch(next);
});


router.param('artwork_id', function(req, res, next, artwork_id) { 
  co(function*(){
    const artwork = yield Artwork.findById(artwork_id).exec();
    if(!artwork){ return next(); }

    req.artwork =  artwork;

    next()
  }).catch(next);
});


router.get('/artworks/:artwork_id', function(req, res, next) { 
  res.render('artwork', {artwork:req.artwork});
});

router.post('/artworks/:artwork_id', function(req, res, next) { 
  co(function*(){
    req.artwork.stamps = req.body.stamps;
    const savedArtwork = yield req.artwork.save();

    res.json({
      status:200,
      message:"successfully saved",
      received:savedArtwork
    });
  }).catch(next);
});


router.post('/orders', function(req, res, next) { 
  co(function*(){
    const artwork_id = req.body.artwork_id;

    console.log("mongoose.Schema.Types.ObjectId(artwork_id)");
    console.log(mongoose.Types.ObjectId(artwork_id));

    const newOrder = new Order({
      artwork: mongoose.Types.ObjectId(artwork_id),
    });

    const savedOrder = yield newOrder.save();

    console.log("savedOrder");
    console.log(savedOrder);
    console.log(savedOrder._id);

    res.redirect(path.join("orders",savedOrder._id.toString()));

  }).catch(next);
});

router.param('order_id', function(req, res, next, order_id) { 
  co(function*(){
    const order = yield Order.findById(order_id).populate("artwork").exec();
    if(!order){ return next(); }

    req.order = order;

    next();
  }).catch(next);
});

router.get('/orders/:order_id', function(req, res, next) { 
  console.log(req.order);

  res.render('order', {order: req.order, artwork:req.order.artwork});
});

router.post('/orders/:order_id', function(req, res, next) { 

  co(function*(){
    const itemsSizes = {
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
    };

    const ticket = req.body.ticket;
    const cust_name= req.body.cust_name;

    req.order.items_sizes = itemsSizes;
    req.order.cust_name   = cust_name;
    req.order.ticket = ticket;

    const savedOrder = yield req.order.save();
    
    //うまく行ってなかったら、だめだけど、
    //うまくいってたら、 checkに飛ぶ

    res.redirect(path.join(req.url,"check"));

  }).catch(next);
});

router.get('/orders/:order_id/check', function(req, res, next) { 
  res.render("order_check", {order:req.order, artwork:req.order.artwork})
});


router.post('/orders/:order_id/check', function(req, res, next) { 
  co(function*(){
    req.order.order_state = "ordered";
    const savedOrder = yield req.order.save();

    //保存
    res.redirect("/thankyou");
  }).catch(next);
});


router.get('/admin', function(req, res, next) {
  res.redirect("/admin/orders");
});

router.get('/admin/orders', function(req, res, next) {
  co(function*(){
    const query_order_state = req.query.state || "ordered";
    const orders = yield Order.find({order_state:query_order_state }).exec();
    res.render('admin_orders', {orders});
  }).catch(next);
});


router.get('/admin/orders/:order_id', function(req, res, next) {
  res.render('admin_order', { order:req.order, artwork:req.order.artwork });
});


router.get('/admin/orders/:order_id/print', function(req, res, next) {
  res.render('admin_order_print', {  artwork:req.order.artwork });
});


router.get('/admin/artworks', function(req, res, next) {
  co(function*(){
    const artworks = yield Artworks.find().exec();
    res.render('admin_artworks', {artworks});
  }).catch(next);
});


router.get('/admin/artworks/:artwork_id', function(req, res, next) {
  res.render('admin_artwork', {artwork:req.artwork});
});

router.get('/thankyou', function(req, res, next) {
  res.render('thankyou');
});


module.exports = router;


